<template>
  <div class="app--accordion">
    <button
      class="app--accordion__head"
      @click="toggleAccordion"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >
      <slot name="title"></slot>

      <svg
        class="w-3 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
        fill="none"
        stroke="#96A3BE"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        aria-hidden="true"
      >
        <path
          d="M15 1.2l-7 7-7-7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <transition name="fade" mode="out-in">
        <slot name="content" />
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";

defineProps(["_uid"]);

let isOpen = ref(true);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style lang="scss">
@import "@/styles/components/app-accordion.scss";
</style>
