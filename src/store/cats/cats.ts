import { container } from "tsyringe";
import { Router } from "vue-router";
import { TYPES } from "@/services/helpers/containerTypes";
import { Logger } from "@/services/logger";
import { ErrorHandler } from "@/services/errorHandler";
import { CatService } from "@/services/catService";
import { Cat } from "@/types/cats";
import axios from "axios";
import {
  CatsActions,
  CatsActionTypes,
  CatsGetters,
  CatsGetterTypes,
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

const mutations: CatsMutations = {
  [CatsMutationTypes.SET_CATS]: (state, cats) => {
    state.cats = cats;
  },
};

const actions: CatsActions = {
  [CatsActionTypes.LOAD_CATS]: async ({ commit }) => {
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

const getters: CatsGetters = {
  [CatsGetterTypes.GET_CATS]: (state) => {
    return state.cats;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
