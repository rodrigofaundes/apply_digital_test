import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetReportByFiltersDto } from './dto/get-report-filter.reports.dto';

@Controller('reports') export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Get('deleted-percentage') getDeletedPercentage() {
        return this.reportsService.getReportDeletedProducts();
    }

    @Get('not-deleted-percentage') getNotDeletedPercentage(@Query() params?: GetReportByFiltersDto) {
        return this.reportsService.getReportByFilters(params);
    }
}
