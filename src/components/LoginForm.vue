<template>
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="validation">
    <form
      class="login-form"
      novalidate
      autocomplete="off"
      @submit.prevent="handleSubmit($event, submit)"
    >
      <div class="login-form__logo">
        <svg-icon class="login-form__logo__icon" icon="cat-logo"></svg-icon>
        <span class="login-form__logo__text">
          {{ i18n.t("crud") }} <br />
          {{ i18n.t("cats") }}
        </span>
      </div>

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
import { defineComponent } from "vue";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { useI18n } from "vue-i18n";
import {
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
  SubmissionContext,
} from "vee-validate";
import SvgIcon from "@/components/SvgIcon.vue";
import * as yup from "yup";

export default defineComponent({
  name: "LoginForm",
  components: {
    VButton,
    SvgIcon,
    VInput,
    VeeForm,
    VeeErrorMessage,
  },
  props: {
    serverErrors: {
      type: Object,
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
  display: flex;
  flex-direction: column;
  background-color: $backgroundLightColor;
  padding: $gridLarge;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;

  &__logo {
    display: flex;
    align-items: center;
    padding-bottom: $gridLarge;
    align-self: center;
    &__icon {
      height: 64px;
      width: 48px;
      margin-right: $gridNormal;
    }

    &__text {
      font-size: $fontSizeLarge;
      line-height: $lineHeightLarge;
      text-transform: uppercase;
    }
  }

  &__input {
    margin-bottom: $gridBase;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: $gridSmall;
  }
}
</style>
