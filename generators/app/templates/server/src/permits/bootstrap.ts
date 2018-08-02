import { Injectable } from '@nestjs/common';
import { PermitRepository, Permit } from './permits.repository';
import { newContext, DatastoreProvider } from '@3wks/gae-node-nestjs';
import { ConfigurationProvider } from '../config/config.provider';

@Injectable()
export class PermitBootstrap {
  constructor(
    private readonly permitRepository: PermitRepository,
    private readonly datastoreProvider: DatastoreProvider,
    private readonly configProvider: ConfigurationProvider,
  ) {}

  async bootstrap() {
    if (this.configProvider.bootstrap) {
      const faker = await import('faker');

      const permit = (customizations: Partial<Permit> = {}): Permit => ({
        id: faker.random.uuid(),
        email: 'test@example.com',
        name: faker.name.findName(),
        status: 'pending',
        description: 'Description',
        durationInMinutes: 100,
        dateAndTime: new Date(),
        location: 'some location',
        ...customizations,
      });

      const context = newContext(this.datastoreProvider.datastore);
      const [entities] = await this.permitRepository.query(context);

      if (entities.length === 0) {
        await this.permitRepository.save(context, [
          permit(),
          permit(),
          permit(),
        ]);
      }
    }
  }
}
