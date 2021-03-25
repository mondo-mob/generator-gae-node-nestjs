import { useQuery } from '@apollo/client';
import * as _ from 'lodash';
import * as React from 'react';
import { ComponentType, createContext, FC } from 'react';
import { Me, Me_me, UserRole } from '../../graphql';
import Loading from '../../modules/pages/Loading';
import Unauthorised from '../../modules/pages/Unauthorised';
import { meQuery } from '../../modules/users/queries';

const defaultComponent = Unauthorised;

export interface UserContextState {
  currentUser?: Me_me;
  hasRole: (...roles: UserRole[]) => boolean;
  authenticated: boolean;
  ifHasRole: (toReturn: ComponentType, ...roles: UserRole[]) => ComponentType;
}

export const UserContext = createContext<UserContextState>({
  hasRole: () => false,
  authenticated: false,
  ifHasRole: () => defaultComponent,
});

export const UserContextProvider: FC = ({ children }) => {
  const { data, loading } = useQuery<Me>(meQuery);
  const currentUser = data?.me || undefined;

  const hasRole = (...roles: UserRole[]) => {
    return !!currentUser && currentUser.roles.some(r => _.includes(roles, r));
  };

  const ifHasRole = (toReturn: ComponentType, ...roles: UserRole[]) =>
    hasRole(...roles) ? toReturn : defaultComponent;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        hasRole,
        authenticated: !!currentUser,
        ifHasRole,
      }}
    >
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};
