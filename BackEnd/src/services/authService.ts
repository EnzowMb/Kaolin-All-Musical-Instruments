import { sign } from 'jsonwebtoken';
import { jsonSecret } from '../jsonSecret';
import { User } from '../model/UserModel';
import { userRepository } from '../repositories/UserRepository';
import { compare } from 'bcrypt';
import { LoginType } from './Validation';

export class authService {
  static login = async (dto: LoginType) => {
    const user = await userRepository.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      return null;
    }

    const senhasIguais = await compare(dto.password, user.password);

    if (!senhasIguais) {
      throw new Error(`User or password mismatch`);
    }

    const acessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 86400,
      }
    );

    return acessToken;
  };
}
