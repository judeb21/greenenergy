import { GetterTree } from "vuex";
import { QuoteStates } from "./state";
import { RootState } from "@/store/interfaces";
import { NigerianState } from "@/types";

export enum QuoteGetterTypes {
  GET_COUNT = "GET_COUNT",
  GET_STATES = "GET_STATES",
}

export interface QuoteGetters {
  [QuoteGetterTypes.GET_COUNT](state: QuoteStates): any;
  [QuoteGetterTypes.GET_STATES](state: QuoteStates): any;
}

export const quoteGetters: GetterTree<QuoteStates, RootState> & QuoteGetters = {
  [QuoteGetterTypes.GET_COUNT](state: QuoteStates): any {
    return state.status;
  },

  [QuoteGetterTypes.GET_STATES](state: QuoteStates): Array<NigerianState> {
    return state.nigerianStates;
  },
};
