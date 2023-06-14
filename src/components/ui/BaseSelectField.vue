<template>
  <div
    :class="
      overRideContainerClass
        ? inputContainerClass
        : 'base--select__select-container'
    "
  >
    <label :for="id" :class="labelClass ? labelClass : 'textfield-label'">
      <span class="d-flex">
        {{ labelText }}
      </span>
    </label>
    <select
      @change="
        emitEventObject
          ? $emit('update:modelValue', $event)
          : $emit('update:modelValue', $event.target.value)
      "
      class="base--select__select-input"
      :class="className"
      :disabled="disabled"
      v-model="selected"
      @focus="$emit('focus', $event)"
      :id="id"
      :placeholder="placeholder"
    >
      <option
        value=""
        selected
        :disabled="disableDefaultOption"
        v-if="defaultOptionTextWasSupplied"
      >
        {{ defaultOptionText }}
      </option>
      <option v-else value="" disabled>--Please choose an option--</option>
      <slot name="first-option"></slot>
      <option
        v-for="(option, index) in options"
        :key="option[keyProperty] || index"
        :value="option[valueProperty] || option"
      >
        <span>{{ option[textProperty] || option }}</span>
      </option>
    </select>

    <ErrorMessage :message="errors" v-if="errors" />
  </div>
</template>

<script setup lang="ts">
import { SelectOptions } from "@/types";
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  withDefaults,
  computed,
} from "vue";

const input = ref<HTMLInputElement | null>(null);

defineEmits(["update:modelValue", "focus"]);

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
    labelClass?: string;
    labelText: string;
    overRideErrorMessageClass?: boolean;
    overRideContainerClass?: boolean;
    errorMessageClass?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    options: Array<SelectOptions>;
    optionsKey: string;
    defaultOptionText: string;
    keyProperty: string;
    textProperty: string;
    valueProperty: string;
    emitEventObject: boolean;
    disableDefaultOption: boolean;
    value: string;
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
    // options: [] as Array<SelectOptions>,
    optionsKey: "",
    defaultOptionText: "",
    keyProperty: "",
    textProperty: "",
    valueProperty: "",
    emitEventObject: false,
    disableDefaultOption: false,
    value: "",
  }
);

// get selected() {
//   return this.value;
// }

// set selected(newValue) {
//   this.$emit("change", newValue);
// }

const defaultOptionTextWasSupplied = computed(
  () => props.defaultOptionText.length > 0
);
</script>

<style lang="scss">
@import "@/styles/components/base-select-field.scss";
</style>
