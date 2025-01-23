import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Test, TestingModule} from '@nestjs/testing';

import {SyncService} from '../sync.service';
import {Product} from '../../products/entities/product.entity';

describe('SyncService', () => {
    let service: SyncService;

    beforeEach(async () => {
        const mockHttpService = {
            get: jest.fn()
        };
        const mockConfigService = {
            get: jest.fn()
        };
        const mockProductRepo = {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        };

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
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
