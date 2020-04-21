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
  inviteUser: string | null;
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

export interface ListUsers_users_avatar {
  __typename: "Avatar";
  url: string | null;
}

export interface ListUsers_users {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
  enabled: boolean;
  avatar: ListUsers_users_avatar | null;
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
  name: string | null;
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

export interface UserDetails_userById_credentials {
  __typename: "Credentials";
  type: string | null;
  username: string | null;
}

export interface UserDetails_userById_profile {
  __typename: "Attachment";
  id: string;
  filename: string;
}

export interface UserDetails_userById {
  __typename: "User";
  id: string;
  name: string | null;
  roles: UserRole[];
  credentials: UserDetails_userById_credentials | null;
  profile: UserDetails_userById_profile[] | null;
  enabled: boolean;
}

export interface UserDetails {
  userById: UserDetails_userById | null;
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

export interface UpdateUser_updateUser_profile {
  __typename: "Attachment";
  id: string;
  filename: string;
}

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
  name: string | null;
  roles: UserRole[];
  profile: UpdateUser_updateUser_profile[] | null;
  enabled: boolean;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  userId: string;
  name: string;
  roles: UserRole[];
  profile?: AttachmentInput[] | null;
  enabled?: boolean | null;
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

export interface AttachmentInput {
  id: string;
  filename: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
