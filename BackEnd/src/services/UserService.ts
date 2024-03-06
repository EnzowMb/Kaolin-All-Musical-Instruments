import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../model/UserModel';
import { jsonSecret } from '../jsonSecret';
import { userRepository } from '../repositories/UserRepository';

export class UserService {
  findByEmailAndPassword = (email: string, password: string) => {
    return userRepository.findUnique({ where: { email, password } });
  };

  createUser = async (user: User) => {
    const userExist = await userRepository.findUnique({
      where: {
        email: user.getEmail(),
      },
    });

    if (!userExist) {
      const passwordHash = await hash(user.getPassword(), 8); //8 -> saltRounds

      return await userRepository.create({
        data: {
          name: user.getName(),
          email: user.getEmail(),
          password: passwordHash,
        },
        select: {
          id: false,
          name: true,
          email: true,
          instruments: true,
          password: false,
        },
      });
    } else {
      return null;
    }
  };

  getAllUser = () => {
    return userRepository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        instruments: true,
        password: false,
      },
    });
  };

  getUser = (userId: string) => {
    return userRepository.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        instruments: true,
        password: false,
      },
    });
  };

  getToken = async (email: string, password: string) => {
    const user = await this.findByEmailAndPassword(email, password);

    const tokenData = {
      email: email,
      password: password,
    };

    const tokenOptions = {
      subject: user?.id,
    };

    const token = sign(tokenData, jsonSecret.secret, tokenOptions);

    return token;
  };

  updateUser = async (user: User, userId: string) => {
    const passwordHash = await hash(user.getPassword(), 8); //8 -> saltRounds
    return userRepository.update({
      where: { id: userId },
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: passwordHash,
      },
      select: {
        id: false,
        name: true,
        email: true,
        password: false,
      },
    });
  };
}
