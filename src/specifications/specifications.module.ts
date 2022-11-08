import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { SpecificationsController } from './specifications.controller';
import { DatabaseModule } from 'src/database/database.module';
import { specificationProviders } from './specifications.providers';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecificationsController],
  providers: [SpecificationsService, ...specificationProviders],
})
export class SpecificationsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .forRoutes(
        { path: 'specifications', method: RequestMethod.POST },
        { path: 'specifications/:id', method: RequestMethod.PATCH },
        { path: 'specifications/:id', method: RequestMethod.DELETE },
      );
  }
}
