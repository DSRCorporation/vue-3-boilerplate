<template>
  <div class="toggle-container">
    <label class="toggle-wrapper">
      <input
        type="checkbox"
        class="toggle"
        v-bind="$attrs"
        :checked="isChecked"
        @change="$emit('update:modelValue', $event.target.checked)"
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
  name: "VCheckbox",
  inheritAttrs: false,
  emits: {
    "update:modelValue": null,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.modelValue;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./toggle";

input {
  border-radius: var(--border-radius-md);
  left: calculateRippleLeftPos($checkbox-size);

  // checked, indeterminate
  &:checked,
  &:indeterminate {
    background-color: var(--primary-color);

    & + span:before {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
    }

    & + span:after {
      border-color: var(--background-light-color);
    }
  }

  &:indeterminate + span:after {
    border-left: none;
    transform: translate(4px, 3px);
  }

  // active
  &:active:checked + span:before {
    border-color: transparent;
    background-color: var(--primary-color);
  }

  // disabled
  &:disabled {
    & + span {
      cursor: initial;

      &:before {
        border-color: var(--background-key-primary-dark);
      }
    }

    &:checked,
    &:indeterminate {
      & + span:before {
        background-color: var(--background-primary-dark);
        border-color: transparent;
      }
    }
  }
}

span {
  align-items: center;
  display: flex;
  width: 100%;
  cursor: pointer;

  // box
  &:before {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-right: var(--space-lg);
    border-width: $checkbox-border-width;
    border-style: solid;
    border-color: var(--color-key-primary);
    border-radius: $checkbox-radius;
    width: $checkbox-size;
    height: $checkbox-size;
    @include transition-default(border-color, background-color);
  }

  // checkmark
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 0;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
  }
}
</style>
