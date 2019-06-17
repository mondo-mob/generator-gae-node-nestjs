import * as _ from 'lodash';
import * as React from 'react';
import { Me_me, UserRole } from '../graphql';

export class RouteHelper {
  constructor(private readonly defaultComponent: React.ComponentType, private readonly user?: Me_me | null) {}

  public ifHasAnyRole(component: React.ComponentType, ...roles: UserRole[]) {
    return this.ifHasAnyRolesElse(component, this.defaultComponent, ...roles);
  }

  public ifHasAnyRolesElse(component: React.ComponentType, otherComponent: React.ComponentType, ...roles: UserRole[]) {
    if (this.hasAnyRole(...roles)) {
      return component;
    }

    return otherComponent;
  }

  public hasAnyRole(...roles: UserRole[]) {
    return this.user && this.user.roles.some(r => _.includes(roles, r));
  }

  public isNotAuthenticated() {
    return !this.isAuthenticated();
  }

  public isAuthenticated() {
    return !!this.user;
  }

  public userId() {
    return this.user && this.user.id;
  }

  public roles() {
    return (this.user && this.user.roles) || [];
  }

  public isAdmin() {
    return !!(this.user && this.user.roles.find(role => role === UserRole.admin));
  }

  public isUser() {
    return !!(this.user && this.user.roles.find(role => role === UserRole.user));
  }

  public defaultElement(props = {}) {
    return React.createElement(this.defaultComponent, props);
  }
}
