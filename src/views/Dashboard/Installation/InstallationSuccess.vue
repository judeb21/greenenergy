<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Installation</h4> -->

      <!-- <p class="dashboard--quote__process payment">Payment made</p> -->
      <p class="dashboard--quote__process ready">
        <img src="@/assets/img/icons/ready-icon.svg" alt="" />
        Installation successful
      </p>
    </div>

    <!-- Repayment -->
    <div class="installation--repayment">
      <div class="installation--repayment__header">
        <p>Next Repayment</p>
        <span>In 30 days</span>
      </div>

      <div class="installation--repayment__content">
        <div class="contribution--details__info">
          <img src="@/assets/img/icons/contribution-icon.svg" alt="" />
          <span>#66,150</span>
        </div>

        <div class="installation--repayment__content-bal">
          <p>Bal: <span>#866,150</span></p>
        </div>
      </div>
    </div>

    <!-- Issues -->
    <div class="installation__issues--container">
      <!-- No active Issues -->
      <div class="installation__issues--default">
        <div class="installation__issues--default--no">
          <img src="@/assets/img/icons/no-issues-icon.svg" alt="" />
        </div>
        <div class="installation__issues--details">
          <h4>Zero (0) Issues posted</h4>
          <p>If you have any issues with your system, please notify us.</p>
        </div>
      </div>

      <!-- Active issues -->
      <div class="installation__issues--active">
        <div class="installation__issues--active--yes">
          <img src="@/assets/img/icons/active-issues-icon.svg" alt="" />
        </div>
        <div class="installation__issues--details">
          <h4>Two (2) Issues posted</h4>
          <p>You active issues, view now to see more details</p>
        </div>
      </div>
    </div>

    <!-- Quotation Button -->
    <div class="dashboard--quote__button-container">
      <SecondButton buttonText="More" @button-clicked="toggleMoreModal" />
      <BaseButton buttonText="View Issues" />
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
