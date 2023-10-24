import { Request, Response, NextFunction } from 'express';
import { jsonSecret } from '../jsonSecret';
import { decode, verify } from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(' ');

    try {
      verify(token, jsonSecret.secret);

      const { id, email } = await decode(token);

      req.usuarioId = id;
      req.usuarioEmail = email;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Usuario não autorizado' });
    }
  }

  return res.status(401).json({ message: 'Acess Token não informado' });
};
