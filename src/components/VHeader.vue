<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo__icon" src="/logo.svg" />
    </div>
    <v-button
      @click="$emit('logout', $event)"
      v-if="isAuthenticated"
      class="button--wrapper"
    >
      <!--todo name is stub-->
      <user-avatar name="A"></user-avatar>
    </v-button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import VButton from "@/components/VButton.vue";
import UserAvatar from "@/components/user/UserAvatar.vue";
import { createNamespacedHelpers } from "vuex";
import { StoreModules } from "@/store/types";
import { CommonState } from "@/store/common/types";

const { mapState } = createNamespacedHelpers(StoreModules.COMMON);

export default defineComponent({
  name: "VHeader",
  components: {
    UserAvatar,
    VButton,
  },
  computed: mapState<CommonState>({
    isAuthenticated: (state: CommonState) => !!state.token,
  }),
  setup() {
    return {
      i18n: useI18n(),
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.header {
  padding: var(--space-sm) var(--space-xl);
  background-color: var(--background-light-color);
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;

  &__logo {
    display: grid;
    &__icon {
      height: calc(1.5 * var(--space-unit-base));
      margin-right: var(--space-md);
    }
  }
}
</style>
