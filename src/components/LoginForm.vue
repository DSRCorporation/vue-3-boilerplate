<template>
  <form
    class="login-form"
    novalidate
    autocomplete="off"
    @submit.prevent="onSubmit"
  >
    <h1 class="login-form__header">
      {{ i18n.t("welcome") }}
    </h1>

    <v-input
      class="login-form__input"
      label="Email"
      name="email"
      :invalid="!!emailError"
      v-model="email"
    >
      <template #error>
        {{ emailError }}
      </template>
    </v-input>

    <v-password
      class="login-form__input"
      name="password"
      :invalid="!!passwordError"
      v-model="password"
    >
      <template #error>
        {{ passwordError }}
      </template>
    </v-password>

    <div class="login-form__buttons">
      <v-button type="submit" class="login-form__submit">{{
        i18n.t("login")
      }}</v-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ServerError } from "@/types/serverError";
import VPassword from "@/components/VPassword.vue";

export default defineComponent({
  name: "LoginForm",
  components: {
    VPassword,
    VButton,
    VInput,
  },
  props: {
    serverErrors: {
      type: Object as PropType<ServerError>,
    },
  },
  emits: ["login"],
  setup(_, { emit }) {
    const validationSchema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(4),
    });

    const { handleSubmit } = useForm({
      validationSchema,
      initialValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = handleSubmit((values) => {
      emit("login", values);
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    return {
      i18n: useI18n(),
      onSubmit,
      email,
      emailError,
      password,
      passwordError,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/tokens";
@import "../scss/typography";

.login-form {
  display: grid;
  background-color: var(--color-key-background);
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
