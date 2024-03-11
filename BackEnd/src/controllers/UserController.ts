import { Request, Response } from 'express';

import { UserService } from '../services/UserService';
import { UserType, Validation } from '../services/Validation';
import { User } from '../model/UserModel';

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as UserType;
      Validation.UserSchema.parse({
        name: name,
        email: email,
        password: password,
      });
      const userModel = new User(name, email, password);
      const newUser = await this.userService.createUser(userModel);
      if (newUser) {
        return res.status(201).json(newUser);
      } else {
        return res.status(422).json({ message: 'Usuario já existe!' });
      }
    } catch (error: any) {
      return res.json(error);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (error: any) {
      return res.json(error);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      res.status(200).json(user);
    } catch (error: any) {
      return res.json(error);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body as UserType;
      Validation.UserSchema.parse({
        name: name,
        email: email,
        password: password,
      });
      const userModel = new User(name, email, password);
      const user = await this.userService.updateUser(userModel, id);
      return res.status(202).json(user);
    } catch (error: any) {
      return res.json(error);
    }
  };
}
