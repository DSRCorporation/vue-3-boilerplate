<template>
  <article class="login-view">
    <v-header></v-header>
    <login-form class="login-view__form" @login="login"></login-form>
  </article>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { Credentials } from "@/services/userService";
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common/types";
import { defineComponent } from "vue";
import { container } from "tsyringe";
import { ErrorHandler } from "@/services/errorHandler";
import axios from "axios";
import VHeader from "@/components/VHeader.vue";
import { STORE_KEY } from "@/store";

const deps = {
  get errorHandler() {
    return container.resolve(ErrorHandler);
  },
};

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
    VHeader,
  },
  setup() {
    const store = useStore(STORE_KEY);

    return {
      store,
    };
  },
  methods: {
    async login(
      credentials: Credentials,
      setFieldError: (key: string, value: string) => void
    ): Promise<void> {
      this.$logger.logInfo("Initiate login!");

      //todo improve typings
      try {
        await this.store.dispatch(
          `${StoreModules.COMMON}/${CommonActionTypes.LOGIN}`,
          credentials
        );
      } catch (e) {
        if (axios.isAxiosError(e)) {
          deps.errorHandler.handleBackendError(e, setFieldError);
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/breakpoints";

.login-view {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;

  &__form {
    width: calc(var(--space-unit-base) * 25);
    align-self: center;
    justify-self: center;
  }
}

@include breakpoint(md) {
  .login-view {
    &__form {
      width: calc(var(--space-unit-base) * 22);
    }
  }
}

@include breakpoint(xs) {
  .login-view {
    &__form {
      width: 100%;
      padding: 0 var(--space-xxxxl);
    }
  }
}
</style>
