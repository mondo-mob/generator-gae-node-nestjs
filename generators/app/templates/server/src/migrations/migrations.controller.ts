import { System } from '@mondomob/gae-node-nestjs';
import { Controller, Post } from '@nestjs/common';
import { SystemUserService } from './system-user.service';

@Controller('/system/migrate')
@System()
export class MigrationController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post('/bootstrap')
  async createSystemUser() {
    const password = await this.systemUserService.bootstrapSystemUser();
    return {
      password,
    };
  }
}
