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

    {{ validator.errorMessage }}
  </label>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useField } from "vee-validate";

@Options({
  props: { label: String, modelValue: String, type: String, name: String }
})
export default class VInput extends Vue {
  //todo types for $props?
  /*eslint-disable*/
  // @ts-ignore
  validator = setup(() => useField(this.$props.name, undefined, {
    // @ts-ignore
    initialValue: this.$props.modelValue,
    // @ts-ignore
    label: this.$props.label
  }))

  /*eslint-enable*/

  onInput($event: Event) {
    this.$emit("update:modelValue", ($event.target as HTMLInputElement).value);
    this.validator.handleChange($event);
  }
}
</script>

<style scoped lang="scss">
label {
  color: #ffffff;
}

.input {
  height: 24px;
  background: transparent;
  width: calc(100% - 8px);
  border: 1px solid #a383a5;
  text-align: center;
  padding: 0 4px;
  color: #ffffff;
  font-size: 14px;
}
</style>
