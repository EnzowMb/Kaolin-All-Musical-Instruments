import { hash } from 'bcrypt';
import { User } from '../model/UserModel';
import { jsonSecret } from '../jsonSecret';
import { userRepository } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { Instrument } from '../model/InstrumentModel';

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

    console.log(user);

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
          password: false,
        },
      });
    } else {
      return null;
    }
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

  updateFavoriteInstruments = async (
    Instrument: Instrument,
    userId: string
  ) => {};
}
