import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/authService';

export class AuthController {
  authService: AuthService;

  constructor(authService = new AuthService()) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const login = await this.authService.login({ email, password });

      if (login) {
        return res.status(200).json({
          acesstoken: login.acessToken,
          id: login.user.id,
          name: login.user.name,
          email: login.user.email,
          instruments: login.user.instruments,
        });
      } else {
        return res
          .status(401)
          .send({ message: 'Usuario ou senha incorretos!' });
      }
    } catch (error) {
      return res.json(error);
    }
  };
}
