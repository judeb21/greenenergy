import { ActionTree, ActionContext } from "vuex";
import { AuthenticationState, authState } from "./state";
import { AuthenticationMutation, AuthMutationTypes } from "./mutations";
import { RootState } from "@/store/interfaces";
import { State } from "./types";
import {
  ConfirmUserDetails,
  CreateUserInfo,
  LoginInfo,
  PasswordSetup,
  Status,
} from "@/types";
import axiosInstance from "@/services/axios";
import SessionStorageService from "@/services/sessionStorage";
import { generalPostRequest } from "@/utils/request";

export enum AuthActionTypes {
  LOGIN_USER = "LOGIN_USER",
  STORE_USER = "STORE_USER",
  RESEND_OTP = "RESEND_OTP",
  CREATE_CLIENT_ACCOUNT = "CREATE_CLIENT_ACCOUNT",
  CONFIRM_USER_ACCOUNT = "CONFIRM_USER_ACCOUNT",
  SET_PASSWORD = "SET_PASSWORD",
  RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST",
  CONFIRM_RESET_PASSWORD = "CONFIRM_RESET_PASSWORD",
  RESET_PASSWORD = "RESET_PASSWORD",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

type AugmentedAuthActionContext = {
  commit<K extends keyof AuthenticationMutation>(
    key: K,
    payload: Parameters<AuthenticationMutation[K]>[1]
  ): ReturnType<AuthenticationMutation[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface AuthenticationAction {
  //LOGIN
  [AuthActionTypes.LOGIN_USER](
    { commit }: AugmentedAuthActionContext,
    loginCredentials: LoginInfo
  ): Promise<any>;

  // CREATE USER ACCOUNT
  [AuthActionTypes.CREATE_CLIENT_ACCOUNT](
    { commit }: AugmentedAuthActionContext,
    createUserInfo: CreateUserInfo
  ): Promise<any>;

  // STORE USER ACCOUNT
  [AuthActionTypes.STORE_USER](
    { commit }: AugmentedAuthActionContext,
    userCredentials: CreateUserInfo
  ): any;

  // VERIFY USER ACCOUNT
  [AuthActionTypes.CONFIRM_USER_ACCOUNT](
    { commit }: AugmentedAuthActionContext,
    userDetail: ConfirmUserDetails
  ): Promise<any>;

  // SETUP PASSWORD
  [AuthActionTypes.SET_PASSWORD](
    { commit }: AugmentedAuthActionContext,
    password: PasswordSetup
  ): Promise<any>;

  // REQUEST PASSWORD REQUEST
  [AuthActionTypes.RESET_PASSWORD_REQUEST](
    { commit }: AugmentedAuthActionContext,
    payload: any
  ): Promise<any>;

  // CONFIRM_RESET_PASSWORD
  [AuthActionTypes.CONFIRM_RESET_PASSWORD](
    { commit }: AugmentedAuthActionContext,
    payload: any
  ): Promise<any>;

  // REQUEST PASSWORD
  [AuthActionTypes.RESET_PASSWORD](
    { commit }: AugmentedAuthActionContext,
    payload: any
  ): Promise<any>;

  // RESEND OTP
  [AuthActionTypes.RESEND_OTP](
    { commit }: AugmentedAuthActionContext,
    payload: any
  ): Promise<any>;
}

export const authActions: ActionTree<AuthenticationState, RootState> &
  AuthenticationAction = {
  [AuthActionTypes.LOGIN_USER](
    { commit },
    loginCredentials: LoginInfo
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      commit(AuthMutationTypes.LOGIN_USER_LOADING, Status.LOADING);
      axiosInstance.post("ClientUser/Login", loginCredentials).then(
        (response: any) => {
          commit(AuthMutationTypes.LOGIN_USER_SUCCESS, response.data);
          authState.authenticatedUser = response.data;
          SessionStorageService.setItem(
            "token",
            authState.authenticatedUser.token
          );
          resolve(response);
        },
        (error: any) => {
          commit(AuthMutationTypes.LOGIN_USER_ERROR, Status.ERROR);
          reject(error);
        }
      );
    });
    // return generalPostRequest(
    //   commit,
    //   "ClientUser/Login",
    //   [
    //     AuthMutationTypes.LOGIN_USER_LOADING,
    //     AuthMutationTypes.LOGIN_USER_SUCCESS,
    //     AuthMutationTypes.LOGIN_USER_ERROR,
    //   ],
    //   loginCredentials
    // );
  },

  //store User
  [AuthActionTypes.STORE_USER](
    { commit }: AugmentedAuthActionContext,
    userCredentials: CreateUserInfo
  ) {
    commit(AuthMutationTypes.STORE_USER, userCredentials);
  },

  //Create User Account
  [AuthActionTypes.CREATE_CLIENT_ACCOUNT](
    { commit },
    userCredentials: CreateUserInfo
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.CHANGE_PASSWORD_LOADING];
      axiosInstance.post("ClientUser/CreateClientUser", userCredentials).then(
        (response) => {
          [AuthMutationTypes.CHANGE_PASSWORD_SUCCESS, response];
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.CHANGE_PASSWORD_ERROR];
          reject(error);
        }
      );
    });
  },

  // Verify user account
  async [AuthActionTypes.CONFIRM_USER_ACCOUNT](
    { commit },
    userDetail: ConfirmUserDetails
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.CHANGE_PASSWORD_LOADING];
      axiosInstance.post("ClientUser/ConfirmUserAccount", userDetail).then(
        (response) => {
          [AuthMutationTypes.CHANGE_PASSWORD_SUCCESS, response];
          resolve(true);
        },
        (error) => {
          [AuthMutationTypes.CHANGE_PASSWORD_ERROR];
          reject(error);
        }
      );
    });
  },

  // Setup Password
  async [AuthActionTypes.SET_PASSWORD](
    { commit },
    password: PasswordSetup
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.SET_PASSWORD_LOADING];
      axiosInstance.post("ClientUser/SetPassword", password).then(
        (response: any) => {
          [AuthMutationTypes.SET_PASSWORD_SUCCESS, response.data];
          authState.authenticatedUser = response.data;
          SessionStorageService.setItem(
            "token",
            authState.authenticatedUser.token
          );
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.SET_PASSWORD_ERROR];
          reject(error);
        }
      );
    });
  },

  // Reset Password Request
  async [AuthActionTypes.RESET_PASSWORD_REQUEST](
    { commit },
    payload: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.RESET_PASSWORD_REQUEST_LOADING];
      axiosInstance.post("ClientUser/ResetPasswordRequest", payload).then(
        (response) => {
          [AuthMutationTypes.RESET_PASSWORD_REQUEST_SUCCESS, response];
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.RESET_PASSWORD_REQUEST_ERROR];
          reject(error);
        }
      );
    });
  },

  // Reset Password Token Request
  async [AuthActionTypes.CONFIRM_RESET_PASSWORD](
    { commit },
    payload: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.CONFIRM_RESET_PASSWORD_LOADING];
      axiosInstance.post("ClientUser/ConfirmResetPasswordToken", payload).then(
        (response) => {
          [AuthMutationTypes.CONFIRM_RESET_PASSWORD_SUCCESS, response];
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.CONFIRM_RESET_PASSWORD_ERROR];
          reject(error);
        }
      );
    });
  },

  // Reset Password proper Request
  async [AuthActionTypes.RESET_PASSWORD](
    { commit },
    payload: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.RESET_PASSWORD_LOADING];
      axiosInstance.post("ClientUser/ResetPassword", payload).then(
        (response) => {
          [AuthMutationTypes.RESET_PASSWORD_SUCCESS, response];
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.RESET_PASSWORD_ERROR];
          reject(error);
        }
      );
    });
  },

  // RESEND OTP
  async [AuthActionTypes.RESEND_OTP]({ commit }, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      [AuthMutationTypes.RESEND_OTP_LOADING];
      axiosInstance.post("ClientUser/ResendOtp", payload).then(
        (response) => {
          [AuthMutationTypes.RESEND_OTP_SUCCESS, response];
          resolve(response);
        },
        (error) => {
          [AuthMutationTypes.RESEND_OTP_ERROR];
          reject(error);
        }
      );
    });
  },
};
