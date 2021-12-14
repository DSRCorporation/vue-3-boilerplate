import { container } from "tsyringe";
import { Router } from "vue-router";
import { TYPES } from "@/services/helpers/containerTypes";
import { Logger } from "@/services/logger";
import { ErrorHandler } from "@/services/errorHandler";
import { CatService } from "@/services/catService";
import { AugmentedActionContext, RootState } from "@/store/types";
import { Cat } from "@/types/cats";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import { AxiosError } from "axios";

const deps = {
  get catService() {
    return container.resolve(CatService);
  },
  get router() {
    return container.resolve<Router>(TYPES.Router);
  },
  get logger() {
    return container.resolve(Logger);
  },
  get errorHandler() {
    return container.resolve(ErrorHandler);
  },
};

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

type CatsActionContext = AugmentedActionContext<CatsMutations, CatsState>;

export interface CatsActions {
  [CatsActionTypes.LOAD_CATS](context: CatsActionContext): Promise<void>;
}

const state: CatsState = {
  cats: undefined,
};

const mutations: MutationTree<CatsState> & CatsMutations = {
  [CatsMutationTypes.SET_CATS]: (state: CatsState, cats: Array<Cat>) => {
    state.cats = cats;
  },
};

const actions: ActionTree<CatsState, RootState> & CatsActions = {
  [CatsActionTypes.LOAD_CATS]: async ({
    commit,
    dispatch,
    state,
  }: ActionContext<CatsState, RootState>) => {
    let cats: Array<Cat>;

    try {
      cats = await deps.catService.getCats();
    } catch (e) {
      deps.errorHandler.handleBackendError(e as AxiosError);
      deps.logger.logError(e);
      return;
    }
    commit(CatsMutationTypes.SET_CATS, cats);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
