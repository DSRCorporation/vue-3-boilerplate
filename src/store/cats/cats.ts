import { container } from "tsyringe";
import { Router } from "vue-router";
import { TYPES } from "@/services/helpers/containerTypes";
import { Logger } from "@/services/logger";
import { ErrorHandler } from "@/services/errorHandler";
import { CatService } from "@/services/catService";
import { RootState } from "@/store/types";
import { Cat } from "@/types/cats";
import { ActionTree, MutationTree } from "vuex";
import axios from "axios";
import {
  CatsActionContext,
  CatsActions,
  CatsActionTypes,
  CatsMutations,
  CatsMutationTypes,
  CatsState,
} from "@/store/cats/types";

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

const state: CatsState = {
  cats: undefined,
};

const mutations: MutationTree<CatsState> & CatsMutations = {
  [CatsMutationTypes.SET_CATS]: (state: CatsState, cats: Array<Cat>) => {
    state.cats = cats;
  },
};

const actions: ActionTree<CatsState, RootState> & CatsActions = {
  [CatsActionTypes.LOAD_CATS]: async ({ commit }: CatsActionContext) => {
    let cats: Array<Cat>;

    try {
      cats = await deps.catService.getCats();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        deps.errorHandler.handleBackendError(e);
      }
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
