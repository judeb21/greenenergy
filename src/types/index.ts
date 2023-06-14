export interface Token {
  TenantId: string;
  tenantId?: string;
  Username: string;
  exp: string;
  iat: string;
  nbf: string;
  unique_name: string;
  isActive?: boolean;
}

export interface SelectOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Options {
  text: string;
}

export enum Role {
  GUEST = "GUEST",
  AUTH = "AUTH",
}

export enum Status {
  LOADING = "LOADING",
  NORMAL = "NORMAL",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TargetOptions {
  options: Array<Options>;
  selectedIndex: number;
  value: string;
  select: any;
}

export interface TargetObject {
  target: TargetOptions;
}

export interface AuthRequestStatus {
  login: Status;
  signup: Status;
  setPassword: Status;
  confirmAccount: Status;
  confirmAccountRequest: Status;
  refreshToken: Status;
  notificationCountStatus: Status;
  notificationsStatus: Status;
}

export interface ResetPasswordRequest {
  sendResetPasswordEmail: Status;
  validateOTP: Status;
  resetPassword: Status;
  resendOTP: Status;
}

export interface RequestErrorObject {
  code: number | null;
  message: string;
}

//Login Type
export interface LoginInfo {
  username: string;
  password: string;
}

export interface CreateUserInfo {
  email: string;
  phoneNumber: string;
  username?: string;
  firstname?: string;
  lastname?: string;
}

export interface ConfirmUserDetails {
  email: string;
  token?: string;
}

export interface PasswordSetup {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  tenantId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  image: string;
  isActive: boolean;
}

export interface UserToken {
  status: boolean;
  message: string;
  token: string;
  refreshToken: string;
  tokenExpiry: number;
  user: UserInfo;
}

export interface NigerianState {
  id: string;
  title: string;
}

export interface LGA {
  id: string;
  stateId: string;
  title: string;
}

export interface PaystackPaymentResponse {
  redirecturl: string;
  trans: string;
  trxref: string;
  reference: string;
  status: string;
  message: string;
  response: string;
}
