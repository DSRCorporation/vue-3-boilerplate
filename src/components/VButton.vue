<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class VButton extends Vue {}
</script>

<style scoped lang="scss">
@import "src/scss/constants";
@import "src/scss/typography";

.button {
  background: $primaryColor;
  border-radius: 4px;
  color: $textLightColor;
  @include text-normal;
  font-weight: $fontWeightMedium;
  padding: $gridSmall $gridNormal;
  border: none;
  text-transform: uppercase;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.05em;

  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
  }
}
</style>
