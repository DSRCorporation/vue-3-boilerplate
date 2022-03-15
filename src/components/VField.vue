<template>
  <div class="field-wrapper">
    <div class="field" :class="fieldClasses">
      <div class="field__prefix">
        <slot name="prefix" />
      </div>

      <div class="field__content">
        <label v-if="label" class="field__label">
          {{ label }}
        </label>

        <div class="field__infix">
          <slot name="infix" />
        </div>
      </div>

      <div class="field__suffix">
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="invalid" class="error">
      <slot name="error" />
    </p>

    <p v-else-if="!disabled" class="hint">
      <slot name="hint" />
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "VField",

  props: {
    label: {
      type: String,
      required: false,
    },
    empty: {
      type: Boolean,
      required: true,
    },
    focused: {
      type: Boolean,
      required: true,
    },
    invalid: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const fieldClasses = computed(() => ({
      "field--empty": props.empty,
      "field--focused": props.focused,
      "field--invalid": props.invalid,
      "field--disabled": props.disabled,
    }));

    return {
      fieldClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/tokens";
@import "../scss/typography";
@import "../scss/mixins";

.field-wrapper {
  display: grid;
}

.field {
  background-color: transparent;
  border-radius: var(--border-radius-md);
  border: var(--border-xs) solid var(--color-key-quaternary);
  padding: calc(var(--space-sm) - var(--border-xs)) var(--space-xs)
    calc(var(--space-sm) - var(--border-xs))
    calc(var(--space-md) - var(--border-xs));

  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: min-content auto min-content;

  @include transition-default(border-color);

  &:hover:not(&--disabled):not(&--invalid):not(&--focused) {
    border-color: var(--color-key-tertiary);
  }

  &--focused:not(&--disabled):not(&--invalid) {
    border-color: var(--color-primary);
  }

  &--invalid:not(&--disabled) {
    border-color: var(--color-error);
  }

  &--disabled {
    pointer-events: none;
    border-color: var(--color-background-disabled);
    background-color: var(--color-background-disabled);
  }

  &__prefix {
    justify-self: flex-start;

    &:not(&:empty) {
      margin-right: var(--space-xs);
    }
  }

  &__content {
    position: relative;
  }

  &__infix {
    display: flex;
  }

  &--empty:not(&--focused) &__label ~ &__infix {
    opacity: 0;
  }

  &__suffix {
    justify-self: flex-end;

    &:not(&:empty) {
      margin-left: var(--space-xs);
      padding-right: calc(var(--space-xxxs) - var(--border-xs));
    }
  }

  &__label {
    @include font-body();
    @include transition-fast(transform);

    position: absolute;
    transform: translate(0, 0);

    pointer-events: none;
    color: var(--color-key-secondary);
  }

  &--focused &__label,
  &:not(&--empty) &__label {
    @include font-caption-1();

    $x: calc(-1 * var(--space-xs));
    $y: calc(calc(-1 * var(--space-lg)) + var(--border-xs));
    transform: translate($x, $y);

    padding: 0 var(--space-xs);
    border-radius: var(--border-radius-md);

    background-color: var(--color-key-background);
  }

  &--focused:not(&--invalid) &__label,
  &:not(&--empty):not(&--invalid) &__label {
    color: var(--color-primary);
  }

  &--invalid &__label {
    color: var(--color-error);
  }

  &--disabled &__label {
    color: var(--color-key-primary);
  }
}

.error {
  @include text-overflow-ellipsis();
  @include font-caption-1();
  color: var(--color-error);

  &:not(&:empty) {
    margin-top: var(--space-xxxs);
  }
}

.hint {
  @include text-overflow-ellipsis();
  @include font-caption-1();
  color: var(--color-key-secondary);

  &:not(&:empty) {
    margin-top: var(--space-xxxs);
  }
}

//
// Media queries

@include breakpoint(md) {
  .field {
    &--focused &__label,
    &:not(&--empty) &__label {
      $x: calc(-1 * var(--space-xs));
      $y: calc(calc(-1 * var(--space-xl)) + var(--border-xs));
      transform: translate($x, $y);
    }
  }
}

@include breakpoint(xs) {
  .field {
    &--focused &__label,
    &:not(&--empty) &__label {
      $x: calc(-1 * var(--space-xs));
      $y: calc(calc(-1 * var(--space-xl)) - var(--border-xs));
      transform: translate($x, $y);
    }
  }
}
</style>
