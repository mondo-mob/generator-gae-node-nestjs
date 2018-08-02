import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { SmsService } from './sms.service';

@Module({
  imports: [ConfigurationModule],
  providers: [SmsService],
})
export class SmsModule {}
