<template>
  <div class="signup">
    <div class="signup--illustration">
      <img src="@/assets/img/illustrations/auth.svg" alt="" />

      <!-- logo -->
      <AppLogo />
    </div>

    <div class="signup--intro">
      <div class="signup--intro__context">
        <h2>The One stop solar & inverter lease platform</h2>
        <p>Lets power you into your dream</p>
      </div>
      <BaseButton
        buttonText="Create an account"
        @button-clicked="registerRoute"
      />
      <SecondButton buttonText="Login instead" @button-clicked="loginRoute" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import AppLogo from "@/components/ui/AppLogo.vue";
import { useRouter } from "vue-router";

//Declare Vue Router
const router = useRouter();

//Go to login page
const loginRoute = () => {
  const redirectPath = "/login";
  router.push(redirectPath);
};

//Go to register page
const registerRoute = () => {
  const redirectPath = "/register";
  router.push(redirectPath);
};
</script>
<style lang="scss">
@import "@/styles/pages/Auth/auth";
</style>
