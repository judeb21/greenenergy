<template>
  <div class="app--body">
    <TopNav />

    <div class="app--content">
      <ContentView />
    </div>

    <div class="mobile--nav">
      <div @click="goHome">
        <img src="@/assets/img/icons/home-menu-icon.svg" alt="" />
      </div>
      <div class="mobile--nav__add" @click="createQuote">
        <img src="@/assets/img/icons/add-icon.svg" alt="" />
      </div>
      <div class="mobile--nav__avatar" @click="goToProfile">
        <img src="@/assets/img/avatar.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TopNav from "@/components/ui/TopNav.vue";
import ContentView from "@/views/Dashboard/ContentView.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  const redirect = "/dashboard";
  router.push(redirect);
};

const createQuote = () => {
  const redirect = "/start-quote";
  router.push(redirect);
};

const goToProfile = () => {
  const redirect = "/settings";
  router.push(redirect);
};
</script>

<style lang="scss">
@import "@/styles/pages/Layout/app.scss";
</style>
