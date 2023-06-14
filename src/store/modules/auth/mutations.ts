import { MutationTree } from "vuex";
import { AuthenticationState } from "./state";
import {
  AuthRequestStatus,
  CreateUserInfo,
  LoginInfo,
  Status,
  UserToken,
} from "@/types";
import SessionStorageService from "@/services/sessionStorage";
import { useRouter } from "vue-router";

export enum AuthMutationTypes {
  // LOGIN
  LOGIN_USER_LOADING = "LOGIN_USER_LOADING",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",

  //STORE USER
  STORE_USER = "STORE_USER",

  // CREATE USER
  CREATE_CLIENT_ACCOUNT_LOADING = "CREATE_CLIENT_ACCOUNT_LOADING",
  CREATE_CLIENT_ACCOUNT_SUCCESS = "CREATE_CLIENT_ACCOUNT_SUCCESS",
  CREATE_CLIENT_ACCOUNT_ERROR = "CREATE_CLIENT_ACCOUNT_ERROR",

  // CONFIRM USER ACCOUNT
  CONFIRM_USER_ACCOUNT_LOADING = "CONFIRM_USER_ACCOUNT_LOADING",
  CONFIRM_USER_ACCOUNT_SUCCESS = "CONFIRM_USER_ACCOUNT_SUCCESS",
  CONFIRM_USER_ACCOUNT_ERROR = "CONFIRM_USER_ACCOUNT_ERROR",

  // SET PASSWORD
  SET_PASSWORD_LOADING = "SET_PASSWORD_LOADING",
  SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS",
  SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR",

  // RESET PASSWORD
  RESET_PASSWORD_REQUEST_LOADING = "RESET_PASSWORD_REQUEST_LOADING",
  RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS",
  RESET_PASSWORD_REQUEST_ERROR = "RESET_PASSWORD_REQUEST_ERROR",

  // CONFIRM PASSWORD
  CONFIRM_RESET_PASSWORD_LOADING = "CONFIRM_RESET_PASSWORD_LOADING",
  CONFIRM_RESET_PASSWORD_SUCCESS = "CONFIRM_RESET_PASSWORD_SUCCESS",
  CONFIRM_RESET_PASSWORD_ERROR = "CONFIRM_RESET_PASSWORD_ERROR",

  // RESET PASSWORD
  RESET_PASSWORD_LOADING = "RESET_PASSWORD_LOADING",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR",

  // CHANGE PASSWORD
  CHANGE_PASSWORD_LOADING = "CHANGE_PASSWORD_LOADING",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR",

  //RESEND OTP
  RESEND_OTP_LOADING = "RESEND_OTP_LOADING",
  RESEND_OTP_SUCCESS = "RESEND_OTP_LOADING",
  RESEND_OTP_ERROR = "RESEND_OTP_ERROR",
}

// LOGIN
export interface AuthenticationMutation {
  // LOGIN
  [AuthMutationTypes.LOGIN_USER_LOADING](
    state: AuthenticationState,
    payload: string
  ): void;
  [AuthMutationTypes.LOGIN_USER_SUCCESS](
    state: AuthenticationState,
    payload: any
  ): void;
  [AuthMutationTypes.LOGIN_USER_ERROR](
    state: AuthenticationState,
    payload: string
  ): void;

  // Create user account
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_LOADING](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_SUCCESS](
    state: AuthenticationState,
    payload: any
  ): void;
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_ERROR](
    state: AuthenticationState,
    payload: string
  ): void;

  // Store User
  [AuthMutationTypes.STORE_USER](
    state: AuthenticationState,
    payload: CreateUserInfo
  ): void;

  // Confirm user account
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_LOADING](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_SUCCESS](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;

  // Setup User Password
  [AuthMutationTypes.SET_PASSWORD_LOADING](state: AuthenticationState): void;
  [AuthMutationTypes.SET_PASSWORD_SUCCESS](
    state: AuthenticationState,
    payload: UserToken
  ): void;
  [AuthMutationTypes.SET_PASSWORD_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;

  // Reset password request
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_LOADING](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_SUCCESS](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;

  // Reset password token request
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_LOADING](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_SUCCESS](
    state: AuthenticationState
  ): void;
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;

  // Reset password proper request
  [AuthMutationTypes.RESET_PASSWORD_LOADING](state: AuthenticationState): void;
  [AuthMutationTypes.RESET_PASSWORD_SUCCESS](state: AuthenticationState): void;
  [AuthMutationTypes.RESET_PASSWORD_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;

  //RESEND OTP
  [AuthMutationTypes.RESEND_OTP_LOADING](state: AuthenticationState): void;
  [AuthMutationTypes.RESEND_OTP_SUCCESS](state: AuthenticationState): void;
  [AuthMutationTypes.RESEND_OTP_ERROR](
    state: AuthenticationState,
    payload: any
  ): void;
}

export const authMutations: MutationTree<AuthenticationState> &
  AuthenticationMutation = {
  // Login user
  [AuthMutationTypes.LOGIN_USER_LOADING](
    state: AuthenticationState,
    payload: Status.LOADING
  ): void {
    state.authRequestStatus!.login = payload;
  },
  [AuthMutationTypes.LOGIN_USER_ERROR](
    state: AuthenticationState,
    error: string
  ): void {
    state.authRequestStatus!.login = Status.ERROR;
    state.loginError = error;
  },
  [AuthMutationTypes.LOGIN_USER_SUCCESS](
    state: AuthenticationState,
    payload: UserToken
  ): void {
    state.authRequestStatus!.login = Status.SUCCESS;
    state.authenticatedUser = payload;
    SessionStorageService.setItem("token", state.authenticatedUser.token);
  },

  // Create user account
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_LOADING](
    state: AuthenticationState
  ): void {
    state.authRequestStatus!.signup = Status.LOADING;
  },
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.authRequestStatus!.signup = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.CREATE_CLIENT_ACCOUNT_SUCCESS](
    state: AuthenticationState
  ): void {
    state.authRequestStatus!.signup = Status.SUCCESS;
  },

  //Store user
  [AuthMutationTypes.STORE_USER](
    state: AuthenticationState,
    payload: CreateUserInfo
  ): void {
    state.storedUser = payload;
  },

  // Confirm and verify user account
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_LOADING](
    state: AuthenticationState
  ): void {
    state.authRequestStatus!.confirmAccountRequest = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.authRequestStatus!.confirmAccountRequest = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.CONFIRM_USER_ACCOUNT_SUCCESS](
    state: AuthenticationState
  ): void {
    state.authRequestStatus!.confirmAccountRequest = Status.SUCCESS;
  },

  // Setup User Password
  [AuthMutationTypes.SET_PASSWORD_LOADING](state: AuthenticationState): void {
    state.authRequestStatus!.setPassword = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.SET_PASSWORD_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.authRequestStatus!.setPassword = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.SET_PASSWORD_SUCCESS](
    state: AuthenticationState,
    payload: any
  ): void {
    state.authRequestStatus!.setPassword = Status.SUCCESS;
    state.authenticatedUser = payload;
    SessionStorageService.setItem("token", state.authenticatedUser.token);
  },

  //Reset password request
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_LOADING](
    state: AuthenticationState
  ): void {
    state.resetPasswordRequest!.sendResetPasswordEmail = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.resetPasswordRequest!.sendResetPasswordEmail = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.RESET_PASSWORD_REQUEST_SUCCESS](
    state: AuthenticationState
  ): void {
    state.resetPasswordRequest!.sendResetPasswordEmail = Status.SUCCESS;
  },

  // Reset password token request
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_LOADING](
    state: AuthenticationState
  ): void {
    state.resetPasswordRequest!.sendResetPasswordEmail = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.resetPasswordRequest!.validateOTP = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.CONFIRM_RESET_PASSWORD_SUCCESS](
    state: AuthenticationState
  ): void {
    state.resetPasswordRequest!.validateOTP = Status.SUCCESS;
  },

  // RESET PASSWORD
  [AuthMutationTypes.RESET_PASSWORD_LOADING](state: AuthenticationState): void {
    state.resetPasswordRequest!.resetPassword = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.RESET_PASSWORD_ERROR](
    state: AuthenticationState,
    error: any
  ): void {
    state.resetPasswordRequest!.resetPassword = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.RESET_PASSWORD_SUCCESS](state: AuthenticationState): void {
    state.resetPasswordRequest!.resetPassword = Status.SUCCESS;
  },

  // RESEND OTP
  [AuthMutationTypes.RESEND_OTP_LOADING](state: AuthenticationState): void {
    state.resetPasswordRequest!.resendOTP = Status.LOADING;
    state.otpError = "";
  },
  [AuthMutationTypes.RESEND_OTP_SUCCESS](
    state: AuthenticationState,
    error: any
  ): void {
    state.resetPasswordRequest!.resendOTP = Status.ERROR;
    state.otpError = error?.response?.data;
  },
  [AuthMutationTypes.RESEND_OTP_ERROR](state: AuthenticationState): void {
    state.resetPasswordRequest!.resendOTP = Status.SUCCESS;
  },
};
