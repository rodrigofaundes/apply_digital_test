import { IsDecimal, IsNumber, isNumber, IsNumberString, IsOptional, IsPositive, IsString } from "class-validator";

export class PaginatedProductDto {
    
    @IsNumberString()
    page: number;
    
    @IsOptional()
    name: string

    @IsOptional()
    category: string

    @IsOptional()
    @IsDecimal()
    minPrice: number

    @IsOptional()
    @IsDecimal()
    maxPrice: number
    
}
