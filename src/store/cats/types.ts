import { Cat } from "@/types/cats";
import { AugmentedActionContext } from "@/store/types";

export interface CatsState {
  cats?: Array<Cat>;
}

export enum CatsMutationTypes {
  SET_CATS = "setCats",
}

export interface CatsMutations {
  [CatsMutationTypes.SET_CATS](state: CatsState, payload: Array<Cat>): void;
}

export enum CatsActionTypes {
  LOAD_CATS = "loadCats",
}

export type CatsActionContext = AugmentedActionContext<
  CatsMutations,
  CatsState
>;

export interface CatsActions {
  [CatsActionTypes.LOAD_CATS](context: CatsActionContext): Promise<void>;
}
