import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { CarsModule } from './cars/cars.module';
import { CategoriesModule } from './categories/categories.module';
import { CarsImageModule } from './cars-image/cars-image.module';
import { SpecificationsModule } from './specifications/specifications.module';
import { AuthModule } from './auth/auth.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { SpecificationsCarsModule } from './specifications-cars/specifications-cars.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UsersModule,
    RentalsModule,
    CarsModule,
    CategoriesModule,
    CarsImageModule,
    SpecificationsModule,
    AuthModule,
    ImageUploadModule,
    SpecificationsCarsModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
