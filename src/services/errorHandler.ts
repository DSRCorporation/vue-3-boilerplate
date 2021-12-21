import { AxiosError } from "axios";
import { I18n } from "vue-i18n";
import { inject, singleton } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { IToaster } from "@/services/toaster";
import { ServerError } from "@/types/serverError";

@singleton()
export class ErrorHandler {
  private serverErrors: ServerError;

  constructor(
    @inject(TYPES.i18n) private i18n: I18n,
    @inject(TYPES.IToaster) private toaster: IToaster
  ) {
    this.serverErrors = {};
  }

  handleError(e: Error) {
    this.toaster.error(
      this.i18n.global.t(`error.${e.message || "COMMON_ERR"}`, e.message)
    );
  }

  clearBackendError() {
    for (const key in this.serverErrors) {
      this.serverErrors[key] = "";
    }
  }

  getServerErrors(): ServerError {
    return this.serverErrors;
  }

  handleBackendError(e: AxiosError) {
    switch (e.response?.data.error) {
      case "INVALID_USERNAME":
        this.serverErrors.email = this.i18n.global.t(
          `error.${e.response?.data.error}`
        );
        break;
      case "INVALID_PASSWORD":
        this.serverErrors.password = this.i18n.global.t(
          `error.${e.response?.data.error}`
        );
        break;
      default: {
        this.toaster.error(
          this.i18n.global.t(`error.${e.response?.data.error || "COMMON_ERR"}`)
        );
      }
    }
  }
}
