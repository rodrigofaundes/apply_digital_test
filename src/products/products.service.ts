import { Injectable, NotFoundException } from '@nestjs/common';
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
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return "this.productRepository.find({where: {deleted: false}})"
  }

  findOne(id: string) {
    return "this.productRepository.find({where: {id, deleted: false}})"
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
