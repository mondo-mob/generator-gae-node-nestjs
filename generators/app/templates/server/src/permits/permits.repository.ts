import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { Omit } from '../util/types';
import * as Logger from 'bunyan';
import {
  createLogger,
  Context,
  Transactional,
  Repository,
  dateType,
  DatastoreProvider,
  Filters,
} from '@3wks/gae-node-nestjs';
import * as t from '@3wks/gae-node-nestjs/dist/validator';
import { QueryInfo } from '@google-cloud/datastore/query';

const permitSchema = t.intersection([
  t.interface({
    id: t.string,
    name: t.string,
    email: t.string,
    status: t.union([
      t.literal('pending'),
      t.literal('approved'),
      t.literal('rejected'),
    ]),
    location: t.string,
    dateAndTime: dateType, // Date
    durationInMinutes: t.number,
    description: t.string,
  }),
  t.partial({
    rejectionReason: t.string,
    pdfUrl: t.string,
    mobileNumber: t.string,
    attachments: t.array(
      t.interface({
        id: t.string,
        filename: t.string,
      }),
    ),
  }),
]);

export type Permit = t.TypeOf<typeof permitSchema>;

export interface PermitSearch {
  status?: Permit['status'];
  mobileNumber?: Permit['mobileNumber'];
}

export interface PermitOrderBy {
  field: 'name' | 'dateAndTime';
  direction: 'asc' | 'desc';
}

@Injectable()
export class PermitRepository extends Repository<Permit> {
  private readonly logger: Logger = createLogger('permits');

  constructor(datastoreProvider: DatastoreProvider) {
    super(datastoreProvider.datastore, 'Permit', permitSchema, {
      index: {
        name: true,
        dateAndTime: true,
        status: true,
        mobileNumber: true,
      },
      defaultValues: {
        name: '',
        email: '',
      },
    });
  }

  async search(
    context: Context,
    search: PermitSearch,
    orderBy: PermitOrderBy,
    limit: number = 10,
    cursor: string,
  ): Promise<[ReadonlyArray<Permit>, QueryInfo]> {
    const filters: Filters<Permit> = {
      ...search,
    };

    const sort = orderBy && {
      property: orderBy.field,
      options: {
        descending: orderBy && orderBy.direction === 'desc' ? true : false,
      },
    };

    return await this.query(context, {
      filters,
      sort,
      limit,
      start: cursor,
    });
  }

  @Transactional()
  async approvePermit(
    context: Context,
    id: string,
  ): Promise<Permit | undefined> {
    this.logger.info('Approving permit', id);

    const permit = await this.get(context, id);

    if (permit) {
      permit.status = 'approved';
      await this.update(context, permit);
    }

    return permit;
  }

  async createPermit(
    context: Context,
    args: Omit<Permit, 'id' | 'status'>,
  ): Promise<Permit> {
    return await this.insert(context, {
      ...args,
      status: 'pending',
      id: uuid.v4(),
    });
  }

  @Transactional()
  async rejectPermit(
    context: Context,
    id: string,
    reason: string,
  ): Promise<Permit | undefined> {
    const permit = await this.get(context, id);

    if (permit) {
      if (permit.status === 'rejected') {
        throw new Error('Permit has already been rejected');
      }

      permit.status = 'rejected';
      permit.rejectionReason = reason;

      await this.save(context, permit);
    }

    return permit;
  }
}
