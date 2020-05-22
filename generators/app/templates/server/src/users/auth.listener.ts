import { AuthListener } from '@mondomob/gae-node-nestjs';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthListenerImpl implements AuthListener {
  onLogin(_req: Request) {
    // implement me if you like
  }
}
