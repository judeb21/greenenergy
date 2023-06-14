<template>
  <div class="base-input-field-container">
    <div
      :class="
        overRideInputContainerClass
          ? inputContainerClass
          : 'textfield-input-container'
      "
    >
      <label :for="id" :class="labelClass ? labelClass : 'textfield-label'">{{
        labelText
      }}</label>
      <input
        class="textfield-input"
        ref="input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        @keyup.delete="$emit('delete-or-backspace-key-pressed')"
        :class="className"
        :readonly="readOnly"
        :minlength="minLength"
        :min="min"
        :max="max"
        :maxlength="maxLength"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        :id="id"
        v-bind="$attrs"
      />
    </div>
    <ErrorMessage :message="errors" v-if="errors" />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, withDefaults } from "vue";

const input = ref<HTMLInputElement | null>(null);

defineEmits(["update:modelValue", "delete-or-backspace-key-pressed"]);

withDefaults(
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
  }
);
</script>
<style lang="scss">
@import "@/styles/components/base-input-field.scss";
</style>
