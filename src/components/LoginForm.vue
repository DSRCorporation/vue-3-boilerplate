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
      ></v-input>

      <v-input
        class="login-form__input"
        label="Password"
        name="password"
        type="password"
        v-model="credentials.password"
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
import { Options, setup, Vue } from "vue-class-component";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { Credentials } from "@/services/userService";
import { useI18n } from "vue-i18n";
import { Form as VeeForm, Field } from "vee-validate";
import SvgIcon from "@/components/SvgIcon.vue";

@Options({
  components: { VButton, VInput, VeeForm, Field, SvgIcon }
})
export default class LoginForm extends Vue {
  credentials: Credentials = { email: "", password: "" };
  i18n = setup(() => useI18n());

  validation = {
    username: "required",
    password: "required|minLength:4"
  };

  submit() {
    this.$emit("login", this.credentials);
  }
}
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.login-form {
  display: flex;
  flex-direction: column;
  background-color: $backgroundLightColor;
  padding: $gridLarge;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
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
