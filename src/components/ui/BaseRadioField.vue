<template>
  <label :for="id" :class="labelClass ? labelClass : ''">
    <input
      class=""
      ref="input"
      type="radio"
      :value="value"
      :checked="checked"
      :required="required"
      :class="className"
      :readonly="readOnly"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      v-bind="$attrs"
    />
    {{ labelText }}
  </label>
</template>

<script setup lang="ts">
import {
  defineComponent,
  defineEmits,
  withDefaults,
  defineProps,
  computed,
} from "vue";

defineEmits(["update:modelValue"]);

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    errors?: string;
    id?: string;
    required?: boolean;
    className?: string;
    overRideInputContainerClass?: boolean;
    inputContainerClass?: string;
    minLength?: string;
    min?: number;
    max?: number;
    maxLength?: string;
    labelClass?: string;
    labelText: string;
    overRideErrorMessageClass?: boolean;
    overRideContainerClass?: boolean;
    errorMessageClass?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    value?: string;
  }>(),
  {
    type: "",
    errors: "",
    className: "",
    id: "",
    placeholder: "",
    inputContainerClass: "",
    minLength: "",
    maxLength: "",
    labelClass: "",
    labelText: "",
    errorMessageClass: "",
    autoFocus: false,
    overRideContainerClass: false,
    overRideErrorMessageClass: false,
    overRideInputContainerClass: false,
    required: false,
    disabled: false,
    min: 100,
    max: 100,
    readOnly: false,
    modelValue: "",
    value: undefined,
  }
);

const checked = computed(() => {
  return props.modelValue === props.value;
});
</script>
<style lang="scss">
@import "@/styles/components/base-radio-field.scss";
</style>
