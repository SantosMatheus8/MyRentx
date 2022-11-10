import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
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
});
