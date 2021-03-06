import { Configuration, createLogger } from '@mondomob/gae-node-nestjs';
import * as t from 'io-ts';
import { reporter } from 'io-ts-reporters';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import * as _ from 'lodash';
import { SecretsClient } from './secrets/secrets.client';
import { SecretsResolver } from './secrets/secrets.resolver';

const auth = t.partial({
  local: t.interface({
    enabled: t.boolean,
  }),
  google: t.interface({
    enabled: t.boolean,
    clientId: t.string,
    secret: t.string,
    signUpEnabled: t.boolean,
    signUpDomains: t.array(t.string),
    signUpRoles: t.array(t.string),
  }),
  saml: t.interface({
    enabled: t.boolean,
    cert: t.string,
    identityProviderUrl: t.string,
  }),
});

const devHooks = t.partial({
  disableLocalMailLogger: t.boolean,
  divertEmailTo: t.array(t.string),
  emailSubjectPrefix: t.string,
});

const requestScope = t.partial({
  enabled: t.boolean,
});

// tslint:disable-next-line:variable-name
const Config = t.intersection([
  t.interface({
    projectId: t.string,
    host: t.string,
    bucket: t.string,
    location: t.string,
    gmailUser: t.string,
    bootstrapAdminUser: t.string,
    systemSecret: t.string,
    cookieSecret: t.string,
    auth,
  }),
  t.partial({
    APP_ENGINE_ENVIRONMENT: t.string,
    GOOGLE_CLOUD_PROJECT: t.string,
    gcpProjectId: t.string, // If different from projectId (e.g. locally accessing dev)
    devHooks,
    apiEndpoint: t.string,
    searchServiceEndpoint: t.string,
    sessionTimeoutInMinutes: t.number,
    requestScope,
  }),
]);

interface SessionConfiguration {
  apiEndpoint?: string;
  projectId?: string;
  secret: string;
}

export class ConfigurationProvider implements Configuration {
  private readonly logger = createLogger('configuration-provider');
  configuration: t.TypeOf<typeof Config>;

  constructor() {
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      const projectId = process.env.GOOGLE_CLOUD_PROJECT;
      process.env.NODE_CONFIG_ENV = _.last(projectId.split('-'));
    } else if (!process.env.NODE_CONFIG_ENV) {
      process.env.NODE_CONFIG_ENV = 'development';
    }

    const nodeConfig = require('config');
    const mergedConfig: object = {};
    const configSources: any = nodeConfig.util.getConfigSources();

    configSources.forEach((config: any) => {
      this.logger.info(`Loading config from ${config.name}`);
      nodeConfig.util.extendDeep(mergedConfig, config.parsed);
    });

    const withEnvironment = nodeConfig.util.extendDeep(mergedConfig, process.env);

    const decodedConfig = Config.decode(withEnvironment);

    if (decodedConfig.isLeft()) {
      this.logger.error(reporter(decodedConfig));
      throw ThrowReporter.report(decodedConfig);
    }

    this.configuration = decodedConfig.value;
  }

  async resolveSecrets() {
    const secretsResolver = new SecretsResolver(new SecretsClient(this.gcpProjectId));
    this.logger.info('Resolving all secrets ...');
    this.configuration = await secretsResolver.resolveSecrets(this.configuration);
    this.logger.info('Secrets resolved');
    return this;
  }

  get requestScope() {
    return this.configuration.requestScope;
  }

  get projectId(): string {
    return this.configuration.projectId;
  }

  get environment(): 'development' | 'appengine' {
    if (this.configuration.APP_ENGINE_ENVIRONMENT) {
      return 'appengine';
    }

    return 'development';
  }

  isDevelopment(): boolean {
    return this.environment === 'development';
  }

  get host(): string {
    return this.configuration.host;
  }

  get bucket(): string {
    return this.configuration.bucket;
  }

  get location(): string {
    return this.configuration.location;
  }

  get apiEndpoint(): string | undefined {
    return this.configuration.apiEndpoint;
  }

  get gmailUser(): string {
    return this.configuration.gmailUser;
  }

  get bootstrapAdminUser(): string {
    return this.configuration.bootstrapAdminUser;
  }

  get systemSecret(): Buffer {
    return Buffer.from(this.configuration.systemSecret, 'base64');
  }

  get auth() {
    return this.configuration.auth;
  }

  get devHooks() {
    return this.configuration.devHooks;
  }

  get searchServiceEndpoint() {
    return this.configuration.searchServiceEndpoint;
  }

  get sessionTimeoutInMinutes() {
    return this.configuration.sessionTimeoutInMinutes;
  }

  get session(): SessionConfiguration {
    return {
      secret: this.configuration.cookieSecret,
      apiEndpoint: this.apiEndpoint,
      projectId: this.projectId,
    };
  }

  /**
   * This is the project id used for using GCP services. In local development this is different from the root projectId.
   * We use the gcpProjectId config option but fall back to projectId if it's not set.
   */
  get gcpProjectId() {
    return this.configuration.gcpProjectId || this.configuration.projectId;
  }
}
