<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";

@Options({})
export default class App extends Vue {
  async created() {
    axios.interceptors.request.use(config => {
      const token = this.$store.state.common.token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.response.use(undefined, async err => {
      if (
        err.response &&
        err.response.status === 401 &&
        this.$router.currentRoute.value.name !== "Login"
      ) {
        await this.$store.dispatch(
          `${StoreModules.COMMON}/${CommonActionTypes.LOGOUT}`
        );
      }

      throw err;
    });

    const token = this.$store.state.common.token;

    if (!token) {
      await this.$router.push({ name: "Login" });
    }
  }
}
</script>

<style lang="scss">
@import "scss/constants";
@import "scss/typography";

* {
  box-sizing: border-box;
}

body,
html {
  font-family: $fontFamily;
  @include text-normal;
  background-color: $backgroundColor;
  color: $textColor;
  height: 100%;
  width: 100%;
  margin: 0;
}

body {
  overflow: auto;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
