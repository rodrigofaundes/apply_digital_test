import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncModule } from './sync/sync.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportsModule } from './reports/reports.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService : ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),

                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        ProductsModule,
        SyncModule,
        ScheduleModule.forRoot(),
        ReportsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}