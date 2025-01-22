import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SyncModule } from 'src/sync/sync.module';

@Module({
    controllers: [SeedController],
    providers: [SeedService],
    imports: [AuthModule, SyncModule]
})
export class SeedModule {}
