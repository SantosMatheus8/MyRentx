import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/helpers/Token';

interface UserTokenDTO {
  id: string;
  isAdmin: boolean;
}

interface UserRequest extends Request {
  user: UserTokenDTO;
}

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
