import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';

@Module({
  imports: [
      HttpModule,
      TypeOrmModule.forFeature([Product]),
  ],
  providers: [SyncService],
  exports: [SyncService],
  controllers: [SyncController]
})

export class SyncModule {}