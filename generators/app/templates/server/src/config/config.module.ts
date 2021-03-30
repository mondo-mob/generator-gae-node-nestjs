import { Module } from '@nestjs/common';
import { ConfigurationProvider } from './config.provider';

const configurationProvider = new ConfigurationProvider();
const configurationProviderPromise = configurationProvider.resolveSecrets();

const { isDevelopment, session, sessionTimeoutInMinutes } = configurationProvider;

export const staticConfig = {
  isDevelopment,
  session,
  sessionTimeoutInMinutes,
};

@Module({
  providers: [
    { provide: ConfigurationProvider, useFactory: () => configurationProviderPromise },
    { provide: 'Configuration', useFactory: () => configurationProviderPromise },
  ],
  exports: [ConfigurationProvider, 'Configuration'],
})
export class ConfigurationModule {}
