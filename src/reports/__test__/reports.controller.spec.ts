import {Test, TestingModule} from '@nestjs/testing';
import {ReportsController} from '../reports.controller';
import {ReportsService} from '../reports.service';
import {GetReportByFiltersDto} from '../dto/get-report-filter.reports.dto';
import {JwtAuthGuard} from '../../auth/jwt-auth.guard';

describe('ReportsController', () => {
    let controller: ReportsController;
    let service: ReportsService;

    beforeEach(async () => {
        const mockReportsService = {
            getReportDeletedProducts: jest.fn(),
            getReportByFilters: jest.fn()
        };

        const module: TestingModule = await Test
            .createTestingModule({
                controllers: [ReportsController],
                providers: [
                    {
                        provide: ReportsService,
                        useValue: mockReportsService
                    }
                ]
            })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: () => true,
            })
            .compile();

        controller = module.get<ReportsController>(ReportsController);
        service = module.get<ReportsService>(ReportsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getDeletedPercentage', () => {
        it(
            'should call service.getReportDeletedProducts and return result',
            async () => {
                (service.getReportDeletedProducts as jest.Mock).mockResolvedValue(
                    {percentage: 30}
                );
                const result = await controller.getDeletedPercentage();
                expect(service.getReportDeletedProducts).toHaveBeenCalledTimes(1);
                expect(result).toEqual({percentage: 30});
            }
        );
    });

    describe('getNotDeletedPercentage', () => {
        it(
            'should call service.getReportByFilters with the query params',
            async () => {
                const mockDto: GetReportByFiltersDto = {
                    fromDate: '2025-01-01',
                    toDate: '2025-01-31',
                    price: 100
                };

                (service.getReportByFilters as jest.Mock).mockResolvedValue(
                    {total: 10, filteredCount: 4, percentage: 40}
                );

                const result = await controller.getNotDeletedPercentage(mockDto);

                expect(service.getReportByFilters).toHaveBeenCalledWith(mockDto);
                expect(result).toEqual({total: 10, filteredCount: 4, percentage: 40});
            }
        );
    });
});