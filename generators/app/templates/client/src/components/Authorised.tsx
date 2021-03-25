import * as React from 'react';
import { useContext } from 'react';
import { UserRole } from '../graphql';
import { asArray } from '../util/util';
import { UserContext } from './context/UserContext';

interface Props {
  roles: UserRole | UserRole[];
}

const Authorised: React.FC<Props> = ({ roles, children }) => {
  const { hasRole } = useContext(UserContext);

  return hasRole(...asArray(roles)) ? <>{children}</> : null;
};

export default Authorised;
