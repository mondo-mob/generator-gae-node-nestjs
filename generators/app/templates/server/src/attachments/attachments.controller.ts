import { Context, createLogger, Ctxt, Roles, StorageProvider } from '@3wks/gae-node-nestjs';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import * as Logger from 'bunyan';
import { Response } from 'express';
import * as uuid from 'uuid';
import { ConfigurationProvider } from '../config/config.provider';

@Controller('api/attachments')
export class AttachmentsController {
  private logger: Logger;

  constructor(
    private readonly configurationProvider: ConfigurationProvider,
    private readonly storageProvider: StorageProvider,
  ) {
    this.logger = createLogger('attachments-controller');
  }

  @Roles('admin')
  @Post('/upload')
  async uploadAttachment(@Body('contentType') contentType: string) {
    this.logger.info('Generating Google Cloud Storage attachment URL');
    const id = uuid.v4();
    const file = this.storageProvider.defaultBucket.file(`attachment/${id}`);
    const [url] = await file.createResumableUpload({
      origin: this.configurationProvider.host,
      metadata: {
        contentType,
      },
    });

    return {
      id,
      url,
    };
  }

  @Roles('admin')
  @Get('/:id/download')
  async download(@Param('id') id: string, @Ctxt() context: Context, @Res() res: Response) {
    const [url] = await this.storageProvider.defaultBucket.file(`attachment/${id}`).getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 5,
    });

    if (id && url) {
      res.redirect(url);
    } else {
      res.status(404).send('Attachment not found');
    }
  }
}
