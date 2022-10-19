import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carProviders } from './cars.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [CarsService, ...carProviders],
})
export class CarsModule {}
