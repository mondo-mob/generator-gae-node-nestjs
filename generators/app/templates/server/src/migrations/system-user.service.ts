import {
  Context,
  createLogger,
  CredentialRepository,
  DatastoreProvider,
  hashPassword,
  LoginIdentifierRepository,
  newContext,
} from '@mondomob/gae-node-nestjs';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ConfigurationProvider } from '../config/config.provider';
import { UserRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

const generatePassword = (bits: number) => randomBytes(Math.ceil(bits / 8)).toString('base64');

@Injectable()
export class SystemUserService {
  private readonly logger = createLogger('system-user-service');
  private readonly systemUsername: string;

  constructor(
    private readonly credentialsRepository: CredentialRepository,
    private readonly userRepository: UserRepository,
    private readonly loginIdentifierRepository: LoginIdentifierRepository,
    private readonly userService: UsersService,
    private readonly datastoreProvider: DatastoreProvider,
    configurationProvider: ConfigurationProvider,
  ) {
    this.systemUsername = configurationProvider.bootstrapAdminUser;
  }

  async systemUserExists(context: Context): Promise<boolean> {
    const systemUser = await this.userService.getByEmail(context, this.systemUsername);
    return !!systemUser;
  }

  async bootstrapSystemUser(
    context: Context = this.newContext(),
    password: string = generatePassword(256),
  ): Promise<string> {
    const userId = '12345';
    this.logger.info(`Bootstrapping system user with id ${userId}`);
    await this.credentialsRepository.save(context, {
      id: this.systemUsername,
      type: 'password',
      userId,
      password: await hashPassword(password),
    });

    await this.loginIdentifierRepository.save(context, {
      id: this.systemUsername,
      createdAt: new Date(),
      userId,
    });

    await this.userRepository.save(context, {
      id: userId,
      email: this.systemUsername,
      name: 'Admin',
      roles: ['super', 'admin'],
      enabled: true,
    });

    return password;
  }

  private newContext() {
    return newContext(this.datastoreProvider.datastore);
  }
}
