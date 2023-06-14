<template>
  <!-- Loading modal -->
  <BaseModal v-if="loading">
    <template v-slot:header>
      <img
        class="processing"
        src="@/assets/img/logos/spinner.gif"
        alt="spinner"
      />
    </template>
    <template v-slot:body>
      <p class="quote--modal--subheader">Loading...</p>
    </template>
    <template v-slot:footer>
      <p></p>
    </template>
  </BaseModal>

  <div class="dashboard" v-else>
    <div class="dashboard--head">
      <h2 class="dashboard--head__header">
        Welcome, {{ user.user.firstname }}
      </h2>
      <p class="dashboard--head__subheader">It's a bright day, isn't it?</p>
    </div>

    <div class="dashboard--request">
      <!-- Request tab -->
      <div class="dashboard--request__head">
        <h2>Your request</h2>
      </div>

      <div class="dashboard--request__tabs">
        <div
          :class="[
            getActiveTab(1) ? 'dashboard--request__active' : '',
            'dashboard--request__tab',
          ]"
          @click="switchActiveTabs(1)"
        >
          <span class="dashboard--request__tab-text">For Quote</span>
        </div>
        <div
          :class="[
            getActiveTab(2) ? 'dashboard--request__active' : '',
            'dashboard--request__tab',
          ]"
          @click="switchActiveTabs(2)"
        >
          <span class="dashboard--request__tab-text">For Installation</span>
        </div>
      </div>

      <!-- Quote Details -->
      <transition name="fade" mode="out-in">
        <component
          :is="componentList[activeComponentIndex]"
          :activeComponentIndex="activeComponentIndex"
          :quoteActiveComponentIndex="quoteIndex"
          :installationActiveComponentIndex="installationIndex"
          @toggle-modal="toggleMoreModal"
        />
      </transition>
    </div>

    <!-- Previous quote requests -->
    <div class="dashboard--previous__request" v-if="quoteIndex === 1">
      <h4>Previous quote requests</h4>

      <div class="quote__requests">
        <p class="quote__requests--change">
          <span class="quote__requests--changes">* 3 Changes</span>
          <span class="quote__requests--day">4 days ago</span>
        </p>
        <p class="quote__requests--list">
          <span class="dashboard--quote__det">4 Rooms</span
          ><span class="dashboard--quote__det">24 Bulbs</span
          ><span class="dashboard--quote__det">6 Fans</span
          ><span class="dashboard--quote__det">2 TVs</span>
        </p>
      </div>

      <div class="quote__requests">
        <p class="quote__requests--change">
          <span class="quote__requests--changes">* 2 Changes</span>
          <span class="quote__requests--day">Oct 4th</span>
        </p>
        <p class="quote__requests--list">
          <span class="dashboard--quote__det">4 Rooms</span
          ><span class="dashboard--quote__det">24 Bulbs</span
          ><span class="dashboard--quote__det">6 Fans</span
          ><span class="dashboard--quote__det">2 TVs</span>
        </p>
      </div>
    </div>

    <!-- Recent transactions -->
    <div class="recent__transactions">
      <h4>Recent transactions</h4>

      <!-- No payment -->
      <div class="recent__transactions--details" v-if="quoteIndex !== 3">
        <img src="@/assets/img/icons/empty-state-icon.svg" alt="" />
        <div class="">
          <h5>No transaction to show yet</h5>
          <p>
            Your quotation is yet to be approved, check back in <b>48 Hours</b>
          </p>
        </div>
      </div>

      <!-- Recent Payment -->
      <div class="recent__transactions--details" v-if="quoteIndex === 3">
        <div class="dashboard__transactions">
          <h4 class="dashboard__transactions--detail">You made a payment</h4>
          <p class="dashboard__transactions--date">14th May, 2023</p>
        </div>
        <div class="dashboard__transactions">
          <h5 class="success">+₦831,150</h5>
          <p class="dashboard__transactions--des">Equity Contribution</p>
        </div>
      </div>
    </div>

    <transition name="fade">
      <BaseModal v-if="showMoreOptions" @close="toggleMoreModal">
        <template v-slot:header>
          <p></p>
        </template>
        <template v-slot:body>
          <div class="dashboard--more__head">
            <h2>More options...</h2>
            <p>What action do you want to perform</p>
          </div>
          <div class="dashboard--more__content">
            <div class="dashboard--more__options" @click="getQuoteDetails">
              <div>
                <img src="@/assets/img/icons/quote-details.svg" alt="" />
                <p>Quote Details</p>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>

            <div class="dashboard--more__options" @click="editHouseDetails">
              <div>
                <img src="@/assets/img/icons/edit-icon.svg" alt="" />
                <p>Edit Quote Request</p>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>
            <div
              class="dashboard--more__options"
              v-if="activeTab === 2 || quoteIndex === 3"
              @click="goToInstallationDetails"
            >
              <div>
                <img src="@/assets/img/icons/handy-icon.svg" alt="" />
                <p>Installation Details</p>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>
            <div
              class="dashboard--more__options"
              v-if="activeTab === 2 || quoteIndex === 2"
              @click="goToRepaymentSchedule"
            >
              <div>
                <img src="@/assets/img/icons/repayment-schedule.svg" alt="" />
                <p>Repayment Schedule</p>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>
            <div
              class="dashboard--more__options"
              v-if="activeTab === 2 || quoteIndex === 3"
              @click="goToPaymentHistory"
            >
              <div>
                <img src="@/assets/img/icons/payment-history.svg" alt="" />
                <p>Payment History</p>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>
            <div
              class="dashboard--more__options"
              v-if="activeTab === 2 || quoteIndex === 4"
              @click="goToIssues"
            >
              <div>
                <img src="@/assets/img/icons/payment-history.svg" alt="" />
                <p>Monitoring & Issues</p>
                <span class="monitoring">2</span>
              </div>
              <img src="@/assets/img/icons/right-caret.svg" alt="" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <p></p>
        </template>
      </BaseModal>
    </transition>
  </div>
</template>
<script setup lang="ts">
import DynamicComponentComposable from "@/composables/dynamicComponents";
import QuoteDetails from "./QuoteDetails.vue";
import InstallationDetails from "./InstallationDetails.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore, useQuoteStore } from "@/store";
import { Status } from "@/types";
import { QuoteActionTypes } from "@/store/modules/quote/actions";
import { QuoteResponseRequest } from "./types";

let showMoreOptions = ref(false);
let activeTab = ref(1);
let quoteIndex = ref(5);
let installationIndex = ref(0);

let loading = ref(false);
let isLoading = ref(Status.NORMAL);
let successModal = ref(false);
let alertText = ref("");
let showErrorAlert = ref(false);
let defaultDate = ref("");

const { activeComponentIndex } = DynamicComponentComposable();

const componentList: Array<object> = [QuoteDetails, InstallationDetails];

const route = useRouter();
const router = useRoute();
const quoteStore = useQuoteStore();
const authStore = useAuthStore();
const state = ref(quoteStore.state);
const user = computed(() => authStore.state.authenticatedUser);

const quoteRequest = computed(
  () => quoteStore.state.quoteResponse.quoteRequest
);

const getQuoteIndex = computed(
  () => quoteStore.state.quoteResponse.quoteRequest.quoteRequestStatus
);

const toggleMoreModal = (value: boolean) => {
  showMoreOptions.value = value;
};

const editHouseDetails = () => {
  route.push({
    path: "/start-quote",
    query: { page: "dashboard" },
  });
};

const switchActiveTabs = (value: number) => {
  activeTab.value = value;
  let index = 0;
  if (value === 1) index = 0;
  if (value === 2) index = 1;
  nextTick(() => {
    activeComponentIndex.value = index;
  });
};

// const getActiveQuoteIndex = () => {
//   const quote = Number(router.query.getQuoteIndex);
//   if (quote) return (quoteIndex.value = quote);
//   return (quoteIndex.value = 0);
// };

const getActiveTab = (value: number): boolean => {
  if (value === activeTab.value) return true;
  return false;
};

const getQuoteDetails = () => {
  const redirectPath = "/quote-details";
  route.push(redirectPath);
};

const goToPaymentHistory = () => {
  const redirectPath = "/payment-history";
  route.push(redirectPath);
};

const goToRepaymentSchedule = () => {
  const redirectPath = "/repayment-schedule";
  route.push(redirectPath);
};

const goToIssues = () => {
  const redirectPath = "/issues";
  route.push(redirectPath);
};

const goToInstallationDetails = () => {
  const redirectPath = "/installation-details";
  route.push(redirectPath);
};

async function quoteDetails() {
  loading.value = true;
  const id = quoteStore.state.createdQuote.data.id;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_QUOTE, id)
      .then((response) => {
        isLoading.value = Status.SUCCESS;
        loading.value = false;
        quoteIndex.value = response.data.quoteRequest.quoteRequestStatus;
      })
      .catch((e: any) => {
        showErrorAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = Status.ERROR;
        successModal.value = false;
        loading.value = false;
      });
  } catch (e: any) {
    showErrorAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    successModal.value = false;
    isLoading.value = Status.ERROR;
    loading.value = false;
  }
}

onMounted(() => {
  quoteDetails();
});
</script>
<style lang="scss">
@import "@/styles/pages/Dashboard/Dashboard.scss";
@import "@/styles/pages/Quote/quote.scss";
</style>

<!-- btx68072@zslsz.com -->
