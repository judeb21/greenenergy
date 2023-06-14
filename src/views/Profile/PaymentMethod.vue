<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--payment__empty" v-show="false">
      <div class="profile--payment__empty-body">
        <img src="@/assets/img/illustrations/empty-card.svg" alt="" />
        <h4>No card added yet</h4>
        <p>Add a credit card now to perform transctions</p>
      </div>
      <div class="profile--payment__empty-button">
        <BaseButton
          buttonText="Add a new card"
          @button-clicked="addPaymentMethod"
        />
      </div>
    </div>

    <div class="profile--payment">
      <div class="profile--payment__container">
        <div class="profile--payment__card">
          <div class="profile--payment__card-image">
            <img src="@/assets/img/illustrations/visa.svg" alt="" />
          </div>
          <div class="profile--payment__card-details">
            <p>Visa: <b>**3851</b></p>
            <p>Expires: <b>02/24</b></p>
          </div>
        </div>
        <div class="profile--payment__action">
          <img src="@/assets/img/icons/delete-icon.svg" alt="" />
          <img src="@/assets/img/icons/edit_icon.svg" alt="" />
        </div>
      </div>

      <div class="profile--payment__container">
        <div class="profile--payment__card">
          <div class="profile--payment__card-image">
            <img src="@/assets/img/illustrations/mastercard.svg" alt="" />
          </div>
          <div class="profile--payment__card-details">
            <p>Visa: <b>**3851</b></p>
            <p>Expires: <b>02/24</b></p>
          </div>
        </div>
        <div class="profile--payment__action">
          <img src="@/assets/img/icons/delete-icon.svg" alt="" />
          <img src="@/assets/img/icons/edit_icon.svg" alt="" />
        </div>
      </div>

      <div class="profile--payment__empty-button">
        <BaseButton
          buttonText="Add a new card"
          @button-clicked="addPaymentMethod"
        />
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const pageTitle = "Payment Methods";
const router = useRouter();

const addPaymentMethod = () => {
  const redirect = "/add-payment";
  router.push(redirect);
};
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
</style>
