import { Test, TestingModule } from '@nestjs/testing';
import { CarsImageService } from './cars-image.service';

describe('CarsImageService', () => {
  let service: CarsImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsImageService],
    }).compile();

    service = module.get<CarsImageService>(CarsImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
