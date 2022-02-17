import "reflect-metadata";
import VueFinalModal from "vue-final-modal";

import router from "./router";
import store, { STORE_KEY } from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";
import { TYPES } from "@/services/helpers/containerTypes";
import serviceInjectionPlugin from "@/services/helpers/serviceInjectionPlugin";
import { ErrorHandler } from "@/services/errorHandler";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import i18n from "@/lang/i18n";
import { initContainer } from "@/services/helpers/containerInitialization";
import { ValidationHelper } from "@/validation/validationHelper";
import { AppConfig } from "@/services/appConfig";

// Step 1: Creation of Vue application
const app = createApp(App);

// Step 2: Initialization of DI Container
const container = initContainer(app);

// Step 3: Define global validation rules
container
  .resolve<ValidationHelper>(TYPES.ValidationHelper)
  .defineValidationRules();

// TODO replace with composition api?
// Step 4: Installing required plugins
app
  .use(router)
  .use(store, STORE_KEY)
  .use(VueFinalModal)
  // Injection DI Services into Vue as plugins (this part can be removed if decorative approach is preferable for you)
  .use(
    serviceInjectionPlugin(
      new Map<string, InjectionToken>([
        ["$logger", TYPES.ILogger],
        ["$errorHandler", ErrorHandler],
        ["$appConfig", AppConfig],
      ])
    )
  )
  .use(i18n);

// Step 5: Mount Vue Application
app.mount("#app");
