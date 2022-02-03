<template>
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="validation">
    <form
      class="login-form"
      novalidate
      autocomplete="off"
      @submit.prevent="handleSubmit($event, submit)"
    >
      <h1 class="login-form__header">
        {{ i18n.t("welcome") }}
      </h1>

      <v-input
        class="login-form__input"
        label="Email"
        name="email"
        v-model="credentials.email"
      >
        <VeeErrorMessage name="email" />
      </v-input>

      <v-input
        class="login-form__input"
        label="Password"
        name="password"
        type="password"
        v-model="credentials.password"
      >
        <VeeErrorMessage name="password" />
      </v-input>

      <div class="login-form__buttons">
        <v-button type="submit" class="login-form__submit">{{
          i18n.t("login")
        }}</v-button>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { useI18n } from "vue-i18n";
import {
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
  SubmissionContext,
} from "vee-validate";
import * as yup from "yup";
import { ServerError } from "@/types/serverError";

export default defineComponent({
  name: "LoginForm",
  components: {
    VButton,
    VInput,
    VeeForm,
    VeeErrorMessage,
  },
  props: {
    serverErrors: {
      type: Object as PropType<ServerError>,
    },
  },
  emits: ["login"],
  setup() {
    return {
      i18n: useI18n(),
    };
  },
  data() {
    return {
      credentials: { email: "", password: "" },
      validation: yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required().min(4),
      }),
    };
  },
  methods: {
    submit<H, C extends SubmissionContext>(value: H, actions: C) {
      this.$emit("login", this.credentials, actions.setFieldError);
    },
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.login-form {
  display: grid;
  background-color: var(--background-light-color);
  padding: var(--space-xxxxxl) var(--space-xxxxl);
  border-radius: var(--border-radius-lg);

  &__header {
    margin-bottom: var(--space-xxl);
  }

  &__input {
    margin-bottom: var(--space-xxxxl);
  }

  &__buttons {
    display: grid;
  }
}
</style>
