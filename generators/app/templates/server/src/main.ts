import { bootstrap } from './bootstrap';
import { rootLogger } from '@3wks/gae-node-nestjs';

bootstrap().catch(() => rootLogger.error('Error while bootstrapping the application'));
