<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="componentList[activeComponentIndex]"
        :activeComponentIndex="activeComponentIndex"
        @next-section="goToNextSection"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import PaymentBreakdown from "@/views/Payment/PaymentBreakdown.vue";
import InstallationProcess from "@/views/Payment/InstallationProcess.vue";
import PaymentTerms from "@/views/Payment/PaymentTerms.vue";
import { useRouter } from "vue-router";

//Declare Vue Router
const router = useRouter();

const { activeComponentIndex, handleNextSection, handlePreviousSection } =
  DynamicComponentComposable();

const componentList: Array<object> = [
  PaymentBreakdown,
  InstallationProcess,
  PaymentTerms,
];

const goToNextSection = () => {
  handleNextSection();
};

const handlePrevSection = () => {
  handlePreviousSection();
};

const goBack = () => {
  handlePreviousSection();
  if (activeComponentIndex.value === 0) return router.back();
};
</script>
<style lang="scss">
@import "@/styles/pages/Payment/payment";
</style>
