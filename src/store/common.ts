import { ActionContext, ActionTree, MutationTree } from "vuex";
import { AugmentedActionContext, RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";
import { ErrorHandler } from "@/services/errorHandler";
import { container } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import axios from "axios";
import { ServerError } from "@/types/serverError";

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

export interface CommonState {
  token?: string;
  serverErrors: ServerError;
}

export enum CommonMutationTypes {
  SET_TOKEN = "setToken",
  SET_ERRORS = "setErrors",
}

export interface CommonMutations {
  [CommonMutationTypes.SET_TOKEN](state: CommonState, payload: string): void;
  [CommonMutationTypes.SET_ERRORS](
    state: CommonState,
    payload: ServerError
  ): void;
}

export enum CommonActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
}

type CommonActionContext = AugmentedActionContext<CommonMutations, CommonState>;

export interface CommonActions {
  [CommonActionTypes.LOGIN](
    context: CommonActionContext,
    payload: Credentials
  ): Promise<void>;
  [CommonActionTypes.LOGOUT](context: CommonActionContext): Promise<void>;
}

const state = {
  token: localStorage.getItem("token"),
  serverErrors: {},
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
  [CommonMutationTypes.SET_ERRORS]: (
    state: CommonState,
    errors: ServerError
  ) => {
    state.serverErrors = { ...errors };
  },
};

const actions: ActionTree<CommonState, RootState> & CommonActions = {
  [CommonActionTypes.LOGIN]: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    payload: Credentials
  ) => {
    let token: string;
    try {
      token = await deps.userService.login(payload);
      commit(CommonMutationTypes.SET_ERRORS, {});
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          commit(
            CommonMutationTypes.SET_ERRORS,
            deps.errorHandler.handleBackendError(e)
          );
        } else {
          deps.errorHandler.handleError(e);
        }
      }
      deps.logger.logError(e);
      return;
    }
    commit(CommonMutationTypes.SET_TOKEN, token);
    await deps.router.push({ name: "Main" });
  },

  [CommonActionTypes.LOGOUT]: async ({
    commit,
  }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await deps.router.push({ name: "Login" });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
