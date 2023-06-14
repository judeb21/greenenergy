import { computed, InjectionKey } from "vue";
import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store,
  mapGetters,
  createLogger,
} from "vuex";

import { useStore as vuexUseStore } from "vuex";

import { AuthenticationState, authStore } from "./modules/auth";
import { IQuoteState, IQuoteStore, quoteStore } from "./modules/quote";
import { AuthenticationAction, AuthActionTypes } from "./modules/auth/actions";
import {
  AuthenticationMutation,
  AuthMutationTypes,
} from "./modules/auth/mutations";
import { AuthGetters, AuthGetterTypes } from "./modules/auth/getters";
import { RootState } from "./interfaces";
import AuthState from "./modules/auth/state";

import createdPersistedState from "vuex-persistedstate";
import { QuoteAction, QuoteActionTypes } from "./modules/quote/actions";
import { QuoteMutation, QuoteMutationTypes } from "./modules/quote/mutations";
import { QuoteGetters, QuoteGetterTypes } from "./modules/quote/getters";

export const rootStore = createStore({
  modules: {
    auth: authStore,
    quote: quoteStore,
  },
  plugins: [
    createLogger(),
    createdPersistedState({
      paths: ["auth"],
    }),
  ],
});

export const rootStoreKey: InjectionKey<Store<RootState>> = Symbol();

function rootStoreToNamespacedStore<
  ActionTypes,
  Actions extends { [key: string]: any },
  MutationsTypes,
  Mutations extends { [key: string]: any },
  GetterTypes,
  Getters extends { [key: string]: any },
  StateType
>(namespace: string, store: Store<any>) {
  return {
    getters<K extends keyof Getters>(
      getterType: GetterTypes
    ): ReturnType<Getters[K]> {
      return store.getters[`${namespace}/${getterType}`];
    },
    dispatch<K extends keyof Actions>(
      payloadWithType: ActionTypes,
      payload: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]> {
      return store.dispatch(
        `${namespace}/${payloadWithType}`,
        payload,
        options
      ) as ReturnType<Actions[K]>;
    },
    commit<K extends keyof Mutations>(
      payloadWithType: MutationsTypes,
      payload: Parameters<Mutations[K]>[1],
      options?: CommitOptions
    ): void {
      return store.commit(`${namespace}/${payloadWithType}`, payload, options);
    },
    state: store.state[namespace] as StateType,
  };
}

export function useStore() {
  const store = vuexUseStore(rootStoreKey);
  return store;
}

export function useAuthStore() {
  const store = vuexUseStore(rootStoreKey);
  return rootStoreToNamespacedStore<
    AuthActionTypes,
    AuthenticationAction,
    AuthMutationTypes,
    AuthenticationMutation,
    AuthGetterTypes,
    AuthGetters,
    AuthenticationState
  >("auth", store);
}

export function useQuoteStore() {
  const store = vuexUseStore(rootStoreKey);
  return rootStoreToNamespacedStore<
    QuoteActionTypes,
    QuoteAction,
    QuoteMutationTypes,
    QuoteMutation,
    QuoteGetterTypes,
    QuoteGetters,
    IQuoteState
  >("quote", store);
}
