import {Injectable, NotFoundException, ParseUUIDPipe} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {Repository} from 'typeorm';
import { PaginatedProductDto } from './dto/paginated-product.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)private readonly productRepository : Repository<Product>,
    ) {}

    async findOne(id : string) {
        const product = await this
            .productRepository
            .findOne({
                where: {
                    id,
                    deleted: false
                }
            })

        if (!product) 
            throw new NotFoundException(`Product with id '${id}' not found`);
        
        return product
    }

    async remove(id : string) {
        await this.findOne(id)
        return this
            .productRepository
            .update(id, {deleted: true});
    }

    async findAll(paginatedProductDto: PaginatedProductDto) {
        const { page = 1, name, category, minPrice, maxPrice } = paginatedProductDto
        const take = 5;
        const offset = page * take;

        const query = this
            .productRepository
            .createQueryBuilder('product');

        query.where('product.deleted = :deleted', {deleted: false});
        query.orderBy('product.name', 'ASC')

        if (name) {
            query.andWhere('product.name LIKE :name', {name: `%${name}%`});
        }

        if (category) {
            query.andWhere('product.category = :category', {category: category});
        }

        if (minPrice) {
            query.andWhere(
                'product.price >= :minPrice',
                {minPrice: minPrice}
            );
        }

        if (maxPrice) {
            query.andWhere(
                'product.price <= :maxPrice',
                {maxPrice: maxPrice}
            );
        }

        query
            .take(take)
            .skip(offset)

        const [items, total] = await query.getManyAndCount();
        return [page, offset, total, items];
    }
}
