import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '../categories/entities/category.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

const category = new Category();
category.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const car1 = new Car();
car1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
car1.name = 'HR-V';
car1.description = 'Car Description';
car1.dailyRate = 80;
car1.licensePlate = '008459234';
car1.fineAmount = 150;
car1.brand = '36364734';
car1.categoryId = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const car2 = new Car();
car2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
car2.name = 'SW4';
car2.description = 'Car Description';
car1.dailyRate = 180;
car1.licensePlate = '12378674';
car1.fineAmount = 300;
car1.brand = '36939603';
car1.categoryId = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const updatedCar = car1;
updatedCar.name = 'WR-V';

const carList: Car[] = [car1, car2];

describe('CarsController', () => {
  let controller: CarsController;
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: {
            create: jest.fn().mockResolvedValue(car1),
            findAll: jest.fn().mockResolvedValue(carList),
            findOne: jest.fn().mockResolvedValue(carList[0]),
            update: jest.fn().mockResolvedValue(updatedCar),
            remove: jest.fn().mockResolvedValue(carList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('A car must be created', async () => {
      const body: CreateCarDto = {
        name: 'HR-V',
        description: 'Car Description',
        dailyRate: 80,
        licensePlate: '008459234',
        fineAmount: 150,
        brand: '36364734',
        categoryId: 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647',
      };

      const res = await controller.create(body);

      expect(res).toEqual(carList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all cars', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(carList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific car', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(carList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific car', async () => {
      const body: UpdateCarDto = { name: 'WR-V' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedCar);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific car', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(carList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
