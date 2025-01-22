import { Type } from "class-transformer";
import { IsDecimal, IsNumberString, IsOptional, IsPositive } from "class-validator";

export class PaginatedProductDto {
    
    @IsNumberString()
    @IsOptional()
    page?: number;
    
    @IsOptional()
    name?: string

    @IsOptional()
    category?: string

    @IsOptional()
    @IsDecimal()
    minPrice?: number

    @IsOptional()
    @IsDecimal()
    maxPrice?: number
    
}
