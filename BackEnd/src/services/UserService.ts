import { User } from '../model/UserModel';
import { userRepository } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';

export class UserService {
  findByEmailAndPassword = (email: string, password: string) => {
    return userRepository.findUnique({ where: { email, password } });
  };

  createUser = (user: User) => {
    return userRepository.create({
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
      },
      select: {
        id: false,
        name: true,
        email: true,
        password: false,
      },
    });
  };

  getAllUser = () => {
    return userRepository.findMany();
  };

  getUser = (userId: string) => {
    return userRepository.findUnique({
      where: { id: userId },
    });
  };

  getToken = async (email: string, password: string) => {
    const user = await this.findByEmailAndPassword(email, password);

    const tokenData = {
      email: email,
      password: password,
    };

    const tokenKey = '1234'; //Guardar senhar em uma variavel!

    const tokenOptions = {
      subject: user?.id,
    };

    const token = sign(tokenData, tokenKey, tokenOptions);

    return token;
  };
}
