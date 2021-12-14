<template>
  <article class="main">
    <v-header @logout="logout"></v-header>
    <router-view></router-view>
  </article>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import VButton from "@/components/VButton.vue";
import { useI18n } from "vue-i18n";
import { Store, useStore } from "vuex";
import { RootState, StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";
import VHeader from "@/components/VHeader.vue";

@Options({
  components: {
    VButton,
    VHeader,
  },
})
export default class Main extends Vue {
  i18n = setup(() => useI18n());
  store: Store<RootState> = setup(() => useStore());

  async logout() {
    // Example of usage services' plugin injection
    this.$logger.logInfo("Initiate logout!");

    //todo improve typings
    await this.store.dispatch(
      `${StoreModules.COMMON}/${CommonActionTypes.LOGOUT}`
    );
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: inherit;
}
</style>
