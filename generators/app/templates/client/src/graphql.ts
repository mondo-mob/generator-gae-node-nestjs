/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  id: string;
  roles: string[];
}

export interface Me {
  me: Me_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllUsers
// ====================================================

export interface AllUsers_users {
  id: string;
  email: string;
}

export interface AllUsers {
  users: AllUsers_users[];
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
// GraphQL mutation operation: CreatePermit
// ====================================================

export interface CreatePermit_createPermit {
  id: string;
}

export interface CreatePermit {
  createPermit: CreatePermit_createPermit;
}

export interface CreatePermitVariables {
  application: PermitApplication;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPermits
// ====================================================

export interface AllPermits_permits_items_status {
  key: string;
  description: string;
}

export interface AllPermits_permits_items {
  id: string;
  name: string;
  description: string;
  dateAndTime: any;
  location: string;
  mobileNumber: string | null;
  email: string;
  status: AllPermits_permits_items_status;
}

export interface AllPermits_permits {
  items: AllPermits_permits_items[];
  cursor: string | null;
  moreResults: boolean | null;
}

export interface AllPermits {
  permits: AllPermits_permits;
}

export interface AllPermitsVariables {
  status?: string | null;
  orderBy?: PermitOrderBy | null;
  cursor?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PermitDetails
// ====================================================

export interface PermitDetails_permitById_attachments {
  id: string;
  filename: string;
}

export interface PermitDetails_permitById {
  id: string;
  dateAndTime: any;
  durationInMinutes: number;
  location: string;
  rejectionReason: string | null;
  pdfUrl: string | null;
  name: string;
  email: string;
  mobileNumber: string | null;
  attachments: PermitDetails_permitById_attachments[] | null;
}

export interface PermitDetails {
  permitById: PermitDetails_permitById | null;
}

export interface PermitDetailsVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PermitsByMobileNumber
// ====================================================

export interface PermitsByMobileNumber_permits_items_status {
  key: string;
  description: string;
}

export interface PermitsByMobileNumber_permits_items {
  id: string;
  description: string;
  dateAndTime: any;
  name: string;
  status: PermitsByMobileNumber_permits_items_status;
}

export interface PermitsByMobileNumber_permits {
  items: PermitsByMobileNumber_permits_items[];
}

export interface PermitsByMobileNumber {
  permits: PermitsByMobileNumber_permits;
}

export interface PermitsByMobileNumberVariables {
  mobileNumber: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PermitDetailsHeader
// ====================================================

export interface PermitDetailsHeader_permitById_status {
  key: string;
  description: string;
}

export interface PermitDetailsHeader_permitById {
  id: string;
  description: string;
  dateAndTime: any;
  name: string;
  status: PermitDetailsHeader_permitById_status;
}

export interface PermitDetailsHeader {
  permitById: PermitDetailsHeader_permitById | null;
}

export interface PermitDetailsHeaderVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApprovePermit
// ====================================================

export interface ApprovePermit_approvePermit_status {
  key: string;
  description: string;
}

export interface ApprovePermit_approvePermit {
  id: string;
  status: ApprovePermit_approvePermit_status;
}

export interface ApprovePermit {
  approvePermit: ApprovePermit_approvePermit | null;
}

export interface ApprovePermitVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RejectPermit
// ====================================================

export interface RejectPermit_rejectPermit_status {
  key: string;
  description: string;
}

export interface RejectPermit_rejectPermit {
  id: string;
  status: RejectPermit_rejectPermit_status;
  rejectionReason: string | null;
}

export interface RejectPermit {
  rejectPermit: RejectPermit_rejectPermit | null;
}

export interface RejectPermitVariables {
  id: string;
  reason: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteUser
// ====================================================

export interface InviteUser {
  inviteUser: boolean | null;
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
  name: string;
  email: string;
  avatar: ListUsers_users_avatar;
  roles: string[];
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
  name: string;
  roles: string[];
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

export interface UpdateUser_updateUser {
  id: string;
  name: string;
  roles: string[];
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PermitCard
// ====================================================

export interface PermitCard_status {
  key: string;
  description: string;
}

export interface PermitCard {
  id: string;
  description: string;
  dateAndTime: any;
  name: string;
  status: PermitCard_status;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PermitStatus
// ====================================================

export interface PermitStatus {
  key: string;
  description: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PermitSortField {
  dateAndTime = 'dateAndTime',
  name = 'name',
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

//
export interface PermitApplication {
  name: string;
  email: string;
  location: string;
  dateAndTime: any;
  description: string;
  durationInMinutes: number;
  mobileNumber?: string | null;
  attachments?: PermitApplicationAttachment[] | null;
}

//
export interface PermitApplicationAttachment {
  id: string;
  filename: string;
}

//
export interface PermitOrderBy {
  field: PermitSortField;
  direction: SortDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
