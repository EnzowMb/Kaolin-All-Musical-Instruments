import { Request, Response, NextFunction } from 'express';
import { jsonSecret } from '../jsonSecret';
import { decode, verify } from 'jsonwebtoken';
import { UserType } from '../services/Validation';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(' ');

    try {
      verify(token, jsonSecret.secret);

      const { email, name } = (await decode(token)) as UserType;

      (req as any).usuarioEmail = email;
      (req as any).usuarioName = name;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  return res.status(401).json({ message: 'Acess Token invalid' });
};
