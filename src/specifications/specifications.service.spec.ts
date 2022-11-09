import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Specification } from './entities/specification.entity';
import { SpecificationsService } from './specifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
