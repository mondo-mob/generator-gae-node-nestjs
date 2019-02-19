import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteHelper } from './route-helper';

interface Props {
  r: RouteHelper;
  roleMappings: any;
  defaultRedirect: string;
}

const RedirectForRoles: React.FC<Props> = ({ r, roleMappings, defaultRedirect }) => {
  const mappedRole = r.roles().find(role => !!roleMappings[role]);
  const redirectPath = mappedRole ? roleMappings[mappedRole] : defaultRedirect;
  return <Redirect to={redirectPath} />;
};

export default RedirectForRoles;
