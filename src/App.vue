<template>
  <router-view />
</template>

<script lang="ts">
import axios from "axios";
import { CommonActionTypes } from "@/store/common/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  async created() {
    axios.interceptors.request.use((config) => {
      const token = this.$store.state.common.token;

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.response.use(undefined, async (err) => {
      if (
        err.response?.status === 401 &&
        this.$router.currentRoute.value.name !== "Login"
      ) {
        await this.$store.dispatch(CommonActionTypes.LOGOUT);
      }

      throw err;
    });

    const token = this.$store.state.common.token;

    if (!token) {
      await this.$router.push({ name: "Login" });
    }
  },
});
</script>

<style lang="scss">
@import "scss/typography";
@import "@dmitryrazinkov/tokens";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html {
  font-family: var(--font-family);
  font-size: 16px; // it's rem value
  background-color: var(--color-key-background-dark);
  color: var(--color-key-primary);
  height: 100%;
  width: 100%;
}

body {
  overflow: auto;
}

#app {
  height: 100%;
  width: 100%;

  @include font-body();
}
</style>
