import { ActionContext, ActionTree, MutationTree } from "vuex";
import { AugmentedActionContext, RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";
import { ErrorHandler } from "@/services/errorHandler";
import { container } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import {
  CommonActionContext,
  CommonActions,
  CommonActionTypes,
  CommonMutations,
  CommonMutationTypes,
  CommonState,
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

const mutations: MutationTree<CommonState> & CommonMutations = {
  [CommonMutationTypes.SET_TOKEN]: (
    state: CommonState,
    token: string | undefined
  ) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    state.token = token;
  },
};

const actions: ActionTree<CommonState, RootState> & CommonActions = {
  [CommonActionTypes.LOGIN]: async (
    { commit }: CommonActionContext,
    payload: Credentials
  ) => {
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

  [CommonActionTypes.LOGOUT]: async ({ commit }: CommonActionContext) => {
    commit(CommonMutationTypes.SET_TOKEN, undefined);
    await deps.router.push({ name: "Login" });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
