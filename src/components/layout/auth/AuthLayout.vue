<template>
  <div class="login--container">
    <!-- Layout header -->
    <div class="login--header">
      <BackButton @button-clicked="goBack" />

      <AppLogo />
    </div>

    <!-- Layout content -->
    <div class="login--content">
      <ContentView />
    </div>

    <!-- Layout Footer -->
    <div class="login--footer">
      <img src="@/assets/img/illustrations/setup.svg" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AppLogo from "@/components/ui/AppLogo.vue";
import BackButton from "@/components/ui/BackButton.vue";
import ContentView from "@/views/Dashboard/ContentView.vue";
// import { useRouter } from "vue-router";

//Declare Vue Router
// const router = useRouter();

export default defineComponent({
  name: "AuthLayout",

  components: {
    AppLogo,
    BackButton,
    ContentView,
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
@import "@/styles/pages/Auth/login";
</style>
