import "reflect-metadata";

import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";
import { TYPES } from "@/services/helpers/containerTypes";
import serviceInjectionPlugin from "@/services/helpers/serviceInjectionPlugin";
import { ErrorHandler } from "@/services/errorHandler";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import i18n from "@/lang/i18n";
import { initContainer } from "@/services/helpers/containerInitialization";

// Step 1: Creation of Vue application
const app = createApp(App);

// Step 2: Initialization of DI Container
initContainer(app);

// Step 3: Installing required plugins
app
  .use(router)
  .use(store)
  // Injection DI Services into Vue as plugins (this part can be removed if decorative approach is preferable for you)
  .use(
    serviceInjectionPlugin(
      new Map<string, InjectionToken<any>>([
        ["$logger", TYPES.ILogger],
        ["$errorHandler", ErrorHandler]
      ])
    )
  )
  .use(i18n);

// Step 4: Mount Vue Application
app.mount("#app");
