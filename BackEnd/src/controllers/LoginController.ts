import { Request, Response } from 'express';
import { LoginType, Validation } from '../services/Validation';
import { sign } from 'jsonwebtoken';
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

      const user = await this.userService.findByEmailAndPassword(
        email,
        password
      );

      const tokenData = {
        email: email,
        password: password,
      };

      const tokenKey = '1234'; //Guardar senhar em uma variavel!

      const tokenOptions = {
        subject: user?.id,
      };

      const token = sign(tokenData, tokenKey, tokenOptions);

      return res.status(200).json({ token });
    } catch (error: any) {
      return res.json(error);
    }
  };
}
