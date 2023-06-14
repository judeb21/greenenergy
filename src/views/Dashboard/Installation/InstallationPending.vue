<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Installation</h4> -->

      <p class="dashboard--quote__process proces">
        <img src="@/assets/img/icons/pending-icon.svg" alt="" />
        An installation officer has been assigned to you
      </p>

      <!-- <p class="dashboard--quote__process payment">Pending Installation</p> -->
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

    <!-- Engineer -->
    <div class="engineer--container">
      <div class="engineer--container__header">
        <span>Engineer</span>
        <p>Date confirmed</p>
      </div>

      <div class="engineer--container__details">
        <!-- Engineer image and details -->
        <div class="engineer--container__fDetails">
          <div class="engineer--container__image">
            <img src="@/assets/img/engineer.svg" alt="engineer" />
          </div>

          <!-- Engineer Details -->
          <div class="engineer--container__rating">
            <!-- Name and rating -->
            <div class="engineer--container__detail">
              <p class="engineer--container__detail--name">Demola</p>
              <div class="engineer--container__ratings">
                <!-- star rating -->
                <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
                <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
                <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
                <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
                <img src="@/assets/img/icons/half-star-icon.svg" alt="" />
              </div>
            </div>

            <!-- Phone number -->
            <span class="engineer--container__call">+234 803 4000 1290</span>
          </div>
        </div>

        <!-- Call Engineer -->
        <div class="">
          <a href="tel:+23480340001290">
            <img src="@/assets/img/icons/call-icon.svg" alt="" />
          </a>
        </div>
      </div>

      <div class="engineer--container__date">
        <span>Date:</span>
        <p>30th April, 2023 (in 2 days)</p>
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
      <BaseButton buttonText="Confirm Installation" />
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
