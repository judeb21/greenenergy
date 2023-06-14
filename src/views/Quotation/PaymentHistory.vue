<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="quote--container">
      <div class="quote--summary">
        <h4 class="quote--summary__heading">Transactions</h4>

        <div class="quote--summary__context quote--summary__context-contain">
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-title">You made a payment</p>
            <img
              class="quote--summary__context-img"
              src="@/assets/img/icons/credit-icon.svg"
              alt=""
            />
          </div>
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-type success">Successful</p>
            <p class="quote--summary__context-amount success">+#831,150</p>
          </div>
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-date">14th March, 2023</p>
            <p class="quote--summary__context-description">
              Equally Contribution
            </p>
          </div>
        </div>

        <div class="quote--summary__context quote--summary__context-contain">
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-title">You made a payment</p>
            <img
              class="quote--summary__context-img"
              src="@/assets/img/icons/credit-icon.svg"
              alt=""
            />
          </div>
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-type fail">Failed</p>
            <p class="quote--summary__context-amount success">+#831,150</p>
          </div>
          <div class="quote--summary__context-container">
            <p class="quote--summary__context-date">14th March, 2023</p>
            <p class="quote--summary__context-description">
              Equally Contribution
            </p>
          </div>
        </div>
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitle = ref("Payment History");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Quotation/quote";
</style>
