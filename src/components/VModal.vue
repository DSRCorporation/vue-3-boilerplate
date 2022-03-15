<template>
  <teleport to="body">
    <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      :content-class="contentClasses"
      classes="modal-root"
      overlay-class="modal-overlay"
    >
      <span class="modal__title">
        <slot name="title"></slot>
      </span>

      <div class="modal__content">
        <slot :params="params"></slot>
      </div>

      <div class="modal__action">
        <slot name="action" :close="close"></slot>
      </div>

      <v-button
        class="modal__close"
        size="sm"
        variant="noBg"
        variant-color="black"
        @click="close"
      >
        <template #icon>
          <svg-icon icon="close"></svg-icon>
        </template>
      </v-button>
    </vue-final-modal>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import VButton from "@/components/VButton.vue";
import SvgIcon from "@/components/SvgIcon.vue";

type ModalSizes = "sm" | "md" | "lg";

export default defineComponent({
  name: "VModal",
  components: { VButton, SvgIcon },
  inheritAttrs: false,
  emits: {
    confirm: null,
    cancel: null,
  },
  props: {
    size: {
      type: String as PropType<ModalSizes>,
      default: "sm",
    },
  },
  setup: (props, { emit }) => {
    const confirm = (close: () => void) => {
      emit("confirm", close);
    };

    const cancel = (close: () => void) => {
      emit("cancel", close);
    };

    const contentClasses = computed(() => ({
      "modal-container": true,
      "modal-container--sm": props.size === "sm",
      "modal-container--md": props.size === "md",
      "modal-container--lg": props.size === "lg",
    }));

    return {
      cancel,
      confirm,
      contentClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/scss/tokens";
@import "src/scss/typography";

::v-deep(.modal-overlay) {
  backdrop-filter: var(--modal-backdrop-filter);
}

::v-deep(.modal-root) {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: var(--space-xxl) 0;
}

::v-deep(.modal-container) {
  border-radius: var(--border-radius-lg);
  background: var(--color-key-background);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin: 0 var(--space-xl);
  position: relative;

  &.modal-container--sm {
    width: var(--modal-size-small);
  }

  &.modal-container--md {
    width: var(--modal-size-medium);
  }

  &.modal-container--lg {
    width: var(--modal-size-large);
  }
}

.modal__title {
  border-bottom: var(--border-xs) solid var(--color-background-color-primary);
  padding: var(--space-xxxxl);
  @include font-large-title();
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
  padding: var(--space-xxxxl);
}

.modal__action {
  align-items: center;
  border-top: var(--border-xs) solid var(--color-background-color-primary);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: var(--space-xxxxl);
}

.modal__close {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
}
</style>
