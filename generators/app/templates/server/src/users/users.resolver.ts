import { Context, Roles, AllowAnonymous } from '@mondomob/gae-node-nestjs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { User } from './users.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userRepository: UserRepository, private readonly userService: UsersService) {}

  @AllowAnonymous()
  @Query(() => User, { nullable: true })
  async me(_req: void, _args: void, context: Context): Promise<User | undefined> {
    if (context.user) {
      return context.user as User;
    }
  }

  @Query(() => [User])
  async users(_obj: {}, _args: {}, context: Context): Promise<User[]> {
    const [users] = await this.userRepository.query(context);

    return users as any as User[];
  }

  @Query(() => User)
  async userById(_obj: void, @Args('id', { type: () => ID }) id: string, context: Context) {
    return this.userRepository.get(context, id);
  }

  @Roles('admin')
  @Mutation(() => User)
  async updateUser(_req: void,
                   @Args('roles', { type: () => [String!] }) roles: string[],
                   @Args('name') name: string,
                   @Args('id', { type: () => ID }) id: string,
                   context: Context) {
    return await this.userService.update(context, id, { name, roles });
  }

}
