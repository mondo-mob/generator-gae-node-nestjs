import { AUTH_LISTENER, USER_SERVICE } from '@3wks/gae-node-nestjs';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { AuthListenerImpl } from './auth.listener';
import { UserRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigurationModule],
  providers: [
    UsersResolver,
    UserRepository,
    UsersService,
    { provide: USER_SERVICE, useClass: UsersService },
    { provide: AUTH_LISTENER, useClass: AuthListenerImpl },
  ],
  exports: [UserRepository, USER_SERVICE, UsersService, AUTH_LISTENER],
})
export class UserModule {}
