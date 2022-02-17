import { inject, injectable } from "tsyringe";
import { useToast } from "vue-toastification";
import { TYPES } from "@/services/helpers/containerTypes";
import { InstalledPlugins } from "@/vue-component-types";

export interface IToaster {
  info(message: string): void;
  error(message: string): void;
}

const toast = useToast();

@injectable()
export class Toaster implements IToaster {
  constructor(@inject(TYPES.VuePlugins) private vuePlugins: InstalledPlugins) {}

  info(message: string): void {
    toast.info(message);
  }

  error(message: string): void {
    toast.error(message);
  }
}
