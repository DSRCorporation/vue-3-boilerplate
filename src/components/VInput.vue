<template>
  <label>
    {{ label }}
    <input
      class="input"
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({ props: { label: String, modelValue: String, type: String } })
export default class VInput extends Vue {}
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
