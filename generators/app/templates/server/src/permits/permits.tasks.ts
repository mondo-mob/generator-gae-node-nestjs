import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as Logger from 'bunyan';
import { ConfigurationProvider } from '../config/config.provider';
import { SmsService } from '../sms/sms.service';
import { User, UserRepository } from '../users/users.repository';
import { PermitPdfService } from './permits.pdf';
import { Permit, PermitRepository } from './permits.repository';
import {
  Context,
  createLogger,
  TaskQueue,
  Task,
  GmailSender,
  Ctxt,
  Cron,
} from '@3wks/gae-node-nestjs';

@Injectable()
export class PermitTaskService extends TaskQueue {
  private logger: Logger;

  constructor(configurationProvider: ConfigurationProvider) {
    super(configurationProvider, 'default');
    this.logger = createLogger('created');
  }

  async notifyCreated(permit: Permit) {
    this.logger.info(`Queueing task to notify created for permit ${permit.id}`);
    await this.enqueue('permits/notify-created', {
      permitId: permit.id,
    });
  }

  async notifyApproved(permit: Permit) {
    this.logger.info(
      `Queueing task to notify approved for permit ${permit.id}`,
    );
    await this.enqueue('permits/notify-approved', {
      permitId: permit.id,
    });
  }

  async notifyRejected(permit: Permit) {
    this.logger.info(
      `Queueing task to notify rejected for permit ${permit.id}`,
    );
    await this.enqueue('permits/notify-rejected', {
      permitId: permit.id,
    });
  }

  async dailySummary(user: User) {
    await this.enqueue('permits/send-summary', {
      userId: user.id,
    });
  }
}

@Task()
@Controller('/tasks/permits')
export class PermitsTasks {
  private logger: Logger;

  constructor(
    private readonly permitRepository: PermitRepository,
    private readonly userRepository: UserRepository,
    private readonly permitTasks: PermitTaskService,
    private readonly permitPdfService: PermitPdfService,
    private readonly gmailService: GmailSender,
    private readonly smsService: SmsService,
  ) {
    this.logger = createLogger('created');
  }

  @Post('/notify-created')
  async runNotifyCreated(
    @Ctxt() context: Context,
    @Body('permitId') permitId: string,
  ) {
    const permit = await this.permitRepository.get(context, permitId);
    if (permit && permit.mobileNumber) {
      await this.smsService.send(
        permit.mobileNumber,
        `Hi ${
          permit.name
        }. Your busking permit application has been received. Ref: ${permitId}`,
      );
    }
  }

  @Post('/notify-approved')
  async runNotifyApproved(
    @Ctxt() context: Context,
    @Body('permitId') permitId: string,
  ) {
    const permit = await this.permitRepository.get(context, permitId);

    if (permit) {
      const { pdfUrl, pdf } = await this.permitPdfService.generatePdf(permit);

      permit.pdfUrl = pdfUrl;
      this.logger.info('Saving pdfUrl %s on permit', permit.pdfUrl);
      await this.permitRepository.update(context, permit);
      await this.gmailService.send(context, {
        to: permit.email,
        subject: 'Permit PDF',
        text: 'A PDF of your permit has been attached to this email',
        attachments: [
          {
            content: pdf,
            filename: 'permit.pdf',
            contentType: 'application/pdf',
          },
        ],
      });

      if (permit.mobileNumber) {
        await this.smsService.send(
          permit.mobileNumber,
          `Your busking permit application has been approved. Ref: ${permitId}`,
        );
      }
    }
  }

  @Post('/notify-rejected')
  async runNotifyRejected(
    @Ctxt() context: Context,
    @Body('permitId') permitId: string,
  ) {
    const permit = await this.permitRepository.get(context, permitId);
    if (permit && permit.mobileNumber) {
      await this.smsService.send(
        permit.mobileNumber,
        `Your busking permit application has been rejected. Ref: ${permitId}`,
      );
    }
  }

  @Post('/send-summary')
  async runSummaryEmail(
    @Ctxt() context: Context,
    @Body('userId') userId: string,
  ) {
    const user = await this.userRepository.get(context, userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [pending] = await this.permitRepository.query(context, {
      filters: {
        status: 'pending',
      },
    });

    await this.gmailService.send(context, {
      to: user.email,
      from: 'michael@3wks.com.au',
      subject: 'Permit Application Summary',
      text: pending.map(application => application.description).join(', '),
    });
  }

  @Cron()
  @Get('/daily-summary')
  async runDailySummary(@Ctxt() context: Context) {
    this.logger.info('Computing daily summary');
    const [users] = await this.userRepository.query(context, {
      filters: {
        roles: 'admin',
      },
    });

    this.logger.info('Sending daily summary to following users', users);

    for (const user of users) {
      await this.permitTasks.dailySummary(user);
    }
  }
}
