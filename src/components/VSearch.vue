<template>
  <v-input v-model="inputValue" :label="i18n.t('search')">
    <template #suffix>
      <svg-icon class="icon" :icon="iconId" @click.stop="clearInput" />
    </template>

    <template #error>
      <slot name="error"></slot>
    </template>

    <template #hint>
      <slot name="hint"></slot>
    </template>
  </v-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VInput from "@/components/VInput.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "VSearch",

  components: { SvgIcon, VInput },

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
