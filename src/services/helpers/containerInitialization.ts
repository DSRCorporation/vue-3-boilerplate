import { App } from "@vue/runtime-core";
import { container } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import router from "@/router";
import i18n from "@/lang/i18n";
import { Toaster, IToaster } from "@/services/toaster";
import { ILogger, Logger } from "@/services/logger";
import { ValidationHelper } from "@/validation/validationHelper";

/**
 * Initial setup of DI Container
 * @param app instance of Vue Application
 */
export function initContainer<HostElement>(app: App<HostElement>) {
  // Register Vue Plugins in DI Container
  container.registerInstance(TYPES.VuePlugins, app.config.globalProperties);

  container.registerInstance(TYPES.Router, router);
  container.registerInstance(TYPES.i18n, i18n);
  container.register<IToaster>(TYPES.IToaster, {
    useClass: Toaster,
  });

  // we can't update tsyring due to an error
  // https://github.com/microsoft/tsyringe/issues/138
  container.register<ILogger>(TYPES.ILogger, {
    useClass: Logger,
  });
  container.register<ValidationHelper>(TYPES.ValidationHelper, {
    useClass: ValidationHelper,
  });

  if (window.Cypress) {
    window.$container = container;
  }

  return container;
}
