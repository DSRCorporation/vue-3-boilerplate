<template>
  <v-field
    :label="label"
    :empty="isEmpty"
    :invalid="invalid"
    :focused="isFocused"
    :disabled="!!$attrs.disabled"
    :class="$attrs.class"
    @click="$refs.input.focus()"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>

    <template #infix>
      <input
        ref="input"
        class="input"
        v-bind="inputAttrs"
        :value="modelValue"
        @input="handleInput($event)"
        @focusin="handleFocusIn"
        @focusout="handleFocusOut"
      />
    </template>

    <template #suffix>
      <slot name="suffix" />
    </template>

    <template #error>
      <slot name="error" />
    </template>

    <template #hint>
      <slot name="hint" />
    </template>
  </v-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VField from "@/components/VField.vue";

export default defineComponent({
  name: "VInput",

  components: { VField },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    invalid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: {
    "update:modelValue": null,
  },

  data() {
    return {
      isFocused: false,
    };
  },

  computed: {
    inputAttrs() {
      return Object.keys(this.$attrs).reduce((acc, key) => {
        if (key === "class") return acc;

        return { ...acc, [key]: this.$attrs[key] };
      }, {});
    },

    isEmpty() {
      return !String(this.modelValue).trim();
    },
  },

  methods: {
    handleInput(event: InputEvent) {
      this.$emit(
        "update:modelValue",
        (event?.target as HTMLInputElement)?.value
      );
    },

    handleFocusIn() {
      this.isFocused = true;
    },

    handleFocusOut() {
      this.isFocused = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "src/scss/tokens";
@import "src/scss/typography";

.input {
  border: none;
  font-family: inherit;
  outline: none;
  width: 100%;

  @include font-body();

  color: var(--color-key-primary);
  background-color: transparent;

  &::placeholder {
    color: var(--color-key-secondary);
  }
}
</style>
