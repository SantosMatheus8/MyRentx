import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

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

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn().mockResolvedValue(category1),
            findAll: jest.fn().mockResolvedValue(categoryList),
            findOne: jest.fn().mockResolvedValue(categoryList[0]),
            update: jest.fn().mockResolvedValue(updatedCategory),
            remove: jest.fn().mockResolvedValue(categoryList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('A category must be created', async () => {
      const body: CreateCategoryDto = {
        name: 'SUV',
        description: 'Category Description',
      };

      const res = await controller.create(body);

      expect(res).toEqual(categoryList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all categories', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(categoryList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific category', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(categoryList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific category', async () => {
      const body: UpdateCategoryDto = { name: 'Sport' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedCategory);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific category', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(categoryList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
