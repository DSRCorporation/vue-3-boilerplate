<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";

export default class App extends Vue {
  async created() {
    axios.interceptors.request.use(config => {
      const token = this.$store.state.common.token;

      if (token) {
        config.headers["Token"] = token;
      }

      return config;
    });

    axios.interceptors.response.use(undefined, async err => {
      if (
        err.response &&
        err.response.status === 401 &&
        this.$router.currentRoute.value.name !== "Login"
      ) {
        await this.$store.dispatch("logout");
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

<style>
html {
  height: 100%;
}

#app {
  height: 100%;
}

body {
  background-color: #5a4577;
  margin: 0;
  height: 100%;
}
</style>
