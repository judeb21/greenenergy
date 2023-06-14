<template>
  <div class="base-check-field-container">
    <div
      :class="
        overRideInputContainerClass
          ? inputContainerClass
          : 'textfield-input-container'
      "
    >
      <input
        class="textfield-input--checkbox checkbox-effect"
        ref="input"
        type="checkbox"
        :value="value"
        :checked="modelValue"
        :required="required"
        :class="className"
        :readonly="readOnly"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
        :id="id"
        v-bind="$attrs"
      />
      <label :for="id" :class="labelClass ? labelClass : 'checkbox-label'">{{
        labelText
      }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed, defineEmits } from "vue";

defineEmits(["update:modelValue"]);

const props = withDefaults(
  defineProps<{
    modelValue: { type: [Array<any>, boolean] };
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    errors?: string;
    id?: string;
    required?: boolean;
    className?: string;
    overRideInputContainerClass?: boolean;
    inputContainerClass?: string;
    labelClass?: string;
    labelText: string;
    overRideErrorMessageClass?: boolean;
    overRideContainerClass?: boolean;
    errorMessageClass?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    value?: boolean | string;
  }>(),
  {
    type: "",
    errors: "",
    className: "",
    id: "",
    placeholder: "",
    inputContainerClass: "",
    labelClass: "",
    labelText: "",
    errorMessageClass: "",
    autoFocus: false,
    overRideContainerClass: false,
    overRideErrorMessageClass: false,
    overRideInputContainerClass: false,
    required: false,
    disabled: false,
    readOnly: false,
    modelValue: [] as any,
    value: undefined,
  }
);
</script>
<style lang="scss">
@import "@/styles/components/base-check-field";
</style>
