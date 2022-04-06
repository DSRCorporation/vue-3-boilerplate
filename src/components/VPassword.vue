<template>
  <wc-input :type="inputType" v-model="inputValue" :label="i18n.t('password')">
    <wc-svg-icon
        slot="suffix"
        class="icon"
        href="/icons.svg"
        :symbol="iconId"
        @click.stop="toggleVisibility"
    ></wc-svg-icon>

    <wc-error slot="error">
      <slot name="error"></slot>
    </wc-error>

    <wc-hint slot="hint">
      <slot name="hint"></slot>
    </wc-hint>
  </wc-input>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import "@dmitryrazinkov/svg-icon";
import "@dmitryrazinkov/input";
import "@dmitryrazinkov/error";
import "@dmitryrazinkov/hint";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "VPassword",

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

  data() {
    return {
      visible: false,
    };
  },

  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },

      set(value?: string | number | null) {
        this.$emit("update:modelValue", value);
      },
    },

    inputType(): "text" | "password" {
      return this.visible ? "text" : "password";
    },

    iconId(): string {
      return this.visible ? "visibility" : "visibility_off";
    },
  },

  methods: {
    toggleVisibility() {
      this.visible = !this.visible;
    },
  },
});
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
