<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="componentList[props.installationActiveComponentIndex]"
        :activeComponentIndex="props.installationActiveComponentIndex"
        @toggle-modal="toggleMoreModal"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import InstallationDefault from "./Installation/InstallationDefault.vue";
import InstallationPending from "./Installation/InstallationPending.vue";
import InstallationSuccess from "./Installation/InstallationSuccess.vue";

const { activeComponentIndex } = DynamicComponentComposable();

const componentList: Array<object> = [
  InstallationDefault,
  InstallationPending,
  InstallationSuccess,
];

const props = defineProps(["installationActiveComponentIndex"]);

let isOpen = ref(false);

const emit = defineEmits(["toggle-modal"]);

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};
</script>
<style lang="scss">
@import "@/styles/pages/Dashboard/Dashboard.scss";
@import "@/styles/pages/Quote/quote.scss";
</style>
