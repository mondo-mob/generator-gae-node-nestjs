import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { AttachmentsController } from './attachments.controller';

@Module({
  imports: [ConfigurationModule],
  controllers: [AttachmentsController],
})
export class AttachmentsModule {}
