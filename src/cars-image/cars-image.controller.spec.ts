import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../cars/entities/car.entity';
import { CarsImageController } from './cars-image.controller';
import { CarsImageService } from './cars-image.service';
import { CarsImage } from './entities/cars-image.entity';

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

const updatedCarImage = carImage1;
updatedCarImage.name = 'Sport car Photo';

const carImageList: CarsImage[] = [carImage1, carImage2];

describe('CarsImageController', () => {
  let controller: CarsImageController;
  let service: CarsImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsImageController],
      providers: [
        {
          provide: CarsImageService,
          useValue: {
            create: jest.fn().mockResolvedValue(carImage1),
            findAll: jest.fn().mockResolvedValue(carImageList),
            findOne: jest.fn().mockResolvedValue(carImageList[0]),
            update: jest.fn().mockResolvedValue(updatedCarImage),
            remove: jest.fn().mockResolvedValue(carImageList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<CarsImageController>(CarsImageController);
    service = module.get<CarsImageService>(CarsImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
