import { Injectable } from '@nestjs/common';
import { UserRepository, User } from './users.repository';
// import * as faker from 'faker';
import {
  newContext,
  createLogger,
  DatastoreProvider,
} from '@3wks/gae-node-nestjs';
import * as Logger from 'bunyan';
import { ConfigurationProvider } from '../config/config.provider';

@Injectable()
export class UserBootstrap {
  private logger: Logger;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly datastoreProvider: DatastoreProvider,
    private readonly configProvider: ConfigurationProvider,
  ) {
    this.logger = createLogger('user-bootstrap');
  }

  async boostrap(): Promise<void> {
    if (this.configProvider.bootstrap) {
      const faker = await import('faker');

      const user = (customizations: Partial<User> = {}): User => ({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.exampleEmail(),
        roles: [],
        ...customizations,
      });

      const context = newContext(this.datastoreProvider.datastore);
      const [allUsers] = await this.userRepository.query(context);

      if (allUsers.length === 0) {
        await this.userRepository.save(context, [
          user({ id: '12345', roles: ['admin'] }),
          user(),
          user(),
          user(),
          user(),
          user(),
        ]);

        this.logger.info('Bootstrapped users');
      }
    }
  }
}
