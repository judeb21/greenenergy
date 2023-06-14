import {
  AuthRequestStatus,
  CreateUserInfo,
  LoginInfo,
  ResetPasswordRequest,
  Status,
  UserToken,
} from "@/types";

//declare state
export type AuthenticationState = {
  counter: number;
  status: Status;
  authRequestStatus: AuthRequestStatus;
  resetPasswordRequest: ResetPasswordRequest;
  authenticatedUser: UserToken;
  loginError: string;
  otpError: string;
  storedUser: CreateUserInfo;
};

//set state
export const authState: AuthenticationState = {
  counter: 0,
  status: Status.NORMAL,
  authRequestStatus: {
    login: Status.NORMAL,
    signup: Status.NORMAL,
    confirmAccount: Status.NORMAL,
    confirmAccountRequest: Status.NORMAL,
    refreshToken: Status.NORMAL,
    notificationCountStatus: Status.NORMAL,
    notificationsStatus: Status.NORMAL,
    setPassword: Status.NORMAL,
  },
  resetPasswordRequest: {
    sendResetPasswordEmail: Status.NORMAL,
    validateOTP: Status.NORMAL,
    resetPassword: Status.NORMAL,
    resendOTP: Status.NORMAL,
  },
  authenticatedUser: {
    status: false,
    message: "",
    token: "",
    refreshToken: "",
    tokenExpiry: 0,
    user: {
      id: "",
      tenantId: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      image: "",
      isActive: false,
    },
  },
  loginError: "",
  otpError: "",
  storedUser: {
    email: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    username: "",
  },
};

class AuthState implements AuthenticationState {
  public get counter(): number {
    return authState.counter;
  }

  public set counter(value: number) {
    authState.counter = value;
  }

  public status = Status.NORMAL;

  public authRequestStatus: AuthRequestStatus = {
    login: Status.NORMAL,
    signup: Status.NORMAL,
    confirmAccount: Status.NORMAL,
    confirmAccountRequest: Status.NORMAL,
    refreshToken: Status.NORMAL,
    notificationCountStatus: Status.NORMAL,
    notificationsStatus: Status.NORMAL,
    setPassword: Status.NORMAL,
  };

  public resetPasswordRequest: ResetPasswordRequest = {
    sendResetPasswordEmail: Status.NORMAL,
    validateOTP: Status.NORMAL,
    resetPassword: Status.NORMAL,
    resendOTP: Status.NORMAL,
  };

  public authenticatedUser: UserToken = {
    status: false,
    message: "",
    token: "",
    refreshToken: "",
    tokenExpiry: 0,
    user: {
      id: "",
      tenantId: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      image: "",
      isActive: false,
    },
  };

  public loginError = "";

  public otpError = "";

  public storedUser: CreateUserInfo = {
    email: "",
    phoneNumber: "",
  };
}

export default AuthState;

// albert
// Osaretin@1
