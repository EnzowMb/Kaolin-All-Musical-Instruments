import { User } from '../model/UserModel';
import { userRepository } from '../repositories/UserRepository';

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

  getToken = () => {};
}
