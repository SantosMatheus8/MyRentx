import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CarsImageService } from './cars-image.service';
import { CarsImage } from './entities/cars-image.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../cars/entities/car.entity';

const car = new Car();
car.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
car.name = 'HR-V';
car.description = 'Car Description';
car.dailyRate = 80;
car.licensePlate = '008459234';
car.fineAmount = 150;
car.brand = '36364734';
car.categoryId = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const carImage1 = new CarsImage();
carImage1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
carImage1.name = 'SUV Photo';
carImage1.description = 'Photo description';

const carImage2 = new CarsImage();
carImage2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
carImage2.name = '4X4 Photo';
carImage2.description = 'Photo description';

const updatedCategory = carImage1;
updatedCategory.name = 'Sport car Photo';

const carImageList: CarsImage[] = [carImage1, carImage2];
describe('CarsImageService', () => {
  let service: CarsImageService;
  let repository: Repository<CarsImage>;
  let carRepository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsImageService,
        {
          provide: getRepositoryToken(CarsImage),
          useValue: {
            find: jest.fn().mockResolvedValue(carImageList),
            create: jest.fn().mockResolvedValue(carImageList[0]),
            save: jest.fn().mockResolvedValue(carImageList[0]),
            findOne: jest.fn().mockResolvedValue(carImageList[0]),
            preload: jest.fn().mockResolvedValue(carImageList[0]),
            remove: jest.fn().mockResolvedValue(carImageList[0]),
          },
        },
        {
          provide: getRepositoryToken(Car),
          useValue: {
            findOne: jest.fn().mockResolvedValue(car),
          },
        },
      ],
    }).compile();

    service = module.get<CarsImageService>(CarsImageService);
    repository = module.get<Repository<CarsImage>>(
      getRepositoryToken(CarsImage),
    );
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(carRepository).toBeDefined();
  });
});
