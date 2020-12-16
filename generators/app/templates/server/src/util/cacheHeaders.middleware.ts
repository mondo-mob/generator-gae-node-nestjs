import { createLogger, Logger } from '@mondomob/gae-node-nestjs';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getBuildInfo } from './buildVersionUtils';

/**
 * Due to an issue with expressjs not adding correct etags to static files, this
 * is a work around to manually add etag/last-modified headers based on build version
 */
@Injectable()
export class CacheHeadersMiddleware implements NestMiddleware {
  buildTs: number | undefined;
  logger: Logger;

  constructor() {
    this.logger = createLogger('cache-headers-middleware');

    this.buildTs = getBuildInfo()?.version;
  }

  // tslint:disable-next-line:ban-types
  use(req: Request, res: Response, next: Function) {
    next();

    if (this.buildTs && req.headers.accept && req.headers.accept.includes('text/html')) {
      const etag = `W/"${this.buildTs}"`;
      const lastModified = new Date(Number(this.buildTs)).toUTCString();

      this.logger.info(`Setting etag: ${etag}, last-modified: ${lastModified} headers for path ${req.originalUrl}`);

      res.setHeader('etag', etag);
      res.setHeader('last-modified', lastModified);
    }
  }
}
