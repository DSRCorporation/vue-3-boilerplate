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

  handleBackendError(
    e: AxiosError,
    setFieldError?: (key: string, value: string) => void
  ): ServerError {
    const errors: ServerError = {};
    e.response?.data.message.forEach((error: ServerErrorMessage) => {
      if (error.property) {
        errors[`${error.property}`] =
          error.constraints[Object.keys(error.constraints)[0]];
      } else {
        this.toaster.error(
          this.i18n.global.t(
            `error.${e.response?.data.error || "COMMON_ERR"}`,
            error.constraints
          )
        );
      }
    });
    if (setFieldError) {
      for (const key in errors) {
        setFieldError(key, errors[key]);
      }
    }
    return errors;
  }
}
