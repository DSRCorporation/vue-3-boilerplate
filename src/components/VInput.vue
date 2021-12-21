<template>
  <label>
    {{ label }}
    <input
      class="input"
      :value="modelValue"
      :type="type"
      :name="name"
      @input="onInput($event)"
    />
    {{ this.errorMessage || serverError }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
  name: "VInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    serverError: {
      type: String,
    },
  },
  setup(props) {
    const { handleChange, errorMessage } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      label: props.label,
    });
    return {
      handleChange,
      errorMessage,
    };
  },
  methods: {
    onInput($event: Event) {
      this.$emit(
        "update:modelValue",
        ($event.target as HTMLInputElement).value
      );
      this.handleChange($event);
    },
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

label {
  color: $textColor;
}

.input {
  height: $gridNormal * 2;
  background: transparent;
  width: calc(100% - #{$gridSmall});
  border: $borderSmall solid $borderColor;
  text-align: center;
  padding: 0 4px;
  color: $textColor;
  @include text-normal;
}
</style>
