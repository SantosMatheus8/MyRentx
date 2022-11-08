import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SpecificationsCarsService } from './specifications-cars.service';
import { SpecificationsCarsController } from './specifications-cars.controller';
import { specificationsCarsProviders } from './specifications-cars.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecificationsCarsController],
  providers: [SpecificationsCarsService, ...specificationsCarsProviders],
})
export class SpecificationsCarsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .forRoutes(
        { path: 'specifications-cars', method: RequestMethod.POST },
        { path: 'specifications-cars/:id', method: RequestMethod.PATCH },
        { path: 'specifications-cars/:id', method: RequestMethod.DELETE },
      );
  }
}
