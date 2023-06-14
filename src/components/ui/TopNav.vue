<template>
  <div class="app--header">
    <!-- App logo -->
    <AppLogo />

    <!-- Notification -->
    <div class="app--header__notification">
      <div class="app--header__notif">
        <img src="@/assets/img/icons/notification-bell.svg" alt="" />
        <div class="app--header__notif-count">
          <img src="@/assets/img/icons/notification-icon.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppLogo from "@/components/ui/AppLogo.vue";
</script>
<style lang="scss">
@import "@/styles/components/topnav.scss";
</style>
