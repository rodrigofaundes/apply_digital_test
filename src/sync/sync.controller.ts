import { Controller, Get } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sync')
@Controller('sync') export class SyncController {
    constructor(private readonly syncService: SyncService) {}

    @Get() createAllProducts() {
        return this.syncService.syncProducts()
    }
}
