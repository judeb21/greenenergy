<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Your quotation status is</h4> -->

      <p class="dashboard--quote__process change">
        <img src="@/assets/img/icons/changed-icon.svg" alt="" />
        Your quote request has been changed
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
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/house-icon.svg" alt="" />
        Bungalow
      </p>
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/details-icon.svg" alt="" />
        <span class="dashboard--quote__det">4 Rooms</span>
        <span class="dashboard--quote__det">24 Bulbs</span>
        <span class="dashboard--quote__det">6 Fans</span>
        <span class="dashboard--quote__det">2 TVs</span>
      </p>
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

    <!-- Quotation Button -->
    <div class="dashboard--quote__button-container">
      <SecondButton buttonText="More" @button-clicked="toggleMoreModal" />
      <BaseButton buttonText="Edit" />
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
