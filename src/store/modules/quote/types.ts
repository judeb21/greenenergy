import { Status } from "@/types";
import {
  MutationTree,
  ActionContext,
  ActionTree,
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";

//declare state
export type State = { status: Status };

//set state
export const state: State = { status: Status.NORMAL };

// mutations and action enums

export enum MutationTypes {
  INC_COUNTER = "SET_COUNTER",
}

export enum ActionTypes {
  INC_COUNTER = "SET_COUNTER",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.INC_COUNTER](state: S, payload: any): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.INC_COUNTER](state: State, payload: any) {
    state.status = payload;
  },
};

//actions

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

// actions interface

export interface Actions {
  [ActionTypes.INC_COUNTER](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INC_COUNTER]({ commit }, payload: any) {
    commit(MutationTypes.INC_COUNTER, payload);
  },
};

// Getters types
export type Getters = {
  getStatus(state: State): Status;
};

//getters

export const getters: GetterTree<State, State> & Getters = {
  getStatus: (state) => {
    // console.log("state", state.counter);
    return state.status;
  },
};

export type Store = Omit<
  VuexStore<State>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
