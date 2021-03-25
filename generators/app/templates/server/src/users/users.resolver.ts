import { Context, Roles, AllowAnonymous } from '@mondomob/gae-node-nestjs';
import { Args, Context as GqlContext, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './users.dto';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly userRepository: UserRepository, private readonly userService: UsersService) {}

  @AllowAnonymous()
  @Query(() => UserDto, { nullable: true })
  async me(_req: void, _args: void, context: Context): Promise<UserDto | undefined> {
    if (context.user) {
      return context.user as UserDto;
    }
  }

  @Query(() => [UserDto])
  async users(_obj: {}, _args: {}, context: Context): Promise<UserDto[]> {
    const [users] = await this.userRepository.query(context);

    return (users as any) as UserDto[];
  }

  @Query(() => UserDto)
  async userById(@Args('id', { type: () => ID }) id: string, @GqlContext() context: Context) {
    return this.userRepository.get(context, id);
  }

  @Roles('admin')
  @Mutation(() => UserDto)
  async updateUser(
    @Args('roles', { type: () => [String!] }) roles: string[],
    @Args('name') name: string,
    @Args('id', { type: () => ID }) id: string,
    @GqlContext() context: Context,
  ) {
    return await this.userService.update(context, id, { name, roles });
  }
}
