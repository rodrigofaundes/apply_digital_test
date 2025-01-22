import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from '../products/entities/product.entity';
import {Repository} from 'typeorm';
import {GetReportByFiltersDto} from './dto/get-report-filter.reports.dto';

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Product)private readonly productRepository : Repository<Product>
    ) {}

    async getReportDeletedProducts() {
        const total = await this
            .productRepository
            .count();
        if (total === 0) 
            return {percentage: 0};
        
        const deletedCount = await this
            .productRepository
            .count({
                where: {
                    deleted: true
                }
            });
        return {
            percentage: (deletedCount / total) * 100
        };
    }

    async getReportByFilters(filters : GetReportByFiltersDto) {
        const query = this
            .productRepository
            .createQueryBuilder('product');
        query.where('product.deleted = false');

        if (filters.fromDate && filters.toDate) {
            query.andWhere('product.createdAt BETWEEN :fromDate AND :toDate', {
                fromDate: filters.fromDate,
                toDate: filters.toDate
            });
        }

        if (filters.price) {
            query.andWhere('product.price = :prices', {prices: filters.price});
        }

        const total = await this
            .productRepository
            .count();
        const filteredCount = await query.getCount();

        const percentage = total === 0
            ? 0
            : (filteredCount / total) * 100;

        return {total, filteredCount, percentage}
    }

}
