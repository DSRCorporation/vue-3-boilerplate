import { InstalledPlugins } from "@/vue-component-types";
import { Logger } from "@/services/logger";
import { ErrorHandler } from "@/services/errorHandler";

declare module "*.vue" {
  // eslint-disable-next-line
  // @ts-ignore
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends InstalledPlugins {
    // define services here
    $logger: Logger;
    $errorHandler: ErrorHandler;
  }
}
