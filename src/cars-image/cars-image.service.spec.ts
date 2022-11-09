import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CarsImageService } from './cars-image.service';
import { CarsImage } from './entities/cars-image.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../cars/entities/car.entity';
import { NotFoundException } from '@nestjs/common';

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

  describe('create', () => {
    it('A carImage must be created', async () => {
      const carImage = await service.create({
        name: 'HR-V',
        description: 'Car Description',
        carId: car.id,
      });

      expect(carImage).toEqual(carImageList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return category not found error', async () => {
      jest.spyOn(carRepository, 'findOne').mockResolvedValueOnce(null);

      try {
        await service.create({
          name: 'HR-V',
          description: 'Car Description',
          carId: '1',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um carro com o ID informado`,
        );
      }
    });
  });

  describe('findAll', () => {
    it('Must be list all carsImages', async () => {
      const carsImages = await service.findAll();

      expect(carsImages).toEqual(carImageList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific carImage', async () => {
      const carImage = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(carImage).toEqual(carImageList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma imagem com o ID : 1`,
        );
      }
    });
  });

  describe('update', () => {
    it('Must update a specific carImage', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedCategory);

      const carImage = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { name: 'Sport' },
      );

      expect(carImage).toEqual(updatedCategory);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', { name: 'Sport car Photo' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma imagem com o ID : 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific carImage', async () => {
      const carImage = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(carImage).toBe(carImageList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
