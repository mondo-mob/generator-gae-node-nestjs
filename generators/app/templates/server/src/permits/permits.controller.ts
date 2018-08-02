import {
  Body,
  Controller,
  FileInterceptor,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as Logger from 'bunyan';
import * as csv from 'csvtojson';
import * as uuid from 'uuid';
import { Response } from 'express';
import {
  Context,
  createLogger,
  StorageProvider,
  AllowAnonymous,
  Ctxt,
  Roles,
} from '@3wks/gae-node-nestjs';
import { Omit } from '../util/types';
import { PermitPdfService } from './permits.pdf';
import { Permit, PermitRepository } from './permits.repository';
import { PermitService } from './permits.service';
import { ConfigurationProvider } from '../config/config.provider';

@Controller('api/permits')
export class PermitsController {
  private logger: Logger;

  constructor(
    private readonly permitService: PermitService,
    private readonly permitRepository: PermitRepository,
    private readonly permitPdfService: PermitPdfService,
    private readonly configurationProvider: ConfigurationProvider,
    private readonly storageProvider: StorageProvider,
  ) {
    this.logger = createLogger('permits-controller');
  }

  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-csv')
  async uploadPermitsCsv(
    @UploadedFile() file: any,
    @Ctxt() context: Context,
    @Res() res: Response,
  ) {
    const fileAsJson: Omit<Permit, 'status' | 'id'>[] = await csv({
      colParser: {
        durationInMinutes: 'number',
        dateAndTime: item => new Date(item),
        mobileNumber: 'string',
      },
      ignoreEmpty: true,
      checkType: true,
    }).fromString(file.buffer.toString());

    this.logger.info('Upload file content:', fileAsJson);

    // process sequentially. fail on the first error encountered.
    for (const application of fileAsJson) {
      try {
        await this.permitService.createPermit(context, application);
      } catch (e) {
        this.logger.error(e);
        return res
          .status(400)
          .send('Problem uploading permit file. See logs for details.');
      }
    }

    res.status(200).send('Upload success');
  }

  @AllowAnonymous()
  @Get('/:id/pdf')
  async download(
    @Param('id') id: string,
    @Ctxt() context: Context,
    @Res() res: Response,
  ) {
    const permit = await this.permitRepository.get(context, id);

    if (permit && permit.pdfUrl) {
      const downloadUrl = await this.permitPdfService.getDownloadUrl(permit);

      res.redirect(downloadUrl);
    } else {
      res.status(404).send('Attachment not found');
    }
  }

  @AllowAnonymous()
  @Post('/attachment/upload')
  async uploadAttachment(@Body('contentType') contentType: string) {
    this.logger.info('Generating Google Cloud Storage upload URL');
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

  @Get('/attachment/:id')
  async downloadAttachment(@Param('id') id: string, @Res() response: Response) {
    // TODO verify that the user has access to the attachment
    this.logger.info(`Downloading permit attachment ${id}`);
    const file = this.storageProvider.defaultBucket.file(`attachment/${id}`);
    const [exists] = await file.exists();
    if (exists) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 5,
      });

      // redirect to the download url
      this.logger.info(`Redirecting to ${url}`);
      response.redirect(url);
    } else {
      response.status(404).send('Not Found');
    }
  }
}
