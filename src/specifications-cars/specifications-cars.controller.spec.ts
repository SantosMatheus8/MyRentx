import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../cars/entities/car.entity';
import { Specification } from '../specifications/entities/specification.entity';
import { CreateSpecificationsCarDto } from './dto/create-specifications-car.dto';
import { UpdateSpecificationsCarDto } from './dto/update-specifications-car.dto';
import { SpecificationsCar } from './entities/specifications-car.entity';
import { SpecificationsCarsController } from './specifications-cars.controller';
import { SpecificationsCarsService } from './specifications-cars.service';

const specificationCar1 = new SpecificationsCar();
specificationCar1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
specificationCar1.carId = 'cc2a4ee9-69f5-4629-9d61-678f9b075121';
specificationCar1.specificationId = 'f2f39367-dc78-40a6-844a-6b7fc0bc7464';

const specificationCar2 = new SpecificationsCar();
specificationCar2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
specificationCar2.carId = 'cf39d585-a807-40bf-b4fb-c166436aac96';
specificationCar2.specificationId = '293c3498-96d8-4e37-bf51-9b8466b6031d';

const car = new Car();
car.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const specification = new Specification();
specification.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const specificationCarList: SpecificationsCar[] = [
  specificationCar1,
  specificationCar2,
];

const updatedspecificationCar = specificationCar1;
updatedspecificationCar.carId = 'cf39d585-a807-40bf-b4fb-c166436aac96';

describe('SpecificationsCarsController', () => {
  let controller: SpecificationsCarsController;
  let service: SpecificationsCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationsCarsController],
      providers: [
        {
          provide: SpecificationsCarsService,
          useValue: {
            create: jest.fn().mockResolvedValue(specificationCar1),
            findAll: jest.fn().mockResolvedValue(specificationCarList),
            findOne: jest.fn().mockResolvedValue(specificationCarList[0]),
            update: jest.fn().mockResolvedValue(updatedspecificationCar),
            remove: jest.fn().mockResolvedValue(specificationCarList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<SpecificationsCarsController>(
      SpecificationsCarsController,
    );
    service = module.get<SpecificationsCarsService>(SpecificationsCarsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('A specification car must be created', async () => {
      const body: CreateSpecificationsCarDto = {
        car_id: 'cc2a4ee9-69f5-4629-9d61-678f9b075121',
        specification_id: 'f2f39367-dc78-40a6-844a-6b7fc0bc7464',
      };

      const res = await controller.create(body);

      expect(res).toEqual(specificationCarList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all specifications cars', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(specificationCarList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific specification car', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(specificationCarList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific specification car', async () => {
      const body: UpdateSpecificationsCarDto = {
        car_id: 'cf39d585-a807-40bf-b4fb-c166436aac96',
      };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedspecificationCar);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific specification car', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(specificationCarList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
