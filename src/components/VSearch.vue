<template>
  <wc-input v-model="inputValue" :label="i18n.t('search')">
      <wc-svg-icon
          slot="suffix"
        class="icon"
        href="/icons.svg"
        :symbol="iconId"
        @click.stop="clearInput"
      ></wc-svg-icon>

    <slot name="error"></slot>

    <slot name="hint"></slot>
  </wc-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@dmitryrazinkov/svg-icon";
import "@dmitryrazinkov/input";
import "@dmitryrazinkov/error";
import "@dmitryrazinkov/hint";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "VSearch",

  props: {
    modelValue: {
      type: [String, Number],
      required: false,
    },
  },

  emits: {
    "update:modelValue": null,
  },

  setup() {
    const i18n = useI18n();

    return {
      i18n,
    };
  },

  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },

      set(value?: string | number) {
        this.$emit("update:modelValue", value);
      },
    },

    iconId(): string {
      return this.isEmpty ? "close" : "search";
    },

    isEmpty(): boolean {
      return !!this.modelValue;
    },
  },

  methods: {
    clearInput() {
      this.inputValue = undefined;
    },
  },
});
</script>

<style lang="scss" scoped></style>
