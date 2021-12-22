import { AxiosError } from "axios";
import { I18n } from "vue-i18n";
import { inject, singleton } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { IToaster } from "@/services/toaster";
import { ServerError, ServerErrorMessage } from "@/types/serverError";

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

  handleBackendError(e: AxiosError): ServerError {
    const errors: ServerError = {};
    e.response?.data.message.forEach((error: ServerErrorMessage) => {
      if (error.property) {
        errors[`${error.property}`] =
          error.constraints[Object.keys(error.constraints)[0]];
      } else {
        this.toaster.error(this.i18n.global.t(error.constraints[0]));
      }
    });
    return errors;
  }
}
