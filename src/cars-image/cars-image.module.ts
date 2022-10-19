import { Module } from '@nestjs/common';
import { CarsImageService } from './cars-image.service';
import { CarsImageController } from './cars-image.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carsImageProviders } from './cars-image.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsImageController],
  providers: [CarsImageService, ...carsImageProviders],
})
export class CarsImageModule {}
