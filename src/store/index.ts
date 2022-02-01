import { createStore, Store } from "vuex";
import common from "@/store/common/common";
import cats from "@/store/cats/cats";
import { RootState } from "@/store/types";
import { InjectionKey } from "vue";

// injection key: required for useStore typings
export const STORE_KEY: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  modules: {
    common,
    cats,
  },
});
