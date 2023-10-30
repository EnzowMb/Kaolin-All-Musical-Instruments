import { sign } from 'jsonwebtoken';
import { jsonSecret } from '../jsonSecret';
import { userRepository } from '../repositories/UserRepository';
import { compare } from 'bcrypt';
import { LoginType } from './Validation';

export class AuthService {
  login = async (dto: LoginType) => {
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
      return null;
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

    return { acessToken };
  };
}
