import { User } from '../model/UserModel';
import { userRepository } from '../repositories/UserRepository';

export class UserService {
  findByEmail = (email: string) => {
    return userRepository.findUnique({ where: { email } });
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
}
