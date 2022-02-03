import { CommonState } from "@/store/common/types";
import { ActionContext } from "vuex";
import { CatsState } from "@/store/cats/types";

export enum StoreModules {
  COMMON = "common",
  CATS = "cats",
}

//todo typings for dispatch, commit, getter?
export interface RootState {
  [StoreModules.COMMON]: CommonState;
  [StoreModules.CATS]: CatsState;
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
