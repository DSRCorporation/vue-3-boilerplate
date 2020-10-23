<template>
  <svg class="svg-icon">
    <use :xlink:href="iconPath"></use>
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({ props: { icon: String } })
export default class SvgIcon extends Vue {
  icon!: string;

  get iconPath() {
    return `/icons.svg#${this.icon}`;
  }
}
</script>

<style scoped lang="scss">
@import "../scss/constants";
</style>
