import { Request, Response, NextFunction } from 'express';
import { jsonSecret } from '../jsonSecret';
import { decode, verify } from 'jsonwebtoken';
import { LoginType } from '../services/Validation';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(' ');

    try {
      verify(token, jsonSecret.secret);

      const { email } = (await decode(token)) as LoginType;

      (req as any).usuarioEmail = email;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'User not authorized' });
    }
  }

  return res.status(401).json({ message: 'Acess Token invalid' });
};
