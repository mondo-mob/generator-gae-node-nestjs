import { isArray } from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Me, UserRole } from '../graphql';
import Unauthorised from '../modules/pages/Unauthorised';
import { meQuery } from '../modules/users/queries';
import { RouteHelper } from '../routes/route-helper';

interface Props {
  roles: UserRole | UserRole[];
}

const Authorised: React.FC<Props> = ({ roles, children }) => (
  <Query<Me> query={meQuery}>
    {({ data, loading }) => {
      if (loading) {
        return null;
      }

      const r = new RouteHelper(Unauthorised, data && data.me);
      const rolesArray: UserRole[] = isArray(roles) ? roles : [roles];
      return r.hasAnyRole(...rolesArray) ? <React.Fragment>{children}</React.Fragment> : null;
    }}
  </Query>
);

export default Authorised;
