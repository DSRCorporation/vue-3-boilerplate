import { configure, defineRule } from "vee-validate";
import { inject, singleton } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { I18n } from "vue-i18n";

@singleton()
export class ValidationHelper {
  constructor(@inject(TYPES.i18n) private i18n: I18n) {}

  defineValidationRules() {
    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    });

    defineRule<string | null>("required", (value, _, ctx) => {
      if (!value || !value.length) {
        return this.i18n.global.t("formError.required", { field: ctx.field });
      }

      return true;
    });

    defineRule<string | null>("minLength", (value, params, ctx) => {
      const limit = (params as Array<string>)[0];

      if (!value || !value.length) {
        return true;
      }

      if (value.length < Number(limit)) {
        return this.i18n.global.t("formError.minLength", {
          field: ctx.field,
          limit,
        });
      }

      return true;
    });

    defineRule<string | null>("maxLength", (value, params, ctx) => {
      const limit = (params as Array<string>)[0];

      if (!value || !value.length) {
        return true;
      }

      if (value.length > Number(limit)) {
        return this.i18n.global.t("formError.maxLength", {
          field: ctx.field,
          limit,
        });
      }

      return true;
    });
  }
}
