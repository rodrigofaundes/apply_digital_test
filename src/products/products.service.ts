import {Repository} from 'typeorm';

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {Product} from './entities/product.entity';
import {PaginatedProductDto} from './dto/paginated-product.dto';

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
        const { page = 1, name, category, price } = paginatedProductDto
        const take = 5;
        const offset = ( page - 1 ) * take;

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

        if (price === 'true') {
            query.andWhere('product.price IS NOT NULL');
        } else if (price === 'false') {
            query.andWhere('product.price IS NULL');
        }

        query
            .take(take)
            .skip(offset)

        const [items, total] = await query.getManyAndCount();
        return [page, offset, total, items];
    }
}
