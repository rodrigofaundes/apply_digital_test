import {Test, TestingModule} from '@nestjs/testing';
import {SyncController} from '../sync.controller';
import {SyncService} from '../sync.service';

describe('SyncController', () => {
    let controller: SyncController;
    let service: SyncService;

    beforeEach(async () => {
        const mockSyncService = {
            syncProducts: jest.fn()
        };

        const module: TestingModule = await Test
            .createTestingModule({
                controllers: [SyncController],
                providers: [
                    {
                        provide: SyncService,
                        useValue: mockSyncService
                    }
                ]
            })
            .compile();

        controller = module.get<SyncController>(SyncController);
        service = module.get<SyncService>(SyncService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createAllProducts', () => {
        it('should call syncService.syncProducts and return the result', async () => {
            (service.syncProducts as jest.Mock).mockResolvedValue(
                {message: 'Sync successful'}
            );

            const result = await controller.createAllProducts();

            expect(result).toEqual({message: 'Sync successful'});
        });
    });
});