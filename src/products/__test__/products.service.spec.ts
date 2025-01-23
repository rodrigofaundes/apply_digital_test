import {Test, TestingModule} from '@nestjs/testing';
import {ProductsService} from '../products.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Product} from '../entities/product.entity';
import {Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';

describe('ProductsService', () => {
    let service: ProductsService;
    let repo: Repository<Product>;

    beforeEach(async () => {
        const mockRepo = {
            findOne: jest.fn(),
            update: jest.fn(),
            createQueryBuilder: jest.fn()
        };

        const module: TestingModule = await Test
            .createTestingModule({
                providers: [
                    ProductsService, {
                        provide: getRepositoryToken(Product),
                        useValue: mockRepo
                    }
                ]
            })
            .compile();

        service = module.get<ProductsService>(ProductsService);
        repo = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        it('should throw NotFoundException if product does not exist', async () => {
            (repo.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.findOne('non-existing-uuid'))
                .rejects
                .toThrow(NotFoundException);
            expect(repo.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'non-existing-uuid',
                    deleted: false
                }
            });
        });

        it('should return the product if it exists', async () => {
            (repo.findOne as jest.Mock).mockResolvedValue(
                {id: 'some-uuid', deleted: false}
            );

            const result = await service.findOne('some-uuid');
            expect(repo.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'some-uuid',
                    deleted: false
                }
            });
            expect(result).toEqual({id: 'some-uuid', deleted: false});
        });
    });

    describe('remove', () => {
        it('should mark the product as deleted if found', async () => {
            (repo.findOne as jest.Mock).mockResolvedValue(
                {id: 'some-uuid', deleted: false}
            );
            (repo.update as jest.Mock).mockResolvedValue({affected: 1});

            const result = await service.remove('some-uuid');
            expect(repo.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'some-uuid',
                    deleted: false
                }
            });
            expect(repo.update).toHaveBeenCalledWith('some-uuid', {deleted: true});
            expect(result).toEqual({affected: 1});
        });
    });

    describe('findAll', () => {
        it(
            'should call createQueryBuilder, build the query, and return [page, offset, total, items]', async () => {
                const mockQueryBuilder = {
                    where: jest
                        .fn()
                        .mockReturnThis(),
                    andWhere: jest
                        .fn()
                        .mockReturnThis(),
                    orderBy: jest
                        .fn()
                        .mockReturnThis(),
                    take: jest
                        .fn()
                        .mockReturnThis(),
                    skip: jest
                        .fn()
                        .mockReturnThis(),
                    getManyAndCount: jest
                        .fn()
                        .mockResolvedValue([
                            [
                                {
                                    name: 'P1'
                                }
                            ],
							10,
                        ])
                };
                (repo.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);

                const dto = {
                    page: 2,
                    name: 'apple',
                    category: 'Smartwatch',
                    price: "true"
                };
                const result = await service.findAll(dto);

                expect(mockQueryBuilder.where).toHaveBeenCalledWith(
                    'product.deleted = :deleted',
                    {deleted: false}
                );
                expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
                    'product.name LIKE :name',
                    {name: '%apple%'}
                );
                expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
                    'product.category = :category',
                    {category: 'Smartwatch'}
                );
                expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
                    'product.price IS NOT NULL',
                );
                expect(mockQueryBuilder.skip).toHaveBeenCalledWith((2-1) * 5);
                expect(mockQueryBuilder.take).toHaveBeenCalledWith(5);

                expect(result).toEqual([
                    2,
                    5,
					10,
                    [
                        {
                            name: 'P1'
                        }
                    ],
                ]);
            }
        );
    });
});