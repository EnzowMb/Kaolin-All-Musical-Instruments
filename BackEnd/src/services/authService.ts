import { sign } from 'jsonwebtoken';
import { jsonSecret } from '../jsonSecret';
import { User } from '../model/UserModel';
import { userRepository } from '../repositories/UserRepository';
import { compare } from 'bcrypt';

export class authService {
  static login = async (dto: User) => {
    const user = await userRepository.findUnique({
      where: {
        email: dto.getEmail(),
      },
    });

    if (!user) {
      return null;
    }

    const senhasIguais = await compare(dto.getPassword(), user.password);

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
