import { GetterTree } from "vuex";
import { AuthenticationState } from "./state";
import { RootState } from "@/store/interfaces";

export enum AuthGetterTypes {
  GET_COUNT = "GET_COUNT",
}

export interface AuthGetters {
  [AuthGetterTypes.GET_COUNT](state: AuthenticationState): any;
}

export const authGetters: GetterTree<AuthenticationState, RootState> &
  AuthGetters = {
  [AuthGetterTypes.GET_COUNT](state: AuthenticationState): any {
    return state.counter;
  },
};
