import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationsCarsService } from './specifications-cars.service';

describe('SpecificationsCarsService', () => {
  let service: SpecificationsCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificationsCarsService],
    }).compile();

    service = module.get<SpecificationsCarsService>(SpecificationsCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
