import { IsDecimal, IsNumberString, IsOptional } from "class-validator";

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
