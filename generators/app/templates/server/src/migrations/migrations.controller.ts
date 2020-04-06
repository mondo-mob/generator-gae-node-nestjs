import { Controller, Post } from '@nestjs/common';
import { System } from '@mondomob/gae-node-nestjs';
import { MigrationService } from './migrations.service';

@Controller('/system/migrate')
@System()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('/bootstrap')
  async createSystemUser() {
    const password = await this.migrationService.bootstrapSystemUser();
    return {
      password,
    };
  }
}
