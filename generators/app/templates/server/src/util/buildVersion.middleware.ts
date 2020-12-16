import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getBuildInfo } from './buildVersionUtils';

@Injectable()
export class BuildVersionMiddleware implements NestMiddleware {
  buildTs: number | undefined;

  constructor() {
    this.buildTs = getBuildInfo()?.version;
  }

  // tslint:disable-next-line:ban-types
  use(req: Request, res: Response, next: Function) {
    res.setHeader('build-time', this.buildTs || '0');
    next();
  }
}
