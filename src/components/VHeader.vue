<template>
  <header class="header">
    <div class="header__logo">
      <svg-icon class="header__logo__icon" icon="cat-logo"></svg-icon>
      <span class="header__logo__text">
        {{ i18n.t("crud") }} <br />
        {{ i18n.t("cats") }}
      </span>
    </div>
    <v-button @click="$emit('logout', $event)" class="header__logout">
      {{ i18n.t("logout") }}
    </v-button>
  </header>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { useI18n } from "vue-i18n";
import VButton from "@/components/VButton.vue";
import SvgIcon from "@/components/SvgIcon.vue";

@Options({ components: { VButton, SvgIcon } })
export default class VHeader extends Vue {
  i18n = setup(() => useI18n());
}
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.header {
  padding: 0 $gridNormal;
  background-color: $backgroundLightColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);

  &__logo {
    display: flex;
    align-items: center;
    padding: $gridSmall 0;
    &__icon {
      height: $gridNormal * 2;
      width: $gridSmall * 3;
      margin-right: $gridSmall;
    }

    &__text {
      @include text-normal;
      text-transform: uppercase;
    }
  }
}
</style>
