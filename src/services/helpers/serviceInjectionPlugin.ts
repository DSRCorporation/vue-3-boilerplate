import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import { container } from "tsyringe";
import { App } from "@vue/runtime-core";

function lazyInjection<InjectedType, HostElement = HTMLElement>(
  app: App<HostElement>,
  key: string,
  serviceIdentifier: InjectionToken<InjectedType>
) {
  let injection: InjectedType;
  Object.defineProperty(app.config.globalProperties, key, {
    get(): InjectedType {
      if (!injection) {
        injection = container.resolve<InjectedType>(serviceIdentifier);
      }
      return injection;
    },
  });
}

export default (options: Map<string, InjectionToken>) => ({
  install: <HostElement = HTMLElement>(app: App<HostElement>) => {
    options.forEach((serviceIdentifier, key) => {
      lazyInjection(app, key, serviceIdentifier);
    });
  },
});
