import { AbstractUserService, Context, LoginIdentifierRepository } from '@mondomob/gae-node-nestjs';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserCreate, UserInput, UserRepository, UserRole } from './users.repository';

@Injectable()
export class UsersService extends AbstractUserService<User> {
  constructor(
    protected readonly loginIdentifierRepository: LoginIdentifierRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(loginIdentifierRepository);
  }

  async listByRole(context: Context, role: UserRole, limit = 1000) {
    const [users] = await this.userRepository.query(context, {
      filters: {
        roles: role,
      },
      limit,
    });
    return users;
  }

  async getRequired(context: Context, userId: string) {
    const result = await this.get(context, userId);
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

    entity.id = entity.id || uuidv4();
    entity.avatar = '';
    entity.enabled = entity.enabled === undefined || entity.enabled;

    return this.userRepository.save(context, entity);
  }

  protected async updateUser(context: Context, user: User, updates: UserInput): Promise<User> {
    return this.userRepository.save(context, { ...user, ...updates });
  }
}
