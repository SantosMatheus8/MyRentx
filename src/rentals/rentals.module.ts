import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { DatabaseModule } from 'src/database/database.module';
import { rentalProviders } from './rentals.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalsController],
  providers: [RentalsService, ...rentalProviders],
})
export class RentalsModule {}
