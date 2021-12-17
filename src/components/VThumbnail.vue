<template>
  <div class="thumbnail">
    <div class="thumbnail__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VThumbnail",
});
</script>

<style scoped lang="scss">
.thumbnail {
  height: 0;
  // 9x16
  padding-top: 56.25%;
  position: relative;

  &__content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
