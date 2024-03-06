import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { jsonSecret } from '../jsonSecret';
import { userRepository } from '../repositories/UserRepository';
import { LoginType } from './Validation';

export class AuthService {
  login = async (dto: LoginType) => {
    const user = await userRepository.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        instruments: true,
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
        name: user.name,
      },
      jsonSecret.secret,
      {
        expiresIn: 86400,
      }
    );

    return { acessToken: acessToken, user: user };
  };
}
