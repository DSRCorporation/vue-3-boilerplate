import { InstalledPlugins } from "@/vue-component-types";
import { Logger } from "@/services/logger";
import { ErrorHandler } from "@/services/errorHandler";
import { AppConfig } from "@/services/appConfig";
import DependencyContainer from "tsyringe/dist/typings/types/dependency-container";
import { RootStore } from "@/store/types";

declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends InstalledPlugins {
    // define services here
    $logger: Logger;
    $errorHandler: ErrorHandler;
    $appConfig: AppConfig;

    //types for store
    $store: RootStore;
  }
}

declare global {
  interface Window {
    Cypress: unknown;
    $container: DependencyContainer;
  }
}
