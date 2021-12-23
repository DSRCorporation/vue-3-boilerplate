<template>
  <article class="login-view">
    <login-form
      class="login-view__form"
      :serverErrors="errors"
      @login="login"
    ></login-form>
  </article>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { Credentials } from "@/services/userService";
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";
import { computed, defineComponent } from "vue";
import { container } from "tsyringe";
import { ErrorHandler } from "@/services/errorHandler";
import axios from "axios";

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
  setup() {
    const store = useStore();
    const errors = computed(() => store.state.common.serverErrors);

    return {
      store,
      errors,
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
