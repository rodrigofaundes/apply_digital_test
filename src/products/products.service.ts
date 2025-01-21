import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
) {}

  findAll() {
    return "this.productRepository.find({where: {deleted: false}})"
  }

  async findOne(id: string) {
    const product =  await this.productRepository.findOne({
      where: { id, deleted: false },
    })

    if ( !product ) throw new NotFoundException(`Product with id '${ id }' not found`);
      
    return product
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.productRepository.update(id, { deleted: true });
  }

  async paginate(where: any, skip: number, take: number, filters: { minPriceNum?: number, maxPriceNum?: number }){
    const query = this.productRepository.createQueryBuilder('product');

    query.where('product.deleted = :deleted', { deleted: false });

    if (where.name) {
        query.andWhere('product.name LIKE :name', { name: `%${where.name}%` });
    }

    if (where.category) {
        query.andWhere('product.category = :category', { category: where.category });
    }

    if (filters.minPriceNum) {
        query.andWhere('product.price >= :minPriceNum', { minPriceNum: filters.minPriceNum });
    }

    if (filters.maxPriceNum) {
        query.andWhere('product.price <= :maxPriceNum', { maxPriceNum: filters.maxPriceNum });
    }

    query.skip(skip).take(take);

    const [items, total] = await query.getManyAndCount();
    return [items, total];
  }
}
