<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo__icon" src="/logo.svg" />
    </div>
    <!--todo name is stub-->
    <user-avatar @click="$emit('logout', $event)" v-if="isAuthenticated" name="A"></user-avatar>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import UserAvatar from "@/components/user/UserAvatar.vue";
import { useStore } from "@/store";
import { CommonGetterTypes } from "@/store/common/types";

export default defineComponent({
  name: "VHeader",
  components: {
    UserAvatar
  },
  setup() {
    const store = useStore();

    const isAuthenticated = computed(
      () => store.getters[CommonGetterTypes.IS_AUTH]
    );

    return {
      isAuthenticated,
      i18n: useI18n(),
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/typography";

.header {
  padding: var(--space-sm) var(--space-xl);
  background-color: var(--color-key-background);
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
