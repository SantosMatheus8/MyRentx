import { sign, verify } from 'jsonwebtoken';

interface UserTokenDTO {
  id: string;
  isAdmin: boolean;
}

export const generateToken = ({ id, isAdmin }) => {
  const token = sign({ id, isAdmin }, process.env.AUTH_SECRET);
  return { token, isAdmin };
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.AUTH_SECRET) as UserTokenDTO;
};
