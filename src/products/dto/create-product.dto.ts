import { IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    sku:      string;
    
    @IsString()
    name:     string;
    
    @IsString()
    brand:    string;
    
    @IsString()
    model:    string;
    
    @IsString()
    category: string;
    
    @IsString()
    color:    string;
    
    @IsString()
    price:    number;
    
    @IsString()
    currency: string;
    
    @IsString()
    stock:    number;
    
}
