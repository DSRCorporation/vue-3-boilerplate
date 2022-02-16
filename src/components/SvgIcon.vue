<template>
  <svg class="svg-icon">
    <use :xlink:href="iconPath"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconPath() {
      return `/icons.svg#${this.icon}`;
    },
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";

//todo introduce different icon sizes
.svg-icon {
  display: flex;
  width: calc(1.5 * var(--space-unit-base));
  height: calc(1.5 * var(--space-unit-base));
}
</style>
