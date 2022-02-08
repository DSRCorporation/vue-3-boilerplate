import { UserService } from "@/services/userService";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";
import { ErrorHandler } from "@/services/errorHandler";
import { container } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import {
  CommonActions,
  CommonActionTypes,
  CommonGetters,
  CommonGetterTypes,
  CommonMutations,
  CommonMutationTypes,
} from "@/store/common/types";

const deps = {
  get userService() {
    return container.resolve(UserService);
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

const state = {
  token: localStorage.getItem("token"),
};

const mutations: CommonMutations = {
  [CommonMutationTypes.SET_TOKEN]: (state, token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    state.token = token;
  },
};

const actions: CommonActions = {
  [CommonActionTypes.LOGIN]: async ({ commit }, payload) => {
    let token: string;
    try {
      token = await deps.userService.login(payload);
      commit(CommonMutationTypes.SET_TOKEN, token);
      await deps.router.push({ name: "Main" });
    } catch (e) {
      deps.logger.logError(e);
      throw e;
    }
  },

  [CommonActionTypes.LOGOUT]: async ({ commit }) => {
    commit(CommonMutationTypes.SET_TOKEN, undefined);
    await deps.router.push({ name: "Login" });
  },
};

const getters: CommonGetters = {
  [CommonGetterTypes.IS_AUTH]: (state) => {
    return !!state.token;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
