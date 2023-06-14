import { Store, CommitOptions, DispatchOptions, Module } from "vuex";
import { RootState } from "@/store/interfaces";
import { QuoteStates as QuoteState, quoteState } from "./state";
import { QuoteMutation, quoteMutations } from "./mutations";
import { QuoteAction, quoteActions } from "./actions";
import { QuoteGetters, quoteGetters } from "./getters";

export type QuoteModule = {
  namespaced?: boolean;
  state?: QuoteState;
  mutations?: QuoteMutation;
  actions?: QuoteAction;
  getters?: QuoteGetters;
};

export type IQuoteState = QuoteState;

export type IQuoteStore<S = QuoteState> = Omit<
  Store<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof QuoteMutation,
    P extends Parameters<QuoteMutation[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<QuoteMutation[K]>;
} & {
  dispatch<
    K extends keyof QuoteAction,
    P extends Parameters<QuoteAction[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: DispatchOptions
  ): ReturnType<QuoteAction[K]>;
} & {
  getters: {
    [K in keyof QuoteGetters]: ReturnType<QuoteGetters[K]>;
  };
};

export const quoteStore: Module<QuoteState, RootState> & QuoteModule = {
  namespaced: true,
  state: quoteState,
  mutations: quoteMutations,
  actions: quoteActions,
  getters: quoteGetters,
};
