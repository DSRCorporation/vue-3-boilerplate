<template>
  <span class="avatar">
    {{ this.name[0].toUpperCase() }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "user-avatar",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.avatar {
  width: calc(1.5 * var(--space-unit-base));
  height: calc(1.5 * var(--space-unit-base));
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: var(--text-light-color);
}
</style>
