import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { LoginType, Validation } from '../services/Validation';

export class AuthController {
  authService: AuthService;

  constructor(authService = new AuthService()) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as LoginType;

      Validation.LoginSchema.parse({ email: email, password: password });

      const login = await this.authService.login({ email, password });

      console.log(login);

      if (login) {
        return res.status(200).json({
          acesstoken: login.acessToken,
          id: login.user.id,
          name: login.user.name,
          email: login.user.email,
        });
      } else {
        return res.status(400).send({ message: 'Invalid User or Password' });
      }
    } catch (error) {
      return res.json(error);
    }
  };
}
