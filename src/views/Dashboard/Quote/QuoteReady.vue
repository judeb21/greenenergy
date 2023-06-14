<template>
  <div class="dashboard--quote">
    <div class="dashboard--quote__head">
      <!-- <h4 class="dashboard--quote__head-text">Your quotation status is</h4> -->

      <p class="dashboard--quote__process ready">
        <img src="@/assets/img/icons/ready-icon.svg" alt="" />
        Your quote request is ready
      </p>
    </div>

    <div class="dashboard--quote__details">
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/date-icon.svg" alt="" />
        {{ creationDate }}
      </p>
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/location-icon.svg" alt="" />
        {{ address }}
      </p>
    </div>

    <!-- Contribution graphs -->
    <div class="dashboard--graph">
      <div class="dashboard--graph__content f-55">
        <div class="dashboard--graph__data">
          <span class="dashboard--graph__data-label contribution"
            >Your Initial Payment</span
          >
          <p>
            {{ formatCurrency(quote.yourContribution) }}
            <span class="dashboard--graph__data-percent"
              >({{ quote.contributionPercentage }}%)</span
            >
          </p>
        </div>
        <div class="dashboard--graph__data">
          <span class="dashboard--graph__data-label asset"
            >Total Inverter Amount</span
          >
          <p>{{ formatCurrency(quote.totalAssetAmount) }}</p>
        </div>
      </div>
      <div class="dashboard--graph__content">
        <Doughnut :data="configData" :options="chartConfig.options" />
      </div>
    </div>

    <!-- Repayments -->
    <div class="dashboard--repayments">
      <p class="dashboard--repayment">
        <span class="dashboard--repayment__text">Repayment amount</span>
        <span class="dashboard--repayment__amount">{{
          formatCurrency(quote.repaymentAmount)
        }}</span>
      </p>
      <p class="dashboard--repayment">
        <span class="dashboard--repayment__text">Duration</span>
        <span class="dashboard--repayment__amount"
          >{{ quote.durationMonths }} Months</span
        >
      </p>
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
      <!-- <BaseButton buttonText="Pay Now" @button-clicked="makePayment" /> -->

      <!-- Paystack Payment Trigger -->
      <AppPayment
        @payment-successful="handleSuccessfulPayment"
        @payment-cancelled="handleCancelledPayment"
      />
    </div>

    <!-- Paystack Payment -->
    <!-- <AppPayment
      v-if="showPaymentModal"
      @payment-successful="handleSuccessfulPayment"
      @payment-cancelled="handleCancelledPayment"
    /> -->
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import * as chartConfig from "@/composables/chartConfig";
import { Quote, QuoteRequest } from "../types";
import dayjs from "dayjs";
import { BuildingTypeEnum } from "@/views/Quote/types";
import currencyFormatter from "@/composables/currencyFormat";
import AppPayment from "@/components/ui/AppPayment.vue";
import { PaystackPaymentResponse } from "@/types";

ChartJs.register(ArcElement, Tooltip, Legend);

let isOpen = ref(false);
let showPaymentModal = ref(false);

const props = defineProps<{
  quoteRequest: QuoteRequest;
  quote: Quote;
  loading: boolean;
  defaultDate: string;
}>();

const { formatCurrency } = currencyFormatter();

const address = computed(() => props?.quoteRequest?.address);
const creationDate = computed(() =>
  dayjs(props?.quoteRequest?.dateCreated).format("MMMM D, YYYY")
);
const buldingType = computed(
  () => Object.values(BuildingTypeEnum)[props?.quoteRequest?.buildingType]
);

const configData = computed(() => {
  return {
    datasets: [
      {
        backgroundColor: ["#FDE047", "#38BDF8"],
        data: [props.quote.yourContribution, props.quote.totalAssetAmount],
      },
    ],
  };
});

const makePayment = () => {
  showPaymentModal.value = true;
};

const emit = defineEmits(["toggle-modal"]);

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};

const handleSuccessfulPayment = (response: PaystackPaymentResponse) => {
  console.log(response);
};
</script>
