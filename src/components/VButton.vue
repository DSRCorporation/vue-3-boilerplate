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

.button {
  background: $cornFlower;
  background-image: linear-gradient(to bottom, $cornFlower, $flamingoPink);
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
  padding: 8px;
  box-shadow: 1px 1px 20px 0px $biscay;
  text-shadow: 0px 0px 20px $biscay;
  border: solid $cornFlower 0px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: $flamingoPink;
    background-image: linear-gradient(to bottom, $flamingoPink, $cornFlower);
  }

  &:active {
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
  }
}
</style>
