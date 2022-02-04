import {
  AugmentedActionContext,
  ModuleCommit,
  ModuleGetters,
  ModuleVuexStore,
  RootState,
} from "@/store/types";
import { Credentials } from "@/services/userService";
import { ActionTree, DispatchOptions, GetterTree, MutationTree } from "vuex";

export interface CommonState {
  token?: string;
}

export enum CommonMutationTypes {
  SET_TOKEN = "setToken",
}

export interface CommonMutations extends MutationTree<CommonState> {
  [CommonMutationTypes.SET_TOKEN](state: CommonState, payload?: string): void;
}

export enum CommonActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
}

export enum CommonGetterTypes {
  IS_AUTH = "isAuth",
}

export type CommonActionContext = AugmentedActionContext<
  CommonMutations,
  CommonState
>;

export interface CommonGetters extends GetterTree<CommonState, RootState> {
  [CommonGetterTypes.IS_AUTH](state: CommonState): boolean;
}

interface Actions {
  [CommonActionTypes.LOGIN](
    context: CommonActionContext,
    payload: Credentials
  ): Promise<void>;
  [CommonActionTypes.LOGOUT](context: CommonActionContext): Promise<void>;
}

export type CommonActions = Actions & ActionTree<CommonState, RootState>;

export interface CommonStore<S>
  extends ModuleVuexStore<S>,
    ModuleCommit<CommonState, CommonMutations>,
    ModuleGetters<CommonState, GetterTree<CommonState, RootState>> {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
}
