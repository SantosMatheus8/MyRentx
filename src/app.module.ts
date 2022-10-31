import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { CarsModule } from './cars/cars.module';
import { CategoriesModule } from './categories/categories.module';
import { CarsImageModule } from './cars-image/cars-image.module';
import { SpecificationsModule } from './specifications/specifications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RentalsModule,
    CarsModule,
    CategoriesModule,
    CarsImageModule,
    SpecificationsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
