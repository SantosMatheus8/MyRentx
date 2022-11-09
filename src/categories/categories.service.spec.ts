import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
