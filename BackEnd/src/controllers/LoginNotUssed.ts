import { Request, Response } from 'express';
import { LoginType, Validation } from '../services/Validation';
import { UserService } from '../services/UserService';

export class LoginController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as LoginType;
      Validation.LoginSchema.parse({
        email: email,
        password: password,
      });

      const token = await this.userService.getToken(email, password);

      if (token) {
        return res.status(200).json({ token });
      } else {
        return res.status(401).send({ message: 'Invalid Credentials' });
      }
    } catch (error: any) {
      return res.json(error);
    }
  };
}
