import { Context, IUser } from '@3wks/gae-node-nestjs';
import { DatastoreLoader } from '@3wks/gae-node-nestjs/dist/datastore/loader';
import * as _ from 'lodash';
import { anyFunction, instance, mock, when } from 'ts-mockito';
import { User } from '../users/users.repository';

export const DEFAULT_USER_ID = 'user-123';

export const DEFAULT_USER: User = {
  id: DEFAULT_USER_ID,
  email: 'user@user.org',
  roles: ['admin'],
  enabled: true,
};

export const testContext = (user: User = { ...DEFAULT_USER }) => {
  const datastoreLoader = mock(DatastoreLoader);

  const context = {
    datastore: instance(datastoreLoader),
  } as Context;
  context.user = user;

  context.hasAnyRole = (...roles: string[]) =>
    !!context.user && (context.user as IUser).roles.some(r => _.includes(roles, r));

  when(datastoreLoader.inTransaction(anyFunction())).thenCall((cb: any) => cb(context));

  return context;
};
