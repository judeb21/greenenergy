<template>
  <div class="base--alert base--alert__error">
    <div class="base--alert__img">
      <img src="@/assets/img/icons/alert-warning.svg" alt="" />
    </div>
    <div class="base--alert__description">
      <h4>
        {{ alertText }}
        <span> - Please try again or contact support</span>
      </h4>
    </div>
    <div class="base--alert__close" @click="closeAlert">
      <img src="@/assets/img/icons/close-icon.svg" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const otpProps = defineProps({
  alertText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close-alert"]);
const closeAlert = () => {
  emit("close-alert");
};
</script>
<style lang="scss">
@import "@/styles/components/base-alert.scss";
</style>
