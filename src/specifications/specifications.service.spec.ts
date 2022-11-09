import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Specification } from './entities/specification.entity';
import { SpecificationsService } from './specifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const specification1 = new Specification();
specification1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
specification1.name = 'Specification1';
specification1.description = 'Specification Description1';

const specification2 = new Specification();
specification2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
specification2.name = 'Specification2';
specification2.description = 'Specification Description2';

const updatedSpecification = specification1;
updatedSpecification.name = 'New name';

const specificationList: Specification[] = [specification1, specification2];
describe('SpecificationsService', () => {
  let service: SpecificationsService;
  let repository: Repository<Specification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecificationsService,
        {
          provide: getRepositoryToken(Specification),
          useValue: {
            find: jest.fn().mockResolvedValue(specificationList),
            create: jest.fn().mockResolvedValue(specificationList[0]),
            save: jest.fn().mockResolvedValue(specificationList[0]),
            findOne: jest.fn().mockResolvedValue(specificationList[0]),
            preload: jest.fn().mockResolvedValue(specificationList[0]),
            remove: jest.fn().mockResolvedValue(specificationList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<SpecificationsService>(SpecificationsService);
    repository = module.get<Repository<Specification>>(
      getRepositoryToken(Specification),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('A specification must be created', async () => {
      const specification = await service.create({
        name: 'Specification1',
        description: 'Specification Description1',
      });

      expect(specification).toEqual(specificationList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must be list all specifications', async () => {
      const specification = await service.findAll();

      expect(specification).toEqual(specificationList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific specification', async () => {
      const specification = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(specification).toEqual(specificationList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma especificação com o ID : 1`,
        );
      }
    });
  });

  describe('update', () => {
    it('Must update a specific specification', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(updatedSpecification);

      const specification = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { name: 'New name' },
      );

      expect(specification).toEqual(updatedSpecification);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', { name: 'Sport' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma especificação com o ID : 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific specification', async () => {
      const specification = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(specification).toBe(specificationList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
