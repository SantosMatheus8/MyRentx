import { Module } from '@nestjs/common';
import { SpecificationsCarsService } from './specifications-cars.service';
import { SpecificationsCarsController } from './specifications-cars.controller';
import { specificationsCarsProviders } from './specifications-cars.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecificationsCarsController],
  providers: [SpecificationsCarsService, ...specificationsCarsProviders],
})
export class SpecificationsCarsModule {}
