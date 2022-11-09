import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const category = new Category();
category.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
category.name = '4X4';
category.description = 'Category Description';

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

  describe('create', () => {
    it('A car must be created', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const category = await service.create({
        name: 'HR-V',
        description: 'Car Description',
        dailyRate: 80,
        licensePlate: '008459234',
        fineAmount: 150,
        brand: '36364734',
        categoryId: 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647',
      });

      expect(category).toEqual(carList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return category not found error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);

      try {
        await service.create({
          name: 'HR-V',
          description: 'Car Description',
          dailyRate: 80,
          licensePlate: '008459234',
          fineAmount: 150,
          brand: '36364734',
          categoryId: '1',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma categoria com o ID informado`,
        );
      }
    });

    it('It should return the error of license plate already registered', async () => {
      try {
        await service.create({
          name: 'HR-V',
          description: 'Car Description',
          dailyRate: 80,
          licensePlate: '008459234',
          fineAmount: 150,
          brand: '36364734',
          categoryId: 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('A placa informada já existe');
      }
    });
  });

  describe('findOne', () => {
    it('Must return a specific car', async () => {
      const car = await service.findOne('1ca415c6-32be-488c-b7bf-12b8649c99bd');

      expect(car).toEqual(carList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  it('Should return NotFoundException error', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

    try {
      await service.findOne('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Não foi encontrado um carro com o ID: 1`);
    }
  });

  describe('update', () => {
    it('Must update a specific car', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedCar);

      const car = await service.update('1ca415c6-32be-488c-b7bf-12b8649c99bd', {
        name: 'Sport',
      });

      expect(car).toEqual(updatedCar);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', { name: 'WR-V' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um carro com o ID: 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific car', async () => {
      const car = await service.remove('1ca415c6-32be-488c-b7bf-12b8649c99bd');

      expect(car).toBe(carList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
