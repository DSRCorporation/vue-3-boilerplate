<template>
  <div>
    <div class="input-container">
      <input
        class="input"
        :value="modelValue"
        :type="type"
        :name="name"
        :class="{ 'input--not-empty': !!modelValue }"
        @input="onInput($event)"
      />
      <label class="input-label" :for="name">{{ label }}</label>
    </div>
    <div class="error-container">
      {{ this.errorMessage || serverError }}
    </div>
  </div>
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

.input-container {
  position: relative;
  display: grid;
}

.input {
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background: none;
  border-style: solid;
  border-width: var(--border-xs);
  border-color: var(--border-color);
  border-radius: 4px;
  padding: var(--space-md) var(--space-sm);

  &:focus {
    border-color: var(--primary-color);

    & ~ .wc-input-label {
      color: var(--primary-color);
    }
  }

  &--not-empty ~ .input-label,
  &:focus ~ .input-label {
    top: 0;
    @include font-caption-1();
    background-color: var(
      --input-background-color,
      var(--background-light-color)
    );
  }
}

.input-label {
  transition: all 0.2s ease-out 0s;

  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--primary-color);
}
</style>
