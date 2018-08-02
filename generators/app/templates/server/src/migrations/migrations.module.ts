import { Controller, Module, Post } from '@nestjs/common';
import {
  Context,
  Ctxt,
  System,
  CredentialRepository,
} from '@3wks/gae-node-nestjs';
import { PermitRepository } from '../permits/permits.repository';
import { PermitsModule } from '../permits/permits.module';

@Controller('/system/migrate')
@System()
class MigrationController {
  constructor(
    private readonly permitRepository: PermitRepository,
    private readonly credentialRepository: CredentialRepository,
  ) {}

  @Post('/migrate-mobile')
  async migrateMobile(@Ctxt() context: Context) {
    await this.permitRepository.reindex(context, input => input);
  }

  @Post('/reindex-permits')
  async reIndexPermits(@Ctxt() context: Context) {
    await this.permitRepository.reindex(context, input => input);

    return 'Reindexed permits';
  }

  @Post('/get-accounts')
  async getCredentials(@Ctxt() context: Context) {
    return await this.credentialRepository.query(context);
  }
}

@Module({
  imports: [PermitsModule],
  controllers: [MigrationController],
})
export class MigrationModule {}
