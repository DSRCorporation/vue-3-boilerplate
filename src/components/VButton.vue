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
  name: "AppButton",
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
@import "src/scss/constants";
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
      var(--background-key-primary),
      var(--background-key-primary-dark),
      var(--background-key-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    color: var(--text-light-color);
    @include buttonState(
      var(--primary-color),
      var(--primary-color-hover),
      var(--primary-color-pressed)
    );
  }

  &.button--secondary:not(:disabled) {
    color: var(--text-light-color);
    @include buttonState(
      var(--secondary-color),
      var(--secondary-color-hover),
      var(--secondary-color-pressed)
    );
  }

  &:disabled {
    background: var(--background-key-primary);
  }
}

// variant stroke
.button--stroke {
  background: transparent;
  border: var(--border-xs) solid;

  &.button--black:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-key-primary),
      var(--background-key-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-primary),
      var(--background-primary-dark)
    );
    color: var(--primary-color);
  }

  &.button--secondary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-secondary),
      var(--background-secondary-dark)
    );
    color: var(--secondary-color);
  }

  &:disabled {
    border-color: var(--background-key-primary);
  }
}

// variant no-bg
.button--no-bg {
  background: transparent;

  &.button--black:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-key-primary),
      var(--background-key-primary-dark)
    );
  }

  &.button--primary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-primary),
      var(--background-primary-dark)
    );
    color: var(--primary-color);
  }

  &.button--secondary:not(:disabled) {
    @include buttonState(
      transparent,
      var(--background-secondary),
      var(--background-secondary-dark)
    );
    color: var(--secondary-color);
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
