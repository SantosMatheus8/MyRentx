import { sign, verify } from 'jsonwebtoken';
import { UserTokenDTO } from 'src/@types/middlewares/auth';

export const generateToken = ({ id, isAdmin }) => {
  const token = sign({ id, isAdmin }, process.env.AUTH_SECRET);
  return { token, isAdmin };
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.AUTH_SECRET) as UserTokenDTO;
};

export const generateTokenWithTimer = ({ id, isAdmin }) => {
  const token = sign({ id, isAdmin }, process.env.AUTH_SECRET, {
    expiresIn: '3h',
  });
  return { token, isAdmin };
};
