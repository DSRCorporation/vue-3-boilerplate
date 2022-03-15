<template>
  <button class="button" :class="classes">
    <span class="button__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>

    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariants = "filled" | "stroke" | "noBg";
type ButtonVariantColors = "black" | "primary" | "secondary";

export default defineComponent({
  name: "VButton",
  props: {
    size: {
      type: String as PropType<ButtonSizes>,
      default: "md",
    },
    variant: {
      type: String as PropType<ButtonVariants>,
      default: "filled",
    },
    variantColor: {
      type: String as PropType<ButtonVariantColors>,
      default: "primary",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, { slots }) => {
    const classes = computed(() => ({
      "button--small": props.size === "sm",
      "button--large": props.size === "lg",

      "button--black": props.variantColor === "black",
      "button--primary": props.variantColor === "primary",
      "button--secondary": props.variantColor === "secondary",

      "button--filled": props.variant === "filled",
      "button--stroke": props.variant === "stroke",
      "button--no-bg": props.variant === "noBg",

      "button--icon-only": !slots.default && slots.icon,
      "button--full-width": props.fullWidth,
    }));

    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/scss/tokens";
@import "src/scss/mixins";
@import "src/scss/typography";

@mixin buttonState($color, $colorHover, $colorPressed) {
  background: $color;

  &:hover:not(:disabled):not(:active) {
    background: $colorHover;
  }

  &:active,
  &:focus {
    background: $colorPressed;
  }
}

.button {
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: var(--space-xs) var(--space-md);
  @include transition-default(background);
  @include font-callout();

  &--full-width {
    width: 100%;
  }

  &__icon :slotted(.svg-icon) {
    display: block;
  }

  &:not(&--icon-only) &__icon {
    align-self: center;
    margin-right: var(--space-xs);
  }

  &:disabled {
    color: var(--color-key-quarternary);
    pointer-events: none;
  }
}

// variant filled
.button--filled {
  &.button--black:not(:disabled) {
    @include buttonState(
      var(--color-background-color-primary),
      var(--color-background-color-primary-dark),
      var(--color-background-color-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    color: var(--color-key-background);
    @include buttonState(
      var(--color-primary),
      var(--color-primary-hover),
      var(--color-primary-pressed)
    );
  }

  &.button--secondary:not(:disabled) {
    color: var(--color-key-background);
    @include buttonState(
      var(--color-secondary),
      var(--color-secondary-hover),
      var(--color-secondary-pressed)
    );
  }

  &:disabled {
    background: var(--color-background-color-primary);
  }
}

// variant stroke
.button--stroke {
  background: transparent;
  border: var(--border-xs) solid;

  &.button--black:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-color-primary),
      var(--color-background-color-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-primary),
      var(--color-background-primary-dark)
    );
    color: var(--color-primary);
  }

  &.button--secondary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-color-secondary),
      var(--color-background-color-secondary-dark)
    );
    color: var(--color-secondary);
  }

  &:disabled {
    border-color: var(--color-background-color-primary);
  }
}

// variant no-bg
.button--no-bg {
  background: transparent;

  &.button--black:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-color-primary),
      var(--color-background-color-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-primary),
      var(--color-background-primary-dark)
    );
    color: var(--color-primary);
  }

  &.button--secondary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--color-background-color-secondary),
      var(--color-background-color-secondary-dark)
    );
    color: var(--color-secondary);
  }
}

// icon button
.button--icon-only {
  align-content: center;
  justify-content: center;
  padding: var(--space-xs);

  &.button--large {
    padding: var(--space-sm);
  }

  &.button--small {
    padding: var(--space-xxxs);
  }
}

// size
.button--small {
  padding: var(--space-xxxs) var(--space-sm);
}

.button--large {
  @include font-title-3();
}
</style>
