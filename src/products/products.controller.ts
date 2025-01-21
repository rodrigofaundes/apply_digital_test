import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindProductDto } from './dto/find-product.dto';
import { PaginatedProductDto } from './dto/paginated-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Delete(':id')
  remove(@Param() params: FindProductDto) {
    return this.productsService.remove(params.id);
  }

  @Get("/paginated")
  async paginated( @Query() params: PaginatedProductDto  ) {

	const minPriceNum = params.minPrice
	const maxPriceNum = params.maxPrice
	const take = 5;
	const skip = (params.page - 1) * take;
	let where: any = { deleted: false };

	if (params.name) where.name = params.name;
	if (params.category) where.category = params.category;

	const [items, total] = await this.productsService.paginate(where, skip, take, {
	  minPriceNum,
	  maxPriceNum,
	});

	return {
	  params,
	  total,
	  items
	}
  }
}
