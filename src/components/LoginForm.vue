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
        :server-error="serverErrors.email"
        @update:modelValue="onInput"
      ></v-input>

      <v-input
        class="login-form__input"
        label="Password"
        name="password"
        type="password"
        v-model="credentials.password"
        :server-error="serverErrors.password"
        @update:modelValue="onInput"
      ></v-input>
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
import { Form as VeeForm } from "vee-validate";
import SvgIcon from "@/components/SvgIcon.vue";
import * as yup from "yup";

export default defineComponent({
  name: "LoginForm",
  components: {
    VButton,
    SvgIcon,
    VInput,
    VeeForm,
  },
  props: {
    serverErrors: {
      type: Object,
    },
  },
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
    async submit() {
      await this.$emit("login", this.credentials);
      console.log(`form: ${this.serverErrors}`);
    },
    onInput() {
      this.$emit("input");
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
