import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ContentfulResponse } from './interfaces/contentfil-response.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

@Injectable()
export class SyncService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncProducts() {
    try {
      const response = await this.getProductObservable()
      
      for (const items of response) {
        const fields = items.fields
        await this.upsertProduct({
            sku: fields.sku ? fields.sku : null,
            name: fields.name ? fields.name : null,
            brand: fields.brand ? fields.brand : null,
            model: fields.model ? fields.model : null,
            category: fields.category ? fields.category : null,
            color: fields.color ? fields.color : null,
            price: fields.price ? fields.price : null,
            currency: fields.currency ? fields.currency : null,
            stock: fields.stock ? fields.stock : null
        });
      }
      console.log('Sincronización completada.');
    } catch (error) {
      console.error('Error al sincronizar:', error.message);
    }
  }

  private async getProductObservable(){
    const spaceId = this.configService.get('CONTENTFUL_SPACE_ID');
    const environment = this.configService.get('CONTENTFUL_ENVIRONMENT');
    const accessToken = this.configService.get('CONTENTFUL_ACCESS_TOKEN');
    const contentType = this.configService.get('CONTENTFUL_CONTENT_TYPE');

    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=${contentType}`;
    const response$ = this.httpService.get<ContentfulResponse>(url);
    const response = await lastValueFrom(response$);
    const items = response.data.items;
    return items
  }

  private async upsertProduct(data: CreateProductDto) {
    const productExist = await this.productRepository.findOne({
        where: { sku: data.sku },
    });

    if (productExist) {
        await this.productRepository.update({ id: productExist.id }, data);
    } else {
        const newProduct = this.productRepository.create(data);
        await this.productRepository.save(newProduct);
    }
}
}
