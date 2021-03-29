import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { BootstrapService } from './bootstrap.service';
import { BootstrapperModule } from './bootstrappers/bootstrapper.module';
import { MigrationController } from './migrations.controller';

@Module({
  imports: [ConfigurationModule, BootstrapperModule],
  providers: [BootstrapService],
  controllers: [MigrationController],
})
export class MigrationModule {
  constructor(private readonly bootstrapService: BootstrapService) {}
  async onModuleInit() {
    await this.bootstrapService.bootstrap();
  }
}
