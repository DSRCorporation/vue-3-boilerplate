<template>
  <v-input :type="inputType" v-model="inputValue" :label="i18n.t('password')">
    <template #suffix>
      <wc-svg-icon
        class="icon"
        href="/icons.svg"
        :symbol="iconId"
        @click.stop="toggleVisibility"
      ></wc-svg-icon>
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
import "@dmitryrazinkov/svg-icon";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "VPassword",

  components: { VInput },

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
