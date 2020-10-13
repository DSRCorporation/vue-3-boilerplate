<template>
  <article class="login-view">
    <login-form class="login-view__form" @login="login"></login-form>
  </article>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import LoginForm from "../components/LoginForm.vue";
import { Credentials } from "@/services/userService";
import { Store, useStore } from "vuex";
import { RootState, StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";

@Options({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  store: Store<RootState> = setup(() => useStore());

  async login(credentials: Credentials) {
    this.$logger.logInfo("Initiate login!");

    //todo improve typings
    await this.store.dispatch(
      `${StoreModules.COMMON}/${CommonActionTypes.LOGIN}`,
      credentials
    );
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &__form {
    width: 300px;
  }
}
</style>
