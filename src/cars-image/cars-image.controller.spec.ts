import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../cars/entities/car.entity';
import { CarsImageController } from './cars-image.controller';
import { CarsImageService } from './cars-image.service';
import { CreateCarsImageDto } from './dto/create-cars-image.dto';
import { UpdateCarsImageDto } from './dto/update-cars-image.dto';
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

  describe('create', () => {
    it('A car image must be created', async () => {
      const body: CreateCarsImageDto = {
        name: 'HR-V',
        description: 'Car Description',
        carId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      };

      const res = await controller.create(body);

      expect(res).toEqual(carImageList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all cars images', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(carImageList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific car image', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(carImageList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific car image', async () => {
      const body: UpdateCarsImageDto = { name: 'Sport car Photo' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedCarImage);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific car image', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(carImageList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
