import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import {ProductsService} from './products.service';
import {FindProductDto} from './dto/find-product.dto';
import {PaginatedProductDto} from './dto/paginated-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService) {}

    @Delete(':id')
    remove(@Param()params : FindProductDto) {
        return this
            .productsService
            .remove(params.id);
    }

    @Get()
	async findAll(@Query() paginatedProductDto : PaginatedProductDto) {
		const [page, offset, total, items] = await this
			.productsService
			.findAll(paginatedProductDto);
            
        return { page, offset, total, items }
	}
}
