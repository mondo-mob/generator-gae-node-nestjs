import { Module } from '@nestjs/common';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from '../sms/sms.service';
import { PermitResolver } from './permits.graphql';
import { PermitRepository } from './permits.repository';
import { PermitBootstrap } from './bootstrap';
import { UserModule } from '../users/users.module';
import { ConfigurationModule } from '../config/config.module';
import { PermitService } from './permits.service';
import { PermitsTasks, PermitTaskService } from './permits.tasks';
import { PermitPdfService } from './permits.pdf';
import { PermitsController } from './permits.controller';

@Module({
  providers: [
    PermitResolver,
    PermitRepository,
    PermitBootstrap,
    PermitService,
    PermitTaskService,
    PermitPdfService,
    SmsService,
  ],
  controllers: [PermitsTasks, PermitsController],
  imports: [UserModule, ConfigurationModule, SmsModule],
  exports: [PermitRepository],
})
export class PermitsModule {
  constructor(private readonly permitBootstrap: PermitBootstrap) {}

  async onModuleInit(): Promise<any> {
    await this.permitBootstrap.bootstrap();
  }
}
