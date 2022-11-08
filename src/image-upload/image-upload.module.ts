import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Module({
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
})
export class ImageUploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .forRoutes({ path: 'image-upload/upload', method: RequestMethod.POST });
  }
}
