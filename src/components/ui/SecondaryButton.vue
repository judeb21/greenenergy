<template>
  <button
    :class="[
      overRideButtonClass ? '' : 'app-secondary-btn',
      `${className} form-control`,
    ]"
    @click.prevent="handleClick"
    :disabled="buttonIsDisabled"
    v-bind="$attrs"
  >
    <slot></slot>
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { Status } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SecondaryButton",
  props: {
    disabled: { default: false, type: Boolean },
    buttonText: { default: "", type: String },
    status: { default: "NORMAL", type: String },
    className: { default: "", type: String },
    overRideButtonClass: { default: false, type: Boolean },
  },

  data() {
    return {
      $inheritAttrs: false,
    };
  },

  computed: {
    loadingState(): string {
      return Status.LOADING;
    },

    buttonIsDisabled(): boolean {
      return this.disabled || this.status === Status.LOADING;
    },
  },

  methods: {
    handleClick() {
      this.$emit("button-clicked");
    },
  },
});
</script>

<style lang="scss">
@import "src/styles/components/secondary-button";
</style>
