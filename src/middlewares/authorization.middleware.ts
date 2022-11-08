import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserRequest } from 'src/@types/middlewares/auth';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: UserRequest, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user.isAdmin) {
      throw new ForbiddenException('O usuário não é admin');
    }

    next();
  }
}
