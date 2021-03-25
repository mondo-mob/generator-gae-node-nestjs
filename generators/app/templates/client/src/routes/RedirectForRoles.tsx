import { toPairs } from 'lodash';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../components/context/UserContext';
import { UserRole } from '../graphql';

interface Props {
  roleMappings: Record<string, string>;
  defaultRedirect: string;
}

const RedirectForRoles: React.FC<Props> = ({ roleMappings, defaultRedirect }) => {
  const { hasRole } = useContext(UserContext);

  const matchedMapping = toPairs(roleMappings).find(([role]) => hasRole(role as UserRole));

  const redirectPath = matchedMapping ? matchedMapping[1] : defaultRedirect;
  return <Redirect to={redirectPath} />;
};

export default RedirectForRoles;
