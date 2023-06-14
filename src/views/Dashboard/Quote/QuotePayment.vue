<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Your quotation status is</h4> -->

      <p class="dashboard--quote__process payment">
        <img src="@/assets/img/icons/payments-icon.svg" alt="" />
        Your payment for service has been recieved
      </p>
    </div>

    <div class="dashboard--quote__details">
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/date-icon.svg" alt="" />
        13th April, 2023
      </p>
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/location-icon.svg" alt="" />
        67, Ebenezer Akintuni Street
      </p>
    </div>

    <!-- Payment Details -->
    <div class="dashboard--payments">
      <div class="dashboard--payments__content">
        <p>Payment Status</p>
        <span class="success-color">Paid</span>
      </div>
      <div class="dashboard--payments__content">
        <p>Amount paid</p>
        <span>#831,150</span>
      </div>
      <div class="dashboard--payments__content">
        <p>Percentage</p>
        <span>25%</span>
      </div>
      <div class="dashboard--payments__content">
        <p>Total Asset Amount</p>
        <span>#1,108,200</span>
      </div>
      <div class="dashboard--payments__content">
        <p>Repayment amount</p>
        <span>#2,831,150</span>
      </div>
      <div class="dashboard--payments__content">
        <p>Duration</p>
        <span>12 Months</span>
      </div>
    </div>

    <!-- hardwares installed -->
    <div class="dashboard--hardwares">
      <h5 class="dashboard--hardwares__header">Hardwares to be installed</h5>
      <p class="dashboard--hardwares__subheader">
        4 solar panels, 2 24OAh Batteries, 18KW inverter, Surge protector and
        more.
      </p>
      <div class="app--notice">
        <img
          class="app--notice__image"
          src="@/assets/img/icons/info-icon.svg"
          alt=""
        />
        <div class="app--notice__text">
          <p>These devices comes with a 24 months warranty</p>
        </div>
      </div>
    </div>

    <!-- Quotation Button -->
    <div class="dashboard--quote__button-container">
      <SecondButton buttonText="More" @button-clicked="toggleMoreModal" />
      <BaseButton buttonText="Full Info" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";

let isOpen = ref(false);

const emit = defineEmits(["toggle-modal"]);

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};
</script>
