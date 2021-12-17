<template>
  <article class="main">
    <v-header @logout="logout"></v-header>
    <router-view></router-view>
  </article>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";
import VHeader from "@/components/VHeader.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VMain",
  components: {
    VHeader,
  },
  data() {
    return {
      store: useStore(),
    };
  },
  methods: {
    async logout() {
      // Example of usage services' plugin injection
      this.$logger.logInfo("Initiate logout!");

      //todo improve typings
      await this.store.dispatch(
        `${StoreModules.COMMON}/${CommonActionTypes.LOGOUT}`
      );
    },
  },
  setup() {
    return {
      i18n: useI18n(),
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: inherit;
}
</style>
