import { Injectable } from '@nestjs/common';
import { Omit } from '../util/types';
import { Permit, PermitRepository } from './permits.repository';
import { PermitTaskService } from './permits.tasks';
import { Context } from '@3wks/gae-node-nestjs';

@Injectable()
export class PermitService {
  constructor(
    private readonly permitRepository: PermitRepository,
    private readonly permitTaskService: PermitTaskService,
  ) {}

  async createPermit(
    context: Context,
    application: Omit<Permit, 'status' | 'id'>,
  ): Promise<Permit> {
    const permit = await this.permitRepository.createPermit(context, {
      ...application,
    });

    if (permit) {
      await this.permitTaskService.notifyCreated(permit);
    }

    return permit;
  }
}
