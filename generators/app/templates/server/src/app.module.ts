import { Module } from '@nestjs/common';
import { GCloudModule } from '@3wks/gae-node-nestjs';
import { ConfigurationModule } from './config/config.module';
import { UserModule } from './users/users.module';
import { PermitsModule } from './permits/permits.module';
import { MigrationModule } from './migrations/migrations.module';
import { GraphQLConfiguration } from './graphql/graphql.module';

@Module({
  imports: [
    GCloudModule.forConfiguration({
      configurationModule: ConfigurationModule,
      userModule: UserModule,
    }),
    ConfigurationModule,
    UserModule,
    PermitsModule,
    MigrationModule,
    GraphQLConfiguration,
  ],
})
export class AppModule {}
