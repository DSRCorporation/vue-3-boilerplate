import { inject, injectable } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { InstalledPlugins } from "@/vue-component-types";

export interface IToaster {
  info(message: string): void;
  error(message: string): void;
}

@injectable()
export class Toaster implements IToaster {
  constructor(@inject(TYPES.VuePlugins) private vuePlugins: InstalledPlugins) {}

  info(message: string): void {
    //todo implement it: integrate any third-party library
    alert(message);
  }

  error(message: string): void {
    //todo implement it: integrate any third-party library
    alert(message);
  }
}
