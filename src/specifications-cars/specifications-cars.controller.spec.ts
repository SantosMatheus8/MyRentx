import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationsCarsController } from './specifications-cars.controller';
import { SpecificationsCarsService } from './specifications-cars.service';

describe('SpecificationsCarsController', () => {
  let controller: SpecificationsCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationsCarsController],
      providers: [SpecificationsCarsService],
    }).compile();

    controller = module.get<SpecificationsCarsController>(SpecificationsCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
