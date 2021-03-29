import { Context } from '@mondomob/gae-node-nestjs';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../config/config.module';
import { UserModule } from '../../users/users.module';
import { SystemUserService } from '../system-user.service';
import { SystemUserBootstrapper } from './system-user.bootstrapper';

export const BOOTSTRAPPERS = 'BOOTSTRAPPERS';

export interface Bootstrapper {
  bootstrap(context: Context): void | Promise<void>;
}

@Module({
  imports: [UserModule, ConfigurationModule],
  providers: [
    SystemUserService,
    SystemUserBootstrapper,
    // (1) Add new bootstrappers here
    {
      provide: BOOTSTRAPPERS,
      useFactory: (...bootstrappers: Bootstrapper[]) => bootstrappers,
      // (2) Add new bootstrappers to array below in order you want them to run
      inject: [SystemUserBootstrapper],
    },
  ],
  exports: [BOOTSTRAPPERS, SystemUserService],
})
export class BootstrapperModule {}
