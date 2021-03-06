import { Repository, DatastoreProvider } from '@mondomob/gae-node-nestjs';
import * as t from '@mondomob/gae-node-nestjs/dist/types';
import { Injectable } from '@nestjs/common';

const userBase = t.partial({
  avatar: t.string,
});

// TODO: Customise roles enum for your application
const rolesArray = t.array(t.union([t.literal('super'), t.literal('admin'), t.literal('user')]));

const userInputSchema = t.intersection([
  userBase,
  t.partial({
    name: t.string,
    email: t.string,
    roles: rolesArray,
    enabled: t.boolean,
  }),
]);

const userCreateSchema = t.intersection([
  userInputSchema,
  t.interface({
    email: t.string,
    roles: rolesArray,
  }),
]);

const userSchema = t.intersection([
  userCreateSchema,
  t.interface({
    id: t.string,
    enabled: t.boolean,
  }),
  t.partial({
    orgId: t.string,
  }),
]);

export type UserInput = t.TypeOf<typeof userInputSchema>;
export type UserCreate = t.TypeOf<typeof userCreateSchema>;
export type User = t.TypeOf<typeof userSchema>;
export type UserRole = t.TypeOf<typeof rolesArray>;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(datastore: DatastoreProvider) {
    super(datastore.datastore, 'User', userSchema, {
      index: {
        email: true,
        roles: true,
        orgId: true,
      },
      defaultValues: {
        roles: [],
        enabled: true,
      },
    });
  }
}
