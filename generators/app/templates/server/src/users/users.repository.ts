import { Repository, DatastoreProvider } from '@3wks/gae-node-nestjs';
import * as t from '@3wks/gae-node-nestjs/dist/validator';
import { Injectable } from '@nestjs/common';

const userSchema = t.intersection([
  t.interface({
    id: t.string,
    name: t.string,
    email: t.string,
    roles: t.array(t.string),
  }),
  t.partial({
    avatar: t.string,
  }),
]);

export type User = t.TypeOf<typeof userSchema>;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(datastore: DatastoreProvider) {
    super(datastore.datastore, 'User', userSchema, {
      defaultValues: {
        roles: [],
      },
    });
  }
}
