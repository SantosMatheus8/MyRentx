import { Request } from 'express';

export interface UserTokenDTO {
  id: string;
  isAdmin: boolean;
}

export interface UserRequest extends Request {
  user: UserTokenDTO;
}
