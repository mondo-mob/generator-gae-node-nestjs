import { bootstrap } from './bootstrap';
import { rootLogger } from '@mondomob/gae-node-nestjs';

bootstrap()
  .then(() => rootLogger.info('Successfully bootstrapped app'))
  .catch(err => {
    rootLogger.error('Error bootstrapping app: ', err);
    throw err;
  });
