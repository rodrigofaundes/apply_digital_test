import {Repository} from 'typeorm';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';

import {ReportsService} from '../reports.service';
import {Product} from '../../products/entities/product.entity';
import {GetReportByFiltersDto} from '../dto/get-report-filter.reports.dto';

describe('ReportsService', () => {
    let service: ReportsService;
    let repo: Repository<Product>;

    beforeEach(async () => {
        // Creamos un mock del repositorio
        const mockRepo = {
            count: jest.fn(),
            createQueryBuilder: jest.fn()
        };

        const module: TestingModule = await Test
            .createTestingModule({
                providers: [
                    ReportsService, {
                        provide: getRepositoryToken(Product),
                        useValue: mockRepo
                    }
                ]
            })
            .compile();

        service = module.get<ReportsService>(ReportsService);
        repo = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getReportDeletedProducts', () => {
        it('should return 0% if total products is 0', async () => {
            (repo.count as jest.Mock).mockResolvedValueOnce(0);

            const result = await service.getReportDeletedProducts();
            expect(repo.count).toHaveBeenCalledTimes(1);
            expect(result).toEqual({percentage: 0});
        });

        it('should return the correct percentage of deleted products', async () => {
            // Primer .mockResolvedValueOnce para total
            (repo.count as jest.Mock).mockResolvedValueOnce(10);
            // Segundo .mockResolvedValue para deletedCount
            (repo.count as jest.Mock).mockResolvedValueOnce(4);

            const result = await service.getReportDeletedProducts();

            // Se llama 2 veces a repo.count()
            expect(repo.count).toHaveBeenNthCalledWith(1);
            expect(repo.count).toHaveBeenNthCalledWith(2, {
                where: {
                    deleted: true
                }
            });
            expect(result).toEqual({
                percentage: (4 / 10) * 100
            }); // 40
        });
    });

    describe('getReportByFilters', () => {
        it('should return 0% if total products is 0', async () => {
            // Simulamos queryBuilder
            const mockQueryBuilder = {
                where: jest
                    .fn()
                    .mockReturnThis(),
                andWhere: jest
                    .fn()
                    .mockReturnThis(),
                getCount: jest
                    .fn()
                    .mockResolvedValue(0)
            };
            (repo.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);

            // total=0 => primer "count"
            (repo.count as jest.Mock).mockResolvedValueOnce(0);

            const filters: GetReportByFiltersDto = {};
            const result = await service.getReportByFilters(filters);

            expect(result).toEqual({total: 0, filteredCount: 0, percentage: 0});
        });

        it(
            'should build query with date range, price, and return correct percentage',
            async () => {
                // 1) Simulamos queryBuilder
                const mockQueryBuilder = {
                    where: jest
                        .fn()
                        .mockReturnThis(),
                    andWhere: jest
                        .fn()
                        .mockReturnThis(),
                    getCount: jest
                        .fn()
                        .mockResolvedValue(4), // 4 filtered
                };
                (repo.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);

                // 2) total=10 => primer "count()"
                (repo.count as jest.Mock).mockResolvedValueOnce(10);

                const filters: GetReportByFiltersDto = {
                    fromDate: '2025-01-01',
                    toDate: '2025-01-31',
                    price: 100
                };

                const result = await service.getReportByFilters(filters);

                // Verifica build del query
                expect(mockQueryBuilder.where).toHaveBeenCalledWith('product.deleted = false');
                expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
                    'product.createdAt BETWEEN :fromDate AND :toDate',
                    {
                        fromDate: '2025-01-01',
                        toDate: '2025-01-31'
                    },
                );
                expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
                    'product.price = :prices',
                    {
                        prices: 100
                    },
                );

                expect(result).toEqual({
                    total: 10,
                    filteredCount: 4,
                    percentage: (4 / 10) * 100
                });
            }
        );
    });
});