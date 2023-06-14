<template>
  <div class="layout--container">
    <!-- Layout header -->
    <div class="layout--header">
      <BackButton @button-clicked="goBack" />

      <p class="layout--header__text">{{ pageTitle }}</p>
    </div>

    <!-- Layout content -->
    <div class="layout--content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BackButton from "@/components/ui/BackButton.vue";
// import ContentView from "@/views/Dashboard/ContentView.vue";

export default defineComponent({
  name: "PasswordLayout",

  props: {
    pageTitle: { default: "Reset password", type: String },
  },

  components: {
    BackButton,
    // ContentView,
  },

  methods: {
    goBack() {
      // this.$emit("go-back");
      this.$router.back();
    },
  },
});
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
</style>
