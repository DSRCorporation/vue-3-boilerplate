import { CommonState } from "@/store/common";
import { ActionContext } from "vuex";

export enum StoreModules {
  COMMON = "common"
}

//todo typings for dispatch, commit, getter?
export interface RootState {
  [StoreModules.COMMON]: CommonState;
  vueGlobalProperties?: Record<string, any>;
}

export interface AugmentedActionContext<
  Mutations extends Record<string, any>,
  State
> extends Omit<ActionContext<State, RootState>, "commit"> {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}
