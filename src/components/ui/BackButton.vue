<template>
  <div class="app-back-btn" v-bind="$attrs" @click.prevent="handleClick">
    <img src="@/assets/img/icons/back-icon.svg" alt="" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackButton",

  data() {
    return {
      $inheritAttrs: false,
    };
  },

  methods: {
    handleClick() {
      this.$emit("button-clicked");
    },
  },
});
</script>
<style lang="scss">
@import "@/styles/components/back-button";
</style>
