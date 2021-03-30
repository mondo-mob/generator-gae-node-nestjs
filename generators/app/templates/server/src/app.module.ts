import { GCloudModule } from '@mondomob/gae-node-nestjs';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AttachmentsModule } from './attachments/attachments.module';
import { ConfigurationModule, staticConfig } from './config/config.module';
import { BootstrapperModule } from './migrations/bootstrappers/bootstrapper.module';
import { MigrationModule } from './migrations/migrations.module';
import { UserModule } from './users/users.module';
import { BuildVersionMiddleware } from './util/buildVersion.middleware';
import { CacheHeadersMiddleware } from './util/cacheHeaders.middleware';

@Module({
  imports: [
    GCloudModule.forConfiguration({
      configurationModule: ConfigurationModule,
      userModule: UserModule,
      graphQLModule: GraphQLModule.forRoot({
        path: '/api/graphql',
        context: (props: any) => props.req?.context,
        autoSchemaFile: staticConfig.isDevelopment() ? 'schema.gql' : true, // in-memory for GCP but generate file locally to help troubleshoot
        fieldResolverEnhancers: ['filters', 'interceptors'],
      }),
    }),
    ConfigurationModule,
    UserModule,
    BootstrapperModule,
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
