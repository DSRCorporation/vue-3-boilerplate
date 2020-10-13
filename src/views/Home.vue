<template>
  <div class="home">
    <div class="home-logout">
      <v-button @click="logout" class="button">
        {{ i18n.t("logout") }}
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import VButton from "@/components/VButton.vue";
import { useI18n } from "vue-i18n";
import { Store, useStore } from "vuex";
import { RootState, StoreModules } from "@/store/types";
import { CommonActionTypes } from "@/store/common";

@Options({
  components: {
    VButton
  }
})
export default class Home extends Vue {
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

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: inherit;
  &-logout {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
}
</style>
