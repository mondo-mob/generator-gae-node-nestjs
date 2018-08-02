import { Injectable } from '@nestjs/common';
import * as Logger from 'bunyan';
import * as Twilio from 'twilio';
import { ConfigurationProvider } from '../config/config.provider';
import { createLogger } from '@3wks/gae-node-nestjs';

@Injectable()
export class SmsService {
  private logger: Logger;

  constructor(private readonly configProvider: ConfigurationProvider) {
    this.logger = createLogger('sms-service');
  }

  async send(mobileNumber: string, messageBody: string) {
    if (!this.configProvider.twilioNumber) {
      this.logger.info('Not sending SMS as twilio not configured');
      return;
    }

    this.logger.info('Sending sms to', mobileNumber);

    if (!this.validE164(mobileNumber)) {
      throw new Error('SMS number must be E164 format!');
    }

    const client = Twilio(
      this.configProvider.twilioAccountSID,
      this.configProvider.twilioAuthToken,
    );

    return await client.messages
      .create({
        body: messageBody,
        to: mobileNumber,
        from: this.configProvider.twilioNumber,
      })
      .then((message: any) =>
        this.logger.info(`Sms message sent with sid: ${message.sid}`),
      );
  }

  // Validate E164 format
  validE164 = (num: string): boolean => {
    return /^\+?[1-9]\d{1,14}$/.test(num);
  };
}
