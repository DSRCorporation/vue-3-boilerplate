import {
  ActionContext,
  CommitOptions,
  GetterTree,
  Mutation,
  MutationTree,
  Store as VuexStore,
} from "vuex";
import { CommonState, CommonStore } from "@/store/common/types";
import { CatsState, CatsStore } from "@/store/cats/types";

export enum StoreModules {
  COMMON = "common",
  CATS = "cats",
}

export interface RootState {
  [StoreModules.COMMON]: CommonState;
  [StoreModules.CATS]: CatsState;
}

export type RootStore = CatsStore<Pick<RootState, StoreModules.CATS>> &
  CommonStore<Pick<RootState, StoreModules.COMMON>>;

export interface AugmentedActionContext<
  Mutations extends Record<string, Mutation<State>>,
  State
> extends Omit<ActionContext<State, RootState>, "commit"> {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

export type ModuleVuexStore<S> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
>;

export interface ModuleCommit<S, M extends MutationTree<S>> {
  commit<K extends keyof M, P extends Parameters<M[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<M[K]>;
}

export interface ModuleGetters<S, G extends GetterTree<S, RootState>> {
  getters: {
    [K in keyof G]: ReturnType<G[K]>;
  };
}
