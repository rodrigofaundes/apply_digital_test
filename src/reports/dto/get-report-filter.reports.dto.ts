import { IsDateString, IsDecimal, IsOptional, IsString } from "class-validator";

export class GetReportByFiltersDto {
    @IsString()
    @IsDateString()
    @IsOptional()
    fromDate: string;
    
    @IsString()
    @IsDateString()
    @IsOptional()
    toDate: string;
    
    @IsDecimal()
    @IsOptional()
    price: number;
}
