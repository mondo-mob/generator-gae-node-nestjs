import { createLogger, Logger } from '@mondomob/gae-node-nestjs';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Node's default request timeout is 120s. For potentially long running requests such as Tasks and Crons, this can
 * cause unexpected behaviour. A task could return a HTTP 502 after 120s even if the task is still running.
 * This could potentially cause a retry of a task before the first execution has finished.
 *
 * This middleware will increase the timeout for requests to 10 minutes. It should be configured for all Task and Cron
 * requests.
 */

@Injectable()
export class TaskTimeoutMiddleware implements NestMiddleware {
  private logger: Logger;

  constructor() {
    this.logger = createLogger(TaskTimeoutMiddleware.name);
  }

  use(req: Request, _res: Response, next: () => void): void {
    const taskPath = req.originalUrl;
    this.logger.info(`Extending request timeout to 10 minutes for request: ${taskPath}`);
    req.setTimeout(600000, () => this.logger.warn(`Task: ${taskPath} has exceeded 10 minutes`));
    next();
  }
}
