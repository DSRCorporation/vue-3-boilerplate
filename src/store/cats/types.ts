import { ActionTree, DispatchOptions, GetterTree, MutationTree } from "vuex";
import { Cat } from "@/types/cats";
import {
  AugmentedActionContext,
  ModuleVuexStore,
  ModuleCommit,
  ModuleGetters,
  RootState,
} from "@/store/types";

export interface CatsState {
  cats?: Array<Cat>;
}

export enum CatsMutationTypes {
  SET_CATS = "setCats",
}

export enum CatsGetterTypes {
  GET_CATS = "getCats",
}

export interface CatsMutations extends MutationTree<CatsState> {
  [CatsMutationTypes.SET_CATS](state: CatsState, payload: Array<Cat>): void;
}

export enum CatsActionTypes {
  LOAD_CATS = "loadCats",
}

export type CatsActionContext = AugmentedActionContext<
  CatsMutations,
  CatsState
>;

export interface CatsGetters extends GetterTree<CatsState, RootState> {
  [CatsGetterTypes.GET_CATS](state: CatsState): Array<Cat> | undefined;
}

export interface Actions {
  [CatsActionTypes.LOAD_CATS](context: CatsActionContext): Promise<void>;
}

export type CatsActions = Actions & ActionTree<CatsState, RootState>;

export interface CatsStore<S>
  extends ModuleVuexStore<S>,
    ModuleCommit<CatsState, CatsMutations>,
    ModuleGetters<CatsState, CatsGetters> {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
}
