import { Repository } from 'typeorm';
import { of } from 'rxjs';
import { lastValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { SyncService } from '../sync.service';
import { Product } from '../../products/entities/product.entity';


describe('SyncService', () => {
    let service: SyncService;
    let httpService: HttpService;
    let configService: ConfigService;
    let productRepo: Repository<Product>;

    beforeEach(async () => {
        // Mocks
        const mockHttpService = {
            get: jest.fn(), // simulará peticiones HTTP
        };
        const mockConfigService = {
            get: jest.fn(), // para retornar valores de entorno
        };
        const mockProductRepo = {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        };

        // Creamos el módulo de test
        const module: TestingModule = await Test
            .createTestingModule({
                providers: [
                    SyncService, {
                        provide: HttpService,
                        useValue: mockHttpService
                    }, {
                        provide: ConfigService,
                        useValue: mockConfigService
                    }, {
                        provide: getRepositoryToken(Product),
                        useValue: mockProductRepo
                    }
                ]
            })
            .compile();

        service = module.get<SyncService>(SyncService);
        httpService = module.get<HttpService>(HttpService);
        configService = module.get<ConfigService>(ConfigService);
        productRepo = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
