<template>
  <div ref="reference">
    <slot name="reference" />
  </div>

  <teleport to="body" v-if="state !== 'NOT_TRIGGERED_YET'">
    <div ref="popup" v-show="state === 'VISIBLE'">
      <slot name="content" />
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PopupTrigger } from "./popup.types";
import { createPopper, Instance, Modifier, Placement } from "@popperjs/core";

interface AppPopupData {
  state: PopupState;
  popper: Instance | null;
}

type PopupState = "NOT_TRIGGERED_YET" | "VISIBLE" | "HIDDEN";

const DEFAULT_PLACEMENT: Placement = "bottom-start";
const DEFAULT_MODIFIERS: Modifier<any, any>[] = [];

export default defineComponent({
  name: "VPopup",

  expose: ["toggle", "show", "hide"],

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    triggers: {
      type: Array as PropType<Array<PopupTrigger>>,
      required: false,
      default: ["click"] as Array<PopupTrigger>,
    },
    closeOnClickOutside: {
      type: Boolean,
      required: false,
      default: true,
    },
    placement: {
      type: String as PropType<Placement>,
      required: false,
      default: DEFAULT_PLACEMENT,
    },
    modifiers: {
      type: Array as PropType<Array<Modifier<any, any>>>,
      required: false,
      default: DEFAULT_MODIFIERS,
    },
  },

  data(): AppPopupData {
    return {
      state: "NOT_TRIGGERED_YET",
      popper: null,
    };
  },

  mounted() {
    this.startListeningToEvents();
  },

  beforeUnmount() {
    this.stopListeningToEvents();
    this.destroy();
  },

  watch: {
    disabled(isDisabled: boolean) {
      if (isDisabled) this.hide();
    },

    state(currentState: PopupState, previousState: PopupState) {
      const warn = () =>
        console.warn(
          "Invalid state transition from",
          previousState,
          "to",
          currentState
        );

      if (previousState === "NOT_TRIGGERED_YET") {
        if (currentState === "VISIBLE") {
          this.$nextTick(this.create);
        } else {
          warn();
        }
      }

      if (previousState === "VISIBLE") {
        if (currentState === "HIDDEN") {
          // handled in the template
        } else {
          warn();
        }
      }

      if (previousState === "HIDDEN") {
        if (currentState === "VISIBLE") {
          // handled in the template
        } else {
          warn();
        }
      }
    },
  },

  methods: {
    create() {
      this.popper = createPopper(
        this.$refs.reference as HTMLDivElement,
        this.$refs.popup as HTMLDivElement,
        {
          placement: this.placement,
          modifiers: this.modifiers,
        }
      );
    },

    destroy() {
      this.popper?.destroy();
      this.popper = null;
    },

    startListeningToEvents() {
      if (this.closeOnClickOutside) {
        document.addEventListener("click", this.handleClickOutside);
      }

      const reference = this.$refs.reference as HTMLDivElement;

      if (this.triggers?.includes("click")) {
        reference.addEventListener("click", this.clearInput);
      }

      if (this.triggers?.includes("hover")) {
        reference.addEventListener("mouseover", this.handleMouseOver);
        reference.addEventListener("mouseout", this.handleMouseOut);
      }

      if (this.triggers?.includes("focus")) {
        reference.addEventListener("focus", this.handleFocus);
        reference.addEventListener("blur", this.handleBlur);
      }
    },

    stopListeningToEvents() {
      if (this.closeOnClickOutside) {
        document.removeEventListener("click", this.handleClickOutside);
      }

      const reference = this.$refs.reference as HTMLDivElement;

      if (this.triggers?.includes("click")) {
        reference.removeEventListener("click", this.clearInput);
      }

      if (this.triggers?.includes("hover")) {
        reference.removeEventListener("mouseover", this.handleMouseOver);
        reference.removeEventListener("mouseout", this.handleMouseOut);
      }

      if (this.triggers?.includes("focus")) {
        reference.removeEventListener("focus", this.handleFocus);
        reference.removeEventListener("blur", this.handleBlur);
      }
    },

    handleClickOutside(event: Event) {
      if (this.state !== "VISIBLE") {
        return;
      }

      const reference = this.$refs.reference as HTMLDivElement;
      const popup = this.$refs.popup as HTMLDivElement | null;

      if (
        reference.contains(event.target as Element) ||
        popup?.contains(event.target as Element)
      ) {
        return;
      }

      this.hide();
    },

    clearInput() {
      this.toggle();
    },

    handleFocus() {
      this.show();
    },

    handleBlur() {
      this.hide();
    },

    handleMouseOver() {
      this.show();
    },

    handleMouseOut() {
      this.hide();
    },

    toggle() {
      if (this.state === "VISIBLE") {
        this.hide();
      } else {
        this.show();
      }
    },

    show() {
      if (this.disabled) {
        return;
      }

      this.state = "VISIBLE";
    },

    hide() {
      if (this.state === "VISIBLE") this.state = "HIDDEN";
    },
  },
});
</script>
