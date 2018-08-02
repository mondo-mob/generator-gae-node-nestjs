import { Module, OnModuleInit } from "@nestjs/common";
import { MigrationController } from "./migrations.controller";
import { MigrationService } from "./migrations.service";
import { UserModule } from "../users/users.module";
import { ConfigurationModule } from "../config/config.module";

@Module({
  imports: [UserModule, ConfigurationModule],
  providers: [MigrationService],
  controllers: [MigrationController]
})
export class MigrationModule implements OnModuleInit {
  constructor(private readonly migrationService: MigrationService) {}
  async onModuleInit() {
    await this.migrationService.bootstrap();
  }
}
