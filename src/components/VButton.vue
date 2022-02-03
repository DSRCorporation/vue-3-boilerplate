<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VButton",
});
</script>

<style scoped lang="scss">
@import "src/scss/constants";
@import "src/scss/typography";

.button {
  background: var(--primary-color);
  border-radius: 4px;
  color: var(--text-light-color);
  @include font-callout();
  font-weight: 500;
  padding: var(--btn-padding-left, var(--space-xs))
    var(--btn-padding-top, var(--space-md));
  border: none;
  display: grid;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.05em;

  &--icon {
    padding: var(--space-sm);
  }

  &--wrapper.button {
    padding: 0;
    background-color: transparent;
    &:hover {
      box-shadow: none;
    }
  }

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
  }
}
</style>
