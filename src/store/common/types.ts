import { AugmentedActionContext } from "@/store/types";
import { Credentials } from "@/services/userService";

export interface CommonState {
  token?: string;
}

export enum CommonMutationTypes {
  SET_TOKEN = "setToken",
}

export interface CommonMutations {
  [CommonMutationTypes.SET_TOKEN](state: CommonState, payload?: string): void;
}

export enum CommonActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
}

export type CommonActionContext = AugmentedActionContext<
  CommonMutations,
  CommonState
>;

export interface CommonActions {
  [CommonActionTypes.LOGIN](
    context: CommonActionContext,
    payload: Credentials
  ): Promise<void>;
  [CommonActionTypes.LOGOUT](context: CommonActionContext): Promise<void>;
}
