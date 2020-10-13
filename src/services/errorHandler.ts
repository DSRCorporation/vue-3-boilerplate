import { AxiosError } from "axios";
import { I18n } from "vue-i18n";
import { inject, singleton } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { IToaster } from "@/services/toaster";

@singleton()
export class ErrorHandler {
  constructor(
    @inject(TYPES.i18n) private i18n: I18n,
    @inject(TYPES.IToaster) private toaster: IToaster
  ) {}

  handleError(e: Error) {
    this.toaster.error(
      this.i18n.global.t(`error.${e.message || "COMMON_ERR"}`, e.message)
    );
  }

  handleBackendError(e: AxiosError) {
    this.toaster.error(
      this.i18n.global.t(`error.${e.response?.data.error || "COMMON_ERR"}`)
    );
  }
}
