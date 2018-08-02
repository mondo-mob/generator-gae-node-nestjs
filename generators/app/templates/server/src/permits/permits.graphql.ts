import * as Datastore from '@google-cloud/datastore';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Context, AllowAnonymous } from '@3wks/gae-node-nestjs';
import { UserRepository } from '../users/users.repository';
import { Omit } from '../util/types';
import {
  Permit,
  PermitRepository,
  PermitSearch,
  PermitOrderBy,
} from './permits.repository';
import { PermitService } from './permits.service';
import { PermitTaskService } from './permits.tasks';

@Resolver('Permit')
export class PermitResolver {
  constructor(
    private readonly permitRepository: PermitRepository,
    private readonly userRepository: UserRepository,
    private readonly permitTaskService: PermitTaskService,
    private readonly permitService: PermitService,
  ) {}

  status({ status }: Permit) {
    switch (status) {
      case 'pending':
        return {
          key: 'pending',
          description: 'Pending',
        };
      case 'approved':
        return {
          key: 'approved',
          description: 'Approved',
        };
      case 'rejected':
        return {
          key: 'rejected',
          description: 'Rejected',
        };
    }
  }

  @Query('permits')
  async permits(
    _obj: any,
    {
      where,
      orderBy,
      cursor,
    }: { where: PermitSearch; orderBy: PermitOrderBy; cursor: string },
    context: Context,
  ) {
    const limit = 10;
    const [items, queryInfo] = await this.permitRepository.search(
      context,
      where,
      orderBy,
      limit,
      cursor,
    );
    return {
      items,
      cursor: queryInfo.endCursor,
      moreResults: queryInfo.moreResults === Datastore.MORE_RESULTS_AFTER_LIMIT,
    };
  }

  @Query('permitById')
  getPermitById(_obj: any, { id }: { id: string }, context: Context) {
    return this.permitRepository.get(context, id);
  }

  @Mutation()
  async approvePermit(_obj: any, { id }: { id: string }, context: Context) {
    const permit = await this.permitRepository.approvePermit(context, id);

    if (permit) {
      await this.permitTaskService.notifyApproved(permit);
    }

    return permit;
  }

  @Mutation()
  async rejectPermit(
    _obj: any,
    { id, reason }: { id: string; reason: string },
    context: Context,
  ) {
    const permit = await this.permitRepository.rejectPermit(
      context,
      id,
      reason,
    );

    if (permit) {
      await this.permitTaskService.notifyRejected(permit);
    }

    return permit;
  }

  @AllowAnonymous()
  @Mutation()
  async createPermit(
    _obj: any,
    { application }: { application: Omit<Permit, 'status' | 'id'> },
    context: Context,
  ): Promise<Permit> {
    return await this.permitService.createPermit(context, application);
  }
}
