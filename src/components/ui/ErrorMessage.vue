<template>
  <div class="error__container" :class="errorContainerClass">
    <span class="error__message" :class="errorLabelClass"
      ><b>{{ message }}</b></span
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorMessage",

  props: {
    message: { default: "", type: String },
    errorLabelClass: { default: "", type: String },
    errorContainerClass: { default: "", type: String },
  },
});
</script>
<style lang="scss">
@import "src/styles/components/error-message";
</style>
