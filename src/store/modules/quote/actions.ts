import { ActionTree, ActionContext } from "vuex";
import { QuoteStates, quoteState } from "./state";
import { QuoteMutationTypes, QuoteMutation } from "./mutations";
import { RootState } from "@/store/interfaces";
import { State } from "./types";
import axiosInstance from "@/services/axios";
import SessionStorageService from "@/services/sessionStorage";
import {
  QuoteProductRequest,
  QuoteRequest,
  QuoteRequestResponse,
} from "@/views/Quote/types";
import { Status } from "@/types";

export enum QuoteActionTypes {
  CREATE_QUOTE = "CREATE_QUOTE",
  UPDATE_QUOTE = "UPDATE_QUOTE",
  GET_QUOTE = "GET_QUOTE",
  GET_PRODUCTS = "GET_PRODUCTS",
  CREATE_QUOTE_WITH_PRODUCT = "CREATE_QUOTE_WITH_PRODUCT",
  GET_STATES = "GET_STATES",
  GET_LGA = "GET_LGA",
}

type AugmentedQuoteActionContext = {
  commit<K extends keyof QuoteMutation>(
    key: K,
    payload: Parameters<QuoteMutation[K]>[1]
  ): ReturnType<QuoteMutation[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface QuoteAction {
  //POST QUOTE REQUEST
  [QuoteActionTypes.CREATE_QUOTE](
    { commit }: AugmentedQuoteActionContext,
    quoteRequest: QuoteRequest
  ): Promise<any>;

  //UPDATE QUOTE REQUEST
  [QuoteActionTypes.UPDATE_QUOTE](
    { commit }: AugmentedQuoteActionContext,
    quoteRequest: QuoteRequest
  ): Promise<any>;

  //GET QUOTE REQUEST
  [QuoteActionTypes.GET_QUOTE](
    { commit }: AugmentedQuoteActionContext,
    id: string
  ): Promise<any>;

  //GET AUTO PRODUCTS
  [QuoteActionTypes.GET_PRODUCTS]({
    commit,
  }: AugmentedQuoteActionContext): Promise<any>;

  //CREATE QUOTE REQUEST WITH PRODUCT
  [QuoteActionTypes.CREATE_QUOTE_WITH_PRODUCT](
    { commit }: AugmentedQuoteActionContext,
    quoteRequest: QuoteProductRequest
  ): Promise<any>;

  //GET STATES
  [QuoteActionTypes.GET_STATES]({
    commit,
  }: AugmentedQuoteActionContext): Promise<any>;

  //GET LGA
  [QuoteActionTypes.GET_LGA](
    { commit }: AugmentedQuoteActionContext,
    stateId: string
  ): Promise<any>;
}

export const quoteActions: ActionTree<QuoteStates, RootState> & QuoteAction = {
  // CREATE QUOTE
  [QuoteActionTypes.CREATE_QUOTE](
    { commit },
    quoteRequest: QuoteRequest
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [QuoteMutationTypes.CREATE_QUOTE_LOADING];
      [QuoteMutationTypes.CREATE_QUOTE_SUCCESS];
      axiosInstance.post("Quote/CreateQuoteRequest", quoteRequest).then(
        (response: any) => {
          [QuoteMutationTypes.CREATE_QUOTE_SUCCESS, response];
          quoteState.status = Status.SUCCESS;
          quoteState.createdQuote = response.data;
          resolve(response);
        },
        (error: any) => {
          [QuoteMutationTypes.CREATE_QUOTE_ERROR];
          reject(error);
        }
      );
    });
  },

  // UPDATE QUOTE
  [QuoteActionTypes.UPDATE_QUOTE](
    { commit },
    quoteRequest: QuoteRequest
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [QuoteMutationTypes.UPDATE_QUOTE_LOADING];
      [QuoteMutationTypes.UPDATE_QUOTE_SUCCESS];
      axiosInstance.post("Quote/UpdateQuoteRequest", quoteRequest).then(
        (response: any) => {
          [QuoteMutationTypes.UPDATE_QUOTE_SUCCESS, response];
          quoteState.status = Status.SUCCESS;
          quoteState.createdQuote = response.data;
          resolve(response);
        },
        (error: any) => {
          [QuoteMutationTypes.UPDATE_QUOTE_ERROR];
          reject(error);
        }
      );
    });
  },

  // GET QUOTE REQUEST
  [QuoteActionTypes.GET_QUOTE]({ commit }, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      [QuoteMutationTypes.GET_QUOTE_LOADING];
      [QuoteMutationTypes.GET_QUOTE_SUCCESS];
      axiosInstance.get(`Quote/GetQuoteRequest?id${id}`).then(
        (response: any) => {
          [QuoteMutationTypes.GET_QUOTE_SUCCESS, response];
          quoteState.status = Status.SUCCESS;
          quoteState.quoteResponse = response.data;
          resolve(response);
        },
        (error: any) => {
          [QuoteMutationTypes.GET_QUOTE_ERROR];
          reject(error);
        }
      );
    });
  },

  // GET PRODUCTS
  [QuoteActionTypes.GET_PRODUCTS]({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      [QuoteMutationTypes.GET_PRODUCTS_LOADING];
      [QuoteMutationTypes.GET_PRODUCTS_SUCCESS];
      axiosInstance.get(`Product/GetProducts`).then(
        (response: any) => {
          [QuoteMutationTypes.GET_PRODUCTS_SUCCESS, response];
          quoteState.status = Status.SUCCESS;
          quoteState.productsResponse = response.data.data;
          resolve(response);
        },
        (error: any) => {
          [QuoteMutationTypes.GET_PRODUCTS_ERROR];
          reject(error);
        }
      );
    });
  },

  // CREATE QUOTE REQUEST WITH PRODUCT
  [QuoteActionTypes.CREATE_QUOTE_WITH_PRODUCT](
    { commit },
    quoteRequest: QuoteProductRequest
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      [QuoteMutationTypes.CREATE_QUOTE_LOADING];
      [QuoteMutationTypes.CREATE_QUOTE_SUCCESS];
      axiosInstance
        .post("Quote/CreateQuoteRequestWithProduct", quoteRequest)
        .then(
          (response: any) => {
            [QuoteMutationTypes.CREATE_QUOTE_SUCCESS, response];
            quoteState.status = Status.SUCCESS;
            quoteState.createdQuote = response.data;
            resolve(response);
          },
          (error: any) => {
            [QuoteMutationTypes.CREATE_QUOTE_ERROR];
            reject(error);
          }
        );
    });
  },

  // GET STATEs
  [QuoteActionTypes.GET_STATES]({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      commit(QuoteMutationTypes.GET_STATES_LOADING, Status.LOADING);
      axiosInstance.get(`Location/GetStates`).then(
        (response: any) => {
          commit(QuoteMutationTypes.GET_STATES_SUCCESS, response.data.states);
          quoteState.status = Status.SUCCESS;
          quoteState.nigerianStates = response.data.states;
          resolve(response);
        },
        (error: any) => {
          commit(QuoteMutationTypes.GET_STATES_ERROR, Status.ERROR);
          reject(error);
        }
      );
    });
  },

  // GET LGA
  [QuoteActionTypes.GET_LGA]({ commit }, stateId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      commit(QuoteMutationTypes.GET_LGA_LOADING, Status.LOADING);
      axiosInstance.get(`Location/GetLgas?stateId=${stateId}`).then(
        (response: any) => {
          commit(QuoteMutationTypes.GET_LGA_SUCCESS, response.data.lgas);
          quoteState.status = Status.SUCCESS;
          quoteState.lga = response.data.lgas;
          resolve(response);
        },
        (error: any) => {
          commit(QuoteMutationTypes.GET_LGA_ERROR, Status.ERROR);
          reject(error);
        }
      );
    });
  },
};
