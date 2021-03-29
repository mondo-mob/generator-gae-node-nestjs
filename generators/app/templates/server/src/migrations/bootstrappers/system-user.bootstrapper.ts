import { Context, createLogger } from '@mondomob/gae-node-nestjs';
import { Injectable } from '@nestjs/common';
import { SystemUserService } from '../system-user.service';
import { Bootstrapper } from './bootstrapper.module';

@Injectable()
export class SystemUserBootstrapper implements Bootstrapper {
  private readonly logger = createLogger('system-user-bootstrapper');

  constructor(private readonly systemUserService: SystemUserService) {}

  async bootstrap(context: Context) {
    if (!(await this.systemUserService.systemUserExists(context))) {
      await this.systemUserService.bootstrapSystemUser(context, 'password');
      this.logger.info('System user bootstrapped');
    } else {
      this.logger.info('System user alrady exists');
    }
  }
}
