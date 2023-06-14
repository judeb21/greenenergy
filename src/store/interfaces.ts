import { computed, InjectionKey } from "vue";
import {
  CommitOptions,
  DispatchOptions,
  Store,
} from "vuex";
import { AuthenticationState } from "./modules/auth/state";
import { AuthStore } from "./modules/auth";

//RootState
export interface RootState {
  auth: AuthenticationState;
}

//RootType
export type RootStore = AuthStore<Pick<RootState, "auth">>;

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
