<template>
  <div>
    <div class="payment--container">
      <h4>Payment Breaksown</h4>
      <p>This is a full breakdown of your payments and timeline</p>
    </div>

    <div>
      <!-- Contribution graphs -->
      <div class="payment--graph">
        <div class="payment--graph__content">
          <div class="payment--graph__data">
            <span class="payment--graph__data-label contribution"
              >Your Contribution</span
            >
            <p>
              #8531,150
              <span class="payment--graph__data-percent">(25%)</span>
            </p>
          </div>
          <div class="payment--graph__data">
            <span class="payment--graph__data-label asset"
              >Total Asset Amount</span
            >
            <p>#1,108,200</p>
          </div>
        </div>
        <div class="payment--graph__content">
          <Doughnut :data="chartConfig.data" :options="chartConfig.options" />
        </div>
      </div>

      <!-- Total repayment breakdown -->
      <div class="payment--repayment">
        <div class="payment--breakdown">
          <div class="payment--breakdown__content">
            <span>Total Repayment</span>
            <p>#2,841,150</p>
          </div>

          <div class="payment--breakdown__content">
            <span>Duration</span>
            <p>12 months</p>
          </div>
        </div>

        <div class="payment--expected">
          <div>You'll be expected to pay <span>*</span> monthly</div>
          <p>#69,263</p>
        </div>
      </div>

      <!-- installable hardwares -->
      <div class="payment--hardwares">
        <div class="payment--header">
          <h4>Hardware to be installed</h4>
          <p>1/12</p>
        </div>
        <div class="payment--hardware">
          <div class="payment--hardware__img">
            <img src="@/assets/img/illustrations/panel.svg" alt="" />
          </div>
          <div class="payment--hardware__content">
            <h4>Solar Panels (24" x 60")</h4>
            <p>Qty: 4</p>
          </div>
        </div>
      </div>

      <!-- button -->
      <div class="payment--button">
        <BaseButton buttonText="Proceed" @button-clicked="goToNextSection" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import * as chartConfig from "@/composables/chartConfig";
import { defineEmits } from "vue";

ChartJs.register(ArcElement, Tooltip, Legend);

const emit = defineEmits(["next-section"]);

const goToNextSection = () => {
  emit("next-section");
};
</script>
