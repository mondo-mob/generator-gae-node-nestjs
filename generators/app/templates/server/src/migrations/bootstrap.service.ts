import { createLogger, DatastoreProvider, newContext } from '@mondomob/gae-node-nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigurationProvider } from '../config/config.provider';
import { Bootstrapper, BOOTSTRAPPERS } from './bootstrappers/bootstrapper.module';

@Injectable()
export class BootstrapService {
  private readonly logger = createLogger('bootstrap-service');

  constructor(
    private readonly datastoreProvider: DatastoreProvider,
    private readonly configurationProvider: ConfigurationProvider,
    @Inject(BOOTSTRAPPERS) private readonly bootstrappers: Bootstrapper[],
  ) {}

  async bootstrap() {
    if (this.configurationProvider.isDevelopment()) {
      this.logger.info('>>> Bootstrapping local development environment');
      const context = newContext(this.datastoreProvider.datastore);
      for (const bootstrapper of this.bootstrappers) {
        await bootstrapper.bootstrap(context);
      }
      this.logger.info('>>> Bootstrapping complete');
    }
  }
}
