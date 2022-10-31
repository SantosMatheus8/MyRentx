import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

interface UserTokenDTO {
  id: string;
  isAdmin: boolean;
}

interface UserRequest extends Request {
  user: UserTokenDTO;
}

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: UserRequest, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user.isAdmin) {
      throw new ForbiddenException();
    }

    next();
  }
}
