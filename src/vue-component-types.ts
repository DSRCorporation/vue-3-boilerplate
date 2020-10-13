import { Store } from "vuex";
import { Router } from "vue-router";
import { RootState } from "@/store/types";

export interface InstalledPlugins {
  $store: Store<RootState>;
  $router: Router;
}
