<template>
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="validation">
    <form
      class="login-form"
      novalidate
      autocomplete="off"
      @submit.prevent="handleSubmit($event, submit)"
    >
      <v-input
        class="login-form__input"
        label="Username"
        name="username"
        v-model="credentials.username"
      ></v-input>

      <v-input
        class="login-form__input"
        label="Password"
        name="password"
        type="password"
        v-model="credentials.password"
      ></v-input>
      <v-button type="submit" class="login-form__button"
        >{{ i18n.t("login") }}
      </v-button>
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

@Options({
  components: { VButton, VInput, VeeForm, Field }
})
export default class LoginForm extends Vue {
  credentials: Credentials = { username: "", password: "" };
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
.login-form {
  display: flex;
  flex-direction: column;

  &__input {
    margin-bottom: 4px;
  }

  &__button {
    margin-top: 8px;
  }
}
</style>
