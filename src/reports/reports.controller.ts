import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetReportByFiltersDto } from './dto/get-report-filter.reports.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@UseGuards(JwtAuthGuard)
@Controller('reports') export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}
    
    @Get('deleted-percentage') 
    getDeletedPercentage() {
        return this.reportsService.getReportDeletedProducts();
    }

    @Get('not-deleted-percentage') 
    getNotDeletedPercentage(@Query() params?: GetReportByFiltersDto) {
        return this.reportsService.getReportByFilters(params);
    }
}
