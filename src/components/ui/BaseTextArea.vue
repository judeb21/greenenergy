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
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[className ? className : '', 'base-input-text-area']"
        :id="id"
        :rows="rows"
        v-bind="$attrs"
        ref="textArea"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </div>
    <ErrorMessage :message="errors" v-if="errors" />
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  withDefaults,
  onMounted,
  onBeforeMount,
} from "vue";

const emit = defineEmits(["update:modelValue"]);

withDefaults(
  defineProps<{
    modelValue: string;
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
    modelValue: "",
  }
);

const textArea = ref();
</script>
<style lang="scss">
@import "@/styles/components/base-input-field.scss";
</style>
