import { AuthListener } from '@3wks/gae-node-nestjs';
import { Injectable } from "@nestjs/common";
import { Request } from 'express';

@Injectable()
export class AuthListenerImpl implements AuthListener {

    onLogin(req: Request) {
        // implement me if you like
    }
    
}
