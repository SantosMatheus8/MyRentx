import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { RentalsService } from './rentals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../cars/entities/car.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

const rental1 = new Rental();
rental1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
rental1.startDate = new Date('2022-11-08');
rental1.expectedReturnDate = new Date();
rental1.userId = 'f2f39367-dc78-40a6-844a-6b7fc0bc7464';
rental1.carId = 'cc2a4ee9-69f5-4629-9d61-678f9b075121';

const rental2 = new Rental();
rental2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
rental2.startDate = new Date('2022-11-02');
rental2.expectedReturnDate = new Date();
rental2.carId = 'f2f39367-dc78-40a6-844a-6b7fc0bc7464';
rental2.userId = 'cc2a4ee9-69f5-4629-9d61-678f9b075121';

const rentalList: Rental[] = [rental1, rental2];

const car = new Car();
car.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
car.name = 'HR-V';
car.description = 'Car Description';
car.dailyRate = 80;
car.licensePlate = '008459234';
car.fineAmount = 150;
car.brand = '36364734';
car.categoryId = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const user = new User();
user.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
user.name = 'Matheus';
user.email = 'matheus@gmail.com';
user.avatar = 'avatar.png';
user.driverLicense = '23490234890';
user.isAdmin = true;
user.createdAt = undefined;
user.updatedAt = undefined;

describe('RentalsService', () => {
  let service: RentalsService;
  let repository: Repository<Rental>;
  let carRepository: Repository<Car>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        {
          provide: getRepositoryToken(Rental),
          useValue: {
            find: jest.fn().mockResolvedValue(rentalList),
            create: jest.fn().mockResolvedValue(rentalList[0]),
            save: jest.fn().mockResolvedValue(rentalList[0]),
            findOne: jest.fn().mockResolvedValue(rentalList[0]),
            preload: jest.fn().mockResolvedValue(rentalList[0]),
            remove: jest.fn().mockResolvedValue(rentalList[0]),
          },
        },
        {
          provide: getRepositoryToken(Car),
          useValue: {
            findOne: jest.fn().mockResolvedValue(car),
            save: jest.fn().mockResolvedValue(car),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
    repository = module.get<Repository<Rental>>(getRepositoryToken(Rental));
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(carRepository).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findOne', () => {
    it('Must return a specific rental', async () => {
      const rental = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(rental).toEqual(rentalList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um aluguel com o ID : 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific rental', async () => {
      const rental = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(rental).toBe(rentalList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('devolution', () => {
    it('A rental must be terminated', async () => {
      const rental = await service.devolution(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(rental).toBe(rentalList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(carRepository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(carRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(carRepository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.devolution('1ca415c6-32be-488c-b7bf-12b8649c99bd');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um carro com o ID informado`,
        );
      }
    });
  });

  describe('update', () => {
    it('Must update a specific rental', async () => {
      const updatedRental = rental1;
      updatedRental.carId = '23c8ac61-d308-498d-9fa0-a3867bffbbb2';

      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedRental);

      const rental = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { carId: '23c8ac61-d308-498d-9fa0-a3867bffbbb2' },
      );

      expect(rental).toEqual(updatedRental);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', {
          carId: '23c8ac61-d308-498d-9fa0-a3867bffbbb2',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um aluguel com o ID : 1`,
        );
      }
    });
  });
});
