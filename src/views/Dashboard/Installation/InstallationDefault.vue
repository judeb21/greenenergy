<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Installation</h4>

      <p class="dashboard--quote__process payment">Payment made</p> -->
      <p class="dashboard--quote__process payment">
        <img src="@/assets/img/icons/payments-icon.svg" alt="" />
        Your payment for service has been recieved
      </p>
    </div>

    <div class="dashboard--installation__details">
      <div
        class="dashboard--installation__details-container contribution--details"
      >
        <h4>Contribution Paid</h4>
        <div class="contribution--details__info">
          <img src="@/assets/img/icons/contribution-icon.svg" alt="" />
          <span>#831,150</span>
        </div>
      </div>

      <div class="dashboard--installation__details-container asset--details">
        <h4>Total Asset Amount</h4>
        <div class="contribution--details__info">
          <img src="@/assets/img/icons/asset-icon.svg" alt="" />
          <span>#831,150</span>
        </div>
      </div>
    </div>

    <!-- Turnaround Time -->
    <div class="dashboard--turnaround">
      <h4 class="dashboard--turnaround__header">
        You will receive your quote in
      </h4>
      <p class="dashboard--turnaround__countdown">
        <span class="primary-blue">48</span>H:
        <span class="primary-blue">30</span>M:
        <span class="primary-blue">00</span>S
      </p>
      <div class="dashboard--notice">
        <div class="app--notice">
          <img
            class="app--notice__image"
            src="@/assets/img/icons/support-icon.svg"
            alt=""
          />
          <div class="app--notice__text">
            <p>
              You should get a proper quotation response on or before this time
            </p>
          </div>
        </div>
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
