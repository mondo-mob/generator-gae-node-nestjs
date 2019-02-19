/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  id: string;
  roles: UserRole[];
}

export interface Me {
  me: Me_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ActivateAccount
// ====================================================

export interface ActivateAccount {
  activateAccount: boolean | null;
}

export interface ActivateAccountVariables {
  name: string;
  password: string;
  code: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListUsers
// ====================================================

export interface ListUsers_users_avatar {
  url: string | null;
}

export interface ListUsers_users {
  id: string;
  name: string | null;
  email: string;
  avatar: ListUsers_users_avatar;
  roles: UserRole[];
}

export interface ListUsers {
  users: ListUsers_users[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_userById_credentials {
  type: string | null;
  username: string | null;
}

export interface UserDetails_userById {
  id: string;
  name: string | null;
  roles: UserRole[];
  credentials: UserDetails_userById_credentials | null;
}

export interface UserDetails {
  userById: UserDetails_userById | null;
}

export interface UserDetailsVariables {
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_profile {
  id: string;
  filename: string;
}

export interface UpdateUser_updateUser {
  id: string;
  name: string | null;
  roles: UserRole[];
  profile: UpdateUser_updateUser_profile[] | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  userId: string;
  name: string;
  roles: UserRole[];
  profile?: AttachmentInput[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  admin = 'admin',
  super = 'super',
  user = 'user',
}

//
export interface AttachmentInput {
  id: string;
  filename: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
