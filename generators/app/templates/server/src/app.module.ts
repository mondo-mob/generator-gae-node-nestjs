import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GCloudModule } from '@mondomob/gae-node-nestjs';
import { ConfigurationModule } from './config/config.module';
import { UserModule } from './users/users.module';
import { MigrationModule } from './migrations/migrations.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { BuildVersionMiddleware } from './util/buildVersion.middleware';
import { CacheHeadersMiddleware } from './util/cacheHeaders.middleware';

@Module({
  imports: [
    GCloudModule.forConfiguration({
      configurationModule: ConfigurationModule,
      userModule: UserModule,
    }),
    ConfigurationModule,
    UserModule,
    MigrationModule,
    AttachmentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BuildVersionMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(CacheHeadersMiddleware)
        .exclude('(api|tasks|system)/(.*)')
        .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
