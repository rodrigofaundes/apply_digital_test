import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindProductDto } from './dto/find-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('find/:id')
  findOne(@Param() params: FindProductDto) {
    return this.productsService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: FindProductDto) {
    return this.productsService.remove(params.id);
  }

  @Get("/paginated")
  async paginated(
    @Query('page') page = 1,
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {

	const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
	const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
	const take = 5;
	const skip = (page - 1) * take;
	let where: any = { deleted: false };

	if (name) where.name = name;
	if (category) where.category = category;

	const [items, total] = await this.productsService.paginate(where, skip, take, {
	  minPriceNum,
	  maxPriceNum,
	});

	return {
	  page,
	  total,
	  items
	}
  }
}
