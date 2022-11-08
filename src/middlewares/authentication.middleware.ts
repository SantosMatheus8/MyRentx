import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserRequest } from 'src/@types/middlewares/auth';
import { verifyToken } from 'src/helpers/Token';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: UserRequest, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('O usuário não está logado');
    }

    const token = authorization.split(' ');

    try {
      const user = verifyToken(token[1]);

      req.user = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    next();
  }
}
