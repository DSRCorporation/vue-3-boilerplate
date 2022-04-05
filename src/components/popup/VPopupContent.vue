<template>
  <div class="popup-content">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VPopupContent",
});
</script>

<style lang="scss" scoped>
.popup-content {
  overflow: auto;
  max-height: calc(100 * var(--space-md));
  padding: var(--space-xs) 0;
  box-shadow: var(--box-shadow-medium);
  border-radius: var(--border-radius-md);
  background-color: var(--color-key-background);
}
</style>
