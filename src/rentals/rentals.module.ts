import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { DatabaseModule } from 'src/database/database.module';
import { rentalProviders } from './rentals.providers';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalsController],
  providers: [RentalsService, ...rentalProviders],
})
export class RentalsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'rentals', method: RequestMethod.GET });
  }
}
