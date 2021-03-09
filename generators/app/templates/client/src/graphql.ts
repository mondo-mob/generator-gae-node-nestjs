/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckActivationCode
// ====================================================

export interface CheckActivationCode {
  checkActivationCode: string | null;
}

export interface CheckActivationCodeVariables {
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConfirmResetPassword
// ====================================================

export interface ConfirmResetPassword {
  confirmResetPassword: boolean | null;
}

export interface ConfirmResetPasswordVariables {
  password: string;
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword {
  resetPassword: boolean | null;
}

export interface ResetPasswordVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteUser
// ====================================================

export interface InviteUser {
  inviteUser: string;
}

export interface InviteUserVariables {
  email: string;
  roles: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListUsers
// ====================================================

export interface ListUsers_users {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  roles: UserRole[];
}

export interface ListUsers {
  users: ListUsers_users[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  id: string;
  name: string;
  roles: UserRole[];
  enabled: boolean;
}

export interface Me {
  me: Me_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_userById {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  enabled: boolean;
}

export interface UserDetails {
  userById: UserDetails_userById;
}

export interface UserDetailsVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  enabled: boolean;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  userId: string;
  name: string;
  roles: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  admin = "admin",
  super = "super",
  user = "user",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
