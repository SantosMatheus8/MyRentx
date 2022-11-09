import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const category1 = new Category();
category1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
category1.name = 'SUV';
category1.description = 'Category Description';

const category2 = new Category();
category2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
category2.name = '4X4';
category2.description = 'Category Description';

const updatedCategory = category1;
updatedCategory.name = 'Sport';

const categoryList: Category[] = [category1, category2];

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockResolvedValue(categoryList),
            create: jest.fn().mockResolvedValue(categoryList[0]),
            save: jest.fn().mockResolvedValue(categoryList[0]),
            findOne: jest.fn().mockResolvedValue(categoryList[0]),
            preload: jest.fn().mockResolvedValue(categoryList[0]),
            remove: jest.fn().mockResolvedValue(categoryList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('A category must be created', async () => {
      const category = await service.create({
        name: '4x4',
        description: 'Category Description',
      });

      expect(category).toEqual(categoryList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must be list all categories', async () => {
      const categories = await service.findAll();

      expect(categories).toEqual(categoryList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific category', async () => {
      const category = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(category).toEqual(categoryList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma categoria com o ID : 1`,
        );
      }
    });
  });

  describe('update', () => {
    it('Must update a specific category', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedCategory);

      const medico = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { name: 'Sport' },
      );

      expect(medico).toEqual(updatedCategory);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', { name: 'Sport' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma categoria com o ID : 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific category', async () => {
      const category = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(category).toBe(categoryList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
