import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CarsImageService } from './cars-image.service';
import { CarsImageController } from './cars-image.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carsImageProviders } from './cars-image.providers';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsImageController],
  providers: [CarsImageService, ...carsImageProviders],
})
export class CarsImageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .forRoutes({ path: 'cars-image', method: RequestMethod.POST });
  }
}
