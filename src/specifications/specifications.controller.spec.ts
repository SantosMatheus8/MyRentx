import { Test, TestingModule } from '@nestjs/testing';
import { Specification } from './entities/specification.entity';
import { SpecificationsController } from './specifications.controller';
import { SpecificationsService } from './specifications.service';

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

describe('SpecificationsController', () => {
  let controller: SpecificationsController;
  let service: SpecificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationsController],
      providers: [
        {
          provide: SpecificationsService,
          useValue: {
            create: jest.fn().mockResolvedValue(specification1),
            findAll: jest.fn().mockResolvedValue(specificationList),
            findOne: jest.fn().mockResolvedValue(specificationList[0]),
            update: jest.fn().mockResolvedValue(updatedSpecification),
            remove: jest.fn().mockResolvedValue(specificationList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<SpecificationsController>(SpecificationsController);
    service = module.get<SpecificationsService>(SpecificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
