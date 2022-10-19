import { Test, TestingModule } from '@nestjs/testing';
import { CarsImageController } from './cars-image.controller';
import { CarsImageService } from './cars-image.service';

describe('CarsImageController', () => {
  let controller: CarsImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsImageController],
      providers: [CarsImageService],
    }).compile();

    controller = module.get<CarsImageController>(CarsImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
