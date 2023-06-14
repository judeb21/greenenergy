import { MutationTree } from "vuex";
import { QuoteStates } from "./state";
import {
  AuthRequestStatus,
  CreateUserInfo,
  LGA,
  LoginInfo,
  NigerianState,
  Status,
  UserToken,
} from "@/types";
import SessionStorageService from "@/services/sessionStorage";
import { useRouter } from "vue-router";

export enum QuoteMutationTypes {
  // CREATE QUOTE
  CREATE_QUOTE_LOADING = "CREATE_QUOTE_LOADING",
  CREATE_QUOTE_SUCCESS = "CREATE_QUOTE_SUCCESS",
  CREATE_QUOTE_ERROR = "CREATE_QUOTE_ERROR",

  //UPDATE QUOTE REQUEST
  UPDATE_QUOTE_LOADING = "UPDATE_QUOTE_LOADING",
  UPDATE_QUOTE_SUCCESS = "UPDATE_QUOTE_SUCCESS",
  UPDATE_QUOTE_ERROR = "UPDATE_QUOTE_ERROR",

  // GET QUOTE REQUEST
  GET_QUOTE_LOADING = "GET_QUOTE_LOADING",
  GET_QUOTE_SUCCESS = "GET_QUOTE_SUCCESS",
  GET_QUOTE_ERROR = "GET_QUOTE_ERROR",

  // GET QUOTE REQUEST
  GET_PRODUCTS_LOADING = "GET_PRODUCTS_LOADING",
  GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR",

  // GET ALL STATES
  GET_STATES_LOADING = "GET_STATES_LOADING",
  GET_STATES_SUCCESS = "GET_STATES_SUCCESS",
  GET_STATES_ERROR = "GET_STATES_ERROR",

  // GET STATE LGA
  GET_LGA_LOADING = "GET_LGA_LOADING",
  GET_LGA_SUCCESS = "GET_LGA_SUCCESS",
  GET_LGA_ERROR = "GET_LGA_ERROR",
}

export interface QuoteMutation {
  // create quote
  [QuoteMutationTypes.CREATE_QUOTE_LOADING](state: QuoteStates): void;
  [QuoteMutationTypes.CREATE_QUOTE_SUCCESS](state: QuoteStates): void;
  [QuoteMutationTypes.CREATE_QUOTE_ERROR](
    state: QuoteStates,
    payload: any
  ): void;

  // get states
  [QuoteMutationTypes.GET_STATES_LOADING](
    state: QuoteStates,
    payload: Status
  ): void;
  [QuoteMutationTypes.GET_STATES_SUCCESS](
    state: QuoteStates,
    payload: Array<NigerianState>
  ): void;
  [QuoteMutationTypes.GET_STATES_ERROR](state: QuoteStates, payload: any): void;

  // get lga
  [QuoteMutationTypes.GET_LGA_LOADING](
    state: QuoteStates,
    payload: Status.LOADING
  ): void;
  [QuoteMutationTypes.GET_LGA_SUCCESS](
    state: QuoteStates,
    payload: Array<LGA>
  ): void;
  [QuoteMutationTypes.GET_LGA_ERROR](state: QuoteStates, payload: any): void;
}

export const quoteMutations: MutationTree<QuoteStates> & QuoteMutation = {
  // Login user
  [QuoteMutationTypes.CREATE_QUOTE_LOADING](state: QuoteStates): void {
    state.status = Status.LOADING;
  },
  [QuoteMutationTypes.CREATE_QUOTE_ERROR](
    state: QuoteStates,
    error: string
  ): void {
    state.status = Status.ERROR;
    state.quoteError = error;
  },
  [QuoteMutationTypes.CREATE_QUOTE_SUCCESS](state: QuoteStates): void {
    state.status = Status.SUCCESS;
  },

  // GET STATES
  [QuoteMutationTypes.GET_STATES_LOADING](
    state: QuoteStates,
    payload: Status.LOADING
  ): void {
    state.status = payload;
  },
  [QuoteMutationTypes.GET_STATES_ERROR](
    state: QuoteStates,
    error: string
  ): void {
    state.status = Status.ERROR;
    state.quoteError = error;
  },
  [QuoteMutationTypes.GET_STATES_SUCCESS](
    state: QuoteStates,
    payload: Array<NigerianState>
  ): void {
    state.status = Status.SUCCESS;
    state.nigerianStates = payload;
  },

  // GET LGA
  [QuoteMutationTypes.GET_LGA_LOADING](
    state: QuoteStates,
    payload: Status.LOADING
  ): void {
    state.status = payload;
  },
  [QuoteMutationTypes.GET_LGA_ERROR](state: QuoteStates, error: string): void {
    state.status = Status.ERROR;
    state.quoteError = error;
  },
  [QuoteMutationTypes.GET_LGA_SUCCESS](
    state: QuoteStates,
    payload: Array<LGA>
  ): void {
    state.status = Status.SUCCESS;
    state.lga = payload;
  },
};
