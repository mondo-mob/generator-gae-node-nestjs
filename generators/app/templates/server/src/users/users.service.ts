import { AbstractUserService, Context, CurrentContext, LoginIdentifierRepository } from '@3wks/gae-node-nestjs';
import { Injectable } from '@nestjs/common';
import * as uuid from 'node-uuid';
import { User, UserCreate, UserInput, UserRepository } from './users.repository';

@Injectable()
export class UsersService extends AbstractUserService<User> {
  constructor(
    protected readonly loginIdentifierRepository: LoginIdentifierRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(loginIdentifierRepository);
  }

  async listByRole(role: string, limit = 1000) {
    // @ts-ignore
    const [users] = await this.userRepository.query(CurrentContext.get(), {
      filters: {
        roles: role,
      },
      limit,
    });
    return users;
  }

  async getRequired(userId: string) {
    const result = await this.get(CurrentContext.get(), userId);
    if (!result) {
      throw new Error(`No user found with id: ${userId}`);
    }
    return result;
  }

  async get(context: Context, userId: string | undefined) {
    if (!userId) {
      return undefined;
    }
    return this.userRepository.get(context, userId);
  }

  protected async createUser(context: Context, user: UserCreate) {
    const entity = { ...user } as User;

    entity.id = entity.id || uuid.v4();
    entity.avatar = '';
    entity.enabled = entity.enabled === undefined || entity.enabled;

    return this.userRepository.save(context, entity);
  }

  protected async updateUser(context: Context, user: User, updates: UserInput): Promise<User> {
    return this.userRepository.save(context, { ...user, ...updates });
  }
}
