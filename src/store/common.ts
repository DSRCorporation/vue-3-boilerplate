import {
  ActionContext,
  ActionTree,
  MutationTree,
  Store as VuexStore
} from "vuex";
import { AugmentedActionContext, RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";
import { ErrorHandler } from "@/services/errorHandler";
import { container } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";

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
  }
};

export interface CommonState {
  token?: string;
}

export enum CommonMutationTypes {
  SET_TOKEN = "setToken"
}

export interface CommonMutations {
  [CommonMutationTypes.SET_TOKEN](state: CommonState, payload: string): void;
}

export enum CommonActionTypes {
  LOGIN = "login",
  LOGOUT = "logout"
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
  token: localStorage.getItem("token")
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
  }
};

const actions: ActionTree<CommonState, RootState> & CommonActions = {
  [CommonActionTypes.LOGIN]: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    payload: Credentials
  ) => {
    let token: string;
    try {
      token = await deps.userService.login(payload);
    } catch (e) {
      if (e.response?.status === 401) {
        deps.errorHandler.handleBackendError(e);
      }
      deps.logger.logError(e);
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  [CommonActionTypes.LOGOUT]: async ({
    commit
  }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await deps.router.push({ name: "Login" });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
