import { Module, OnModuleInit } from '@nestjs/common';
import { GCloudModule } from '@mondomob/gae-node-nestjs';
import { ConfigurationModule } from './config/config.module';
import { UserModule } from './users/users.module';
import { MigrationModule } from './migrations/migrations.module';
import { AttachmentsModule } from './attachments/attachments.module';

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
export class AppModule {}
