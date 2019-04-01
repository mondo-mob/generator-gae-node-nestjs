import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentContext, Roles } from '@3wks/gae-node-nestjs';
import { UserRepository, User } from './users.repository';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userRepository: UserRepository, private readonly userService: UsersService) {}

  @Query('users')
  async getUsers(_obj: {}, _args: {}): Promise<ReadonlyArray<User>> {
    const [users] = await this.userRepository.query(CurrentContext.get());

    return users;
  }

  @Query('userById')
  async getUserById(_obj: void, { id }: { id: string }) {
    return this.userRepository.get(CurrentContext.get(), id);
  }

  @Roles('admin')
  @Mutation()
  async updateUser(_req: void, { id, name, roles }: { id: string; name: string; roles: string[] }) {
    return await this.userService.update(CurrentContext.get(), id, { name, roles });
  }

  avatar({ avatar }: User) {
    return {
      url: avatar,
    };
  }

  roles({ roles = [] }: User) {
    return roles;
  }
}
