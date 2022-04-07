<template>
  <v-popup ref="popup" :disabled="disabled">
    <template #reference>
      <v-input
        :label="label"
        :placeholder="placeholder"
        :invalid="invalid"
        :disabled="disabled"
        v-model="selectedValue"
        readonly
      >
        <template #suffix>
          <wc-svg-icon
            href="/icons.svg"
            symbol="arrow_drop_down"
            class="icon"
            :class="iconClasses"
          >
          </wc-svg-icon>
        </template>

        <template #error>
          <slot name="error" />
        </template>

        <template #hint>
          <slot name="hint" />
        </template>
      </v-input>
    </template>

    <template #content>
      <v-popup-content
        :style="{ width: $refs.popup.$refs.reference.clientWidth + 'px' }"
      >
        <ul class="options-list">
          <template v-for="option of options" :key="option.id">
            <slot name="option" v-bind="option" :select="select">
              <li class="option" @click="select(option.id)">
                {{ option.value }}
              </li>
            </slot>
          </template>
        </ul>
      </v-popup-content>
    </template>
  </v-popup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DropdownOption } from "./dropdown.types";
import "@dmitryrazinkov/svg-icon";
import VPopupContent from "@/components/popup/VPopupContent.vue";
import VPopup from "@/components/popup/VPopup.vue";

type ValueType = string | null;

export default defineComponent({
  name: "VDropdown",

  components: { VPopupContent, VPopup },

  props: {
    modelValue: {
      type: String as PropType<ValueType>,
      required: false,
    },
    options: {
      type: Array as PropType<Array<DropdownOption>>,
      required: false,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
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

  emits: {
    "update:modelValue": null,
  },

  computed: {
    iconClasses() {
      return {
        "icon--disabled": this.disabled,
      };
    },

    selectedValue() {
      return this.selectedOption?.value ?? "";
    },

    selectedOption() {
      if (!this.modelValue) return null;

      const option = this.options?.find(
        (option) => option.id === this.modelValue
      );
      if (!option) console.warn("No option with id:", this.modelValue);

      return option;
    },
  },

  methods: {
    select(id: string | null) {
      this.$emit("update:modelValue", id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/typography";
@import "../../scss/mixins";

.icon {
  cursor: pointer;

  &--disabled {
    cursor: default;
  }
}

.options-list {
  display: grid;
}

.option {
  @include text-overflow-ellipsis();
  @include transition-default(background-color);

  cursor: pointer;
  padding: var(--space-xs) var(--space-md);

  &:hover,
  &:focus {
    background-color: var(--color-background-primary);
  }

  &:active {
    background-color: var(--color-background-primary-dark);
  }
}
</style>
