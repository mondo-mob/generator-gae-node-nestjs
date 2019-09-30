import {
  BunyanLogger,
  rootLogger,
  configureExpress,
} from '@3wks/gae-node-nestjs';
import * as debug from '@google-cloud/debug-agent';
import * as trace from '@google-cloud/trace-agent';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { configurationProvider } from './config/config.module';

if (process.env.APP_ENGINE_ENVIRONMENT) {
  trace.start();
  debug.start({
    allowExpressions: true,
  });
}

export async function bootstrap() {
  const expressApp = express();
  configureExpress(expressApp, {
    session: configurationProvider.session,
    sessionTimeoutInMinutes: configurationProvider.sessionTimeoutInMinutes,
    staticAssets: {
      root: 'public',
    },
  });

  rootLogger.info(`Configuring server`);
  const app = await NestFactory.create(AppModule, expressApp, {
    logger: new BunyanLogger(),
  });

  const stopListener = async () => {
    rootLogger.info('Killing process');

    await app.close();
    process.exit();
  };
  process.on('SIGINT', stopListener);

  const port = process.env.PORT || 8080;
  await app.listen(port);

  rootLogger.info(`Listening on port ${port}`);

  return {
    app,
    stop: async () => {
      process.removeListener('SIGINT', stopListener);
      await app.close();
    },
  };
}
