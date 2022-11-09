import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { SpecificationsCar } from './entities/specifications-car.entity';
import { SpecificationsCarsService } from './specifications-cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Specification } from '../specifications/entities/specification.entity';
import { Car } from '../cars/entities/car.entity';

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
car.name = 'HR-V';
car.description = 'Car Description';
car.dailyRate = 80;
car.licensePlate = '008459234';
car.fineAmount = 150;
car.brand = '36364734';
car.categoryId = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const specification = new Specification();
specification.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
specification.name = 'Specification1';
specification.description = 'Specification Description1';

const specificationCarList: SpecificationsCar[] = [
  specificationCar1,
  specificationCar2,
];

describe('SpecificationsCarsService', () => {
  let service: SpecificationsCarsService;
  let repository: Repository<SpecificationsCar>;
  let specificationRepository: Repository<Specification>;
  let carRepository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecificationsCarsService,
        {
          provide: getRepositoryToken(SpecificationsCar),
          useValue: {
            find: jest.fn().mockResolvedValue(specificationCarList),
            create: jest.fn().mockResolvedValue(specificationCarList[0]),
            save: jest.fn().mockResolvedValue(specificationCarList[0]),
            findOne: jest.fn().mockResolvedValue(specificationCarList[0]),
            preload: jest.fn().mockResolvedValue(specificationCarList[0]),
            remove: jest.fn().mockResolvedValue(specificationCarList[0]),
          },
        },
        {
          provide: getRepositoryToken(Specification),
          useValue: {
            findOne: jest.fn().mockResolvedValue(specification),
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

    service = module.get<SpecificationsCarsService>(SpecificationsCarsService);
    repository = module.get<Repository<SpecificationsCar>>(
      getRepositoryToken(SpecificationsCar),
    );
    specificationRepository = module.get<Repository<Specification>>(
      getRepositoryToken(Specification),
    );
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(specificationRepository).toBeDefined();
    expect(carRepository).toBeDefined();
  });
});
