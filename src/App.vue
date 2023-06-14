<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || "div";
});
</script>

<template>
  <component :is="layout" :key="$route.fullPath">
    <router-view />
  </component>
</template>
