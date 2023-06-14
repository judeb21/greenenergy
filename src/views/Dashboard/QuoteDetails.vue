<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="componentList[props.quoteActiveComponentIndex]"
        :activeComponentIndex="props.quoteActiveComponentIndex"
        :quoteRequest="quoteRequest"
        :quote="quote"
        :loading="loading"
        :defaultDate="defaultDate"
        @toggle-modal="toggleMoreModal"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, onMounted } from "vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import QuoteProcessing from "./Quote/QuoteProcessing.vue";
import QuoteChanged from "./Quote/QuoteChanged.vue";
import QuoteReady from "./Quote/QuoteReady.vue";
import QuotePayment from "./Quote/QuotePayment.vue";
import { Status } from "@/types";
import { useAuthStore, useQuoteStore } from "@/store";
import { QuoteActionTypes } from "@/store/modules/quote/actions";

const { activeComponentIndex } = DynamicComponentComposable();

const componentList: Array<object> = [
  QuoteProcessing,
  QuoteChanged,
  QuoteReady,
  QuotePayment,
];

const props = defineProps(["quoteActiveComponentIndex"]);

let loading = ref(false);
let isLoading = ref(Status.NORMAL);
let successModal = ref(false);
let alertText = ref("");
let showErrorAlert = ref(false);
// let defaultDate = ref("");

let isOpen = ref(false);

const quoteStore = useQuoteStore();
const authStore = useAuthStore();
const state = ref(quoteStore.state);
const storedUser = computed(() => authStore.state.storedUser);

const getQuoteIndex = computed(
  () => quoteStore.state.quoteResponse.quoteRequest.quoteRequestStatus
);

const quoteRequest = computed(
  () => quoteStore.state.quoteResponse.quoteRequest
);

const quote = computed(() => quoteStore.state.quoteResponse.quote);

const defaultDate = computed(
  () => quoteStore.state.quoteResponse.quoteRequest.turnAroundTime
);

const emit = defineEmits(["toggle-modal"]);

async function getQuoteDetails() {
  loading.value = true;
  const id = quoteStore.state.createdQuote.data.id;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_QUOTE, id)
      .then((response) => {
        // console.log(response.data);
        isLoading.value = Status.SUCCESS;
        loading.value = false;
        // successModal.value = true;
        defaultDate.value = response.data.quoteRequest.turnAroundTime;
        quoteRequest.value = response.data.quoteRequest;
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

function getUntilDate() {
  return defaultDate;
}

const until = getUntilDate();

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};

onMounted(() => {
  // getQuoteDetails();
});
</script>
<style lang="scss">
@import "@/styles/pages/Dashboard/Dashboard.scss";
@import "@/styles/pages/Quote/quote.scss";
</style>
