<template>
  <div class="toggle-container">
    <label class="toggle-wrapper">
      <input
        type="radio"
        class="toggle"
        v-bind="$attrs"
        :value="value"
        :checked="isChecked"
        @change="$emit('update:modelValue', $event.target.value)"
      />
      <span>
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VRadio",
  inheritAttrs: false,
  emits: {
    "update:modelValue": null,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.value === this.modelValue;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./toggle";

@function radioMarkTransform($scale) {
  @return translate(-50%, 50%) scale($scale);
}

input {
  border-radius: 50%;
  left: calculateRippleLeftPos($radio-size);

  // checked
  &:checked {
    background-color: var(--color-primary);

    & + span:before {
      border-color: var(--color-primary);
    }

    & + span:after {
      transform: radioMarkTransform(1);
    }
  }

  // disabled
  &:disabled {
    & + span {
      cursor: initial;

      &:before {
        border-color: var(--color-background-color-primary);
      }

      &:after {
        background-color: var(--color-background-color-primary-dark);
      }
    }

    &:checked + span:before {
      border-color: var(--color-background-primary-dark);
    }
  }
}

span {
  align-items: center;
  display: inline-flex;
  width: 100%;
  cursor: pointer;

  // circle
  &:before {
    content: "";
    display: inline-flex;
    box-sizing: border-box;
    margin-right: var(--space-md);
    border-width: $checkbox-border-width;
    border-style: solid;
    border-color: var(--color-key-primary);
    border-radius: 50%;
    width: $radio-size;
    height: $radio-size;
    @include transition-default(border-color);
  }

  // check
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: calc(#{$radio-size} / 2);
    border-radius: 50%;
    width: calc(#{$radio-size} / 2);
    height: calc(#{$radio-size} / 2);
    background-color: var(--color-primary);
    transform: radioMarkTransform(0);
    @include transition-default(transform);
  }
}
</style>
