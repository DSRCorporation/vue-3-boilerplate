<script lang="ts">
import { h, PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Array<any>>,
    },
    keyProp: {
      type: String as PropType<string>,
      default: "id",
    },
    thumbnailWidth: String,
  },
  render() {
    if (!this.items || !this.$slots.default) {
      return;
    }

    let className = "list";
    const style: Record<string, string> = {};

    if (this.thumbnailWidth) {
      className += " list--thumbnail";
      style["--thumbnail-width"] = this.thumbnailWidth;
    }

    return h(
      "ul",
      {
        className,
        style,
      },
      this.items.map((item) => {
        return h(
          "li",
          { key: item[this.keyProp] },
          this.$slots.default?.({ item: item })
        );
      })
    );
  },
});
</script>

<style lang="scss">
@import "../scss/constants";

.list {
  --thumbnail-width: calc(25% - #{$gridNormal});
  list-style: none;
  padding: 0;
  margin: 0;

  &--thumbnail {
    display: grid;
    // four cells grid by default
    grid-template-columns: repeat(
      auto-fill,
      calc(var(--thumbnail-width) - #{$gridNormal})
    );
    grid-gap: $gridNormal;
    justify-content: space-between;

    .list__item {
      margin-bottom: $gridBig;
    }
  }
}
</style>
