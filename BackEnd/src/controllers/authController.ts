import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { LoginType, Validation } from '../services/Validation';
import { User } from '../model/UserModel';

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as LoginType;
      Validation.LoginSchema.parse({ email: email, password: password });

      const login = await authService.login({ email, password });

      if (!login) {
        return res.status(200).json(login);
      } else {
        return res.status(400).send({ message: 'Invalid User' });
      }
    } catch (error) {
      return res.json(error);
    }
  };
}
