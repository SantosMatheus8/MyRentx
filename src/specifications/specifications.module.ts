import { Module } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { SpecificationsController } from './specifications.controller';
import { DatabaseModule } from 'src/database/database.module';
import { specificationProviders } from './specifications.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecificationsController],
  providers: [SpecificationsService, ...specificationProviders],
})
export class SpecificationsModule {}
