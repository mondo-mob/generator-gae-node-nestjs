import { Injectable } from '@nestjs/common';
import {
  Context,
  Transactional,
  UserService as GaeUserService,
  IUser,
} from '@3wks/gae-node-nestjs';
import { UserRepository, User } from './users.repository';

@Injectable()
export class UsersService implements GaeUserService<User> {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  async updateUser(
    context: Context,
    id: string,
    name: string,
    roles: string[],
  ) {
    const user = await this.userRepository.get(context, id);

    if (!user) {
      throw new Error('User does not exist');
    }

    user.name = name;
    user.roles = roles;

    return await this.userRepository.save(context, user);
  }

  async get(context: Context, userId: string): Promise<User | undefined> {
    return this.userRepository.get(context, userId);
  }
  async create(context: Context, user: User): Promise<User> {
    return this.userRepository.save(context, {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles || [],
      avatar: '',
    });
  }
}
