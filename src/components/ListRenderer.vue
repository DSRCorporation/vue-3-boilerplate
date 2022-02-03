<script lang="ts">
import { h, PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Array<Record<string, unknown>>>,
    },
    keyProp: {
      type: String as PropType<string>,
      default: "id",
    },
    isThumbnail: Boolean,
  },
  render() {
    if (!this.items || !this.$slots.default) {
      return;
    }

    let className = "list";
    const style: Record<string, string> = {};

    if (this.isThumbnail) {
      className += " list--thumbnail";
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
          { key: item[this.keyProp] as string },
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
  list-style: none;
  padding: 0;
  margin: 0;

  &--thumbnail {
    display: grid;
    // four cells grid by default
    grid-template-columns: repeat(var(--thumbnails-per-row, 4), 1fr);
    grid-gap: var(--space-sm);
    justify-content: space-between;
  }
}
</style>
