import {Test, TestingModule} from '@nestjs/testing';
import {ProductsController} from '../products.controller';
import {ProductsService} from '../products.service';
import {FindProductDto} from '../dto/find-product.dto';
import {PaginatedProductDto} from '../dto/paginated-product.dto';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const mockService = {
            remove: jest.fn(),
            findAll: jest.fn()
        };

        const module: TestingModule = await Test
            .createTestingModule({
                controllers: [ProductsController],
                providers: [
                    {
                        provide: ProductsService,
                        useValue: mockService
                    }
                ]
            })
            .compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('remove', () => {
        it('should call productsService.remove with the correct id', async () => {
            (service.remove as jest.Mock).mockResolvedValue({affected: 1});
            const params: FindProductDto = {
                id: 'some-uuid'
            };

            const result = await controller.remove(params);
            expect(service.remove).toHaveBeenCalledWith('some-uuid');
            expect(result).toEqual({affected: 1});
        });
    });

    describe('findAll', () => {
        it(
            'should call productsService.findAll and return { page, offset, total, items }',
            async () => {
                const mockParams: PaginatedProductDto = {
                    page: 2,
                    name: 'apple',
                    category: 'Smartwatch',
                    minPrice: 100,
                    maxPrice: 300
                };

                // Simulamos que el service.findAll retorna [page, offset, items, total]
                (service.findAll as jest.Mock).mockResolvedValue([
                    2,
                    10,
                    99,
                    [
                        {
                            name: 'apple watch'
                        }
                    ],
                ]);

                const result = await controller.findAll(mockParams);

                expect(service.findAll).toHaveBeenCalledWith(mockParams);
                expect(result).toEqual({
                    page: 2,
                    offset: 10,
                    total: 99,
                    items: [
                        {
                            name: 'apple watch'
                        }
                    ]
                });
            }
        );
    });
});