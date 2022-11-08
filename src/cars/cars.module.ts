import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carProviders } from './cars.providers';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [CarsService, ...carProviders],
})
export class CarsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .forRoutes(
        { path: 'cars', method: RequestMethod.POST },
        { path: 'cars/:id', method: RequestMethod.PATCH },
        { path: 'cars/:id', method: RequestMethod.DELETE },
      );
  }
}
