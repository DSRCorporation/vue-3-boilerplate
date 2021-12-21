<template>
  <article class="login-view">
    <login-form
      class="login-view__form"
      :serverErrors="errors"
      @login="login"
      @input="onInput"
    ></login-form>
  </article>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { Credentials } from "@/services/userService";
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";
import { defineComponent } from "vue";
import { container } from "tsyringe";
import { ErrorHandler } from "@/services/errorHandler";

const deps = {
  get errorHandler() {
    return container.resolve(ErrorHandler);
  },
};

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
  },
  data() {
    const errors = {};
    return {
      store: useStore(),
      errors,
    };
  },
  methods: {
    async login(credentials: Credentials): Promise<void> {
      this.$logger.logInfo("Initiate login!");

      //todo improve typings
      await this.store.dispatch(
        `${StoreModules.COMMON}/${CommonActionTypes.LOGIN}`,
        credentials
      );
      this.errors = { ...deps.errorHandler.getServerErrors() };
      console.log(this.errors);
    },
    onInput() {
      deps.errorHandler.clearBackendError();
      this.errors = { ...deps.errorHandler.getServerErrors() };
    },
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";

.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__form {
    width: $gridLarge * 10;
  }
}
</style>
