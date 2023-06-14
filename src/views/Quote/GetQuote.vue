<template>
  <div class="get--quote">
    <h2 class="get--quote__header">Welcome, {{ storedUser.firstname }}</h2>
    <p class="get--quote__subheader">It's a bright day, isn't it?</p>

    <div class="get--quote__frame">
      <img src="@/assets/img/illustrations/frame.svg" alt="" />
    </div>

    <!-- Get quote modal -->
    <transition name="modal">
      <BaseModal v-if="showModal" @close="showModal = false">
        <template v-slot:body>
          <h2 class="get--quote-modal--header">
            Get started on your solar & inverter journey
          </h2>
          <p class="get--quote-modal--subheader">
            Request a quotation for your solar & inverter power needs
          </p>
        </template>

        <template v-slot:footer>
          <BaseButton
            class="modal--footer__button"
            @button-clicked="startQuote"
            buttonText="Get a Quote"
          />
        </template>
      </BaseModal>
    </transition>

    <!-- Loan default modal -->
    <transition name="modal">
      <BaseModal v-if="showError" @close="showError = false">
        <template v-slot:header>
          <img src="@/assets/img/illustrations/error.svg" alt="" />
        </template>

        <template v-slot:body>
          <p class="get--quote-modal--subheader">
            You have an outstanding loan at the moment, this feature will be
            unlocked once fully paid
          </p>
        </template>

        <template v-slot:footer>
          <p class="get--quote-modal--cancel" @click="showError = false">
            Okay
          </p>
        </template>
      </BaseModal>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let showModal = ref(false);
let showError = ref(false);

const router = useRouter();

const authStore = useAuthStore();
const storedUser = computed(() => authStore.state.storedUser);

const openModal = (): void => {
  setTimeout(() => {
    showModal.value = true;
  }, 200);
};

const startQuote = (): void => {
  const redirectPath = "/start-quote";
  router.push(redirectPath);
};

onMounted(() => {
  openModal();
});
</script>

<style lang="scss">
@import "@/styles/pages/Quote/get-quote.scss";
</style>
