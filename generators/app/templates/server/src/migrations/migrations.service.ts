import { Injectable } from '@nestjs/common';
import {
  CredentialRepository,
  newContext,
  DatastoreProvider,
  hashPassword,
  createLogger,
  LoginIdentifierRepository,
} from '@mondomob/gae-node-nestjs';
import { ConfigurationProvider } from '../config/config.provider';
import { UserRepository } from '../users/users.repository';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';

const generatePassword = (bits: number) => randomBytes(Math.ceil(bits / 8)).toString('base64');

@Injectable()
export class MigrationService {
  private readonly logger = createLogger('migration-service');

  constructor(
    private readonly credentialsRepository: CredentialRepository,
    private readonly userRepository: UserRepository,
    private readonly loginIdentifierRepository: LoginIdentifierRepository,
    private readonly userService: UsersService,
    private readonly configurationProvider: ConfigurationProvider,
    private readonly datastoreProvider: DatastoreProvider,
  ) {}

  async bootstrap() {
    if (this.configurationProvider.isDevelopment()) {
      const context = newContext(this.datastoreProvider.datastore);

      const match = await this.userService.getByEmail(context, this.configurationProvider.bootstrapAdminUser);

      if (!match) {
        await this.bootstrapSystemUser('password');
      }
    }
  }

  async bootstrapSystemUser(password: string = generatePassword(256)): Promise<string> {
    const context = newContext(this.datastoreProvider.datastore);
    const userId = '12345';

    await this.credentialsRepository.save(context, {
      id: this.configurationProvider.bootstrapAdminUser,
      type: 'password',
      userId,
      password: await hashPassword(password),
    });

    await this.loginIdentifierRepository.save(context, {
      id: this.configurationProvider.bootstrapAdminUser,
      createdAt: new Date(),
      userId,
    });

    await this.userRepository.save(context, {
      id: userId,
      email: this.configurationProvider.bootstrapAdminUser,
      name: 'Admin',
      roles: ['super', 'admin'],
      enabled: true,
    });

    return password;
  }
}
