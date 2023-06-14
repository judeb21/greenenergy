import { Store, CommitOptions, DispatchOptions, Module } from "vuex";
import { RootState } from "@/store/interfaces";
import { AuthenticationState as AuthState, authState } from "./state";
import { AuthenticationMutation, authMutations } from "./mutations";
import { AuthenticationAction, authActions } from "./actions";
import { AuthGetters, authGetters } from "./getters";

export type AuthModule = {
  namespaced?: boolean;
  state?: AuthState;
  mutations?: AuthenticationMutation;
  actions?: AuthenticationAction;
  getters?: AuthGetters;
};

export type AuthenticationState = AuthState;

export type AuthStore<S = AuthState> = Omit<
  Store<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof AuthenticationMutation,
    P extends Parameters<AuthenticationMutation[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<AuthenticationMutation[K]>;
} & {
  dispatch<
    K extends keyof AuthenticationAction,
    P extends Parameters<AuthenticationAction[K]>[1]
  >(
    key: K,
    payload: P,
    options?: DispatchOptions
  ): ReturnType<AuthenticationAction[K]>;
} & {
  getters: {
    [K in keyof AuthGetters]: ReturnType<AuthGetters[K]>;
  };
};

export const authStore: Module<AuthState, RootState> & AuthModule = {
  namespaced: true,
  state: authState,
  mutations: authMutations,
  actions: authActions,
  getters: authGetters,
};
