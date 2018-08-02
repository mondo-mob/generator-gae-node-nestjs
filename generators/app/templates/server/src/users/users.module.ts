import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.graphql';
import { UserRepository } from './users.repository';
import { UserBootstrap } from './bootstrap';
import { UsersService } from './users.service';
import { ConfigurationModule } from '../config/config.module';
import { USER_SERVICE } from '@3wks/gae-node-nestjs';

@Module({
  imports: [ConfigurationModule],
  providers: [
    UsersResolver,
    UserRepository,
    UserBootstrap,
    UsersService,
    { provide: USER_SERVICE, useClass: UsersService },
  ],
  exports: [UserRepository, USER_SERVICE],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userBootstrap: UserBootstrap) {}

  async onModuleInit(): Promise<any> {
    await this.userBootstrap.boostrap();
  }
}
