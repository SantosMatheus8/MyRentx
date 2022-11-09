import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';

const category = new Category();
category.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
category.name = '4X4';
category.description = 'Category Description';

const car1 = new Car();
car1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
car1.name = 'HR-V';
car1.description = 'Car Description';

const car2 = new Car();
car2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
car2.name = 'SW4';
car2.description = 'Car Description';

const updatedCar = car1;
updatedCar.name = 'Sport';

const carList: Car[] = [car1, car2];

describe('CarsService', () => {
  let service: CarsService;
  let repository: Repository<Car>;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: {
            find: jest.fn().mockResolvedValue(carList),
            create: jest.fn().mockResolvedValue(carList[0]),
            save: jest.fn().mockResolvedValue(carList[0]),
            findOne: jest.fn().mockResolvedValue(carList[0]),
            preload: jest.fn().mockResolvedValue(carList[0]),
            remove: jest.fn().mockResolvedValue(carList[0]),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn().mockResolvedValue(category),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    repository = module.get<Repository<Car>>(getRepositoryToken(Car));
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });
});
