<template>
  <div class="quote">
    <div>
      <h2 class="quote--header">
        Let's help your <span class="quote--header__sub">budget</span>
      </h2>
      <p class="quote--subheader">
        Select between our prepaid packages or customize one that suits you
      </p>
    </div>

    <form>
      <!-- Basic plan -->
      <div
        v-for="(product, index) in productsResponse"
        :key="index"
        class="textfield-input-container package"
        :class="form.package === product.id ? 'active' : ''"
      >
        <label for="package">
          <input
            ref="input"
            type="radio"
            :value="product.id"
            class="login__input-field"
            id="package"
            v-model="form.package"
          />
          <div>
            <div class="package--head">
              <span class="package--head__plan">{{ product.name }}</span>
              <p class="package--head__payment">
                {{ product.description }}
              </p>
            </div>
            <div class="package--body">
              <p class="package--body__amount">
                {{ formatCurrency(product.monthlyRepayment) }}
              </p>
              <span class="package--body__plan">Per month/12 months</span>
              <p class="package--head__payment">
                {{ formatCurrency(product.initialPayment)
                }}<span> (Initial payment)</span>
              </p>
            </div>
            <div class="package--body">
              <p class="package--body__amount">
                {{ formatCurrency(product.price) }}
              </p>
              <span class="package--body__plan">Total repayment amount</span>
            </div>
          </div>
        </label>
      </div>

      <div class="quote--alt">
        <span>Or</span>
      </div>

      <div class="quote--custom" @click="goToPowerNeed">
        <div class="quote--custom__body">
          <h4>Make Custom Plan</h4>
          <p>You will be charged based on your selected appliances</p>
        </div>
        <img
          class="quote--custom__image"
          src="@/assets/img/icons/outward-arrow.svg"
          alt=""
        />
      </div>

      <BaseButton buttonText="Preview request" @button-clicked="goToNextStep" />
    </form>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, nextTick, onMounted, reactive, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuoteStore } from "@/store";
import { QuoteActionTypes } from "@/store/modules/quote/actions";
import { Status } from "@/types";
import { ProductsResponse } from "../Dashboard/types";
import currencyFormatter from "@/composables/currencyFormat";

const quoteStore = useQuoteStore();
const state = ref(quoteStore.state);

const router = useRoute();
const emit = defineEmits([
  "preview-next-section",
  "preview-section",
  "get-progress",
]);

const { formatCurrency } = currencyFormatter();

const input = ref<HTMLInputElement | null>(null);

const productsResponse: Array<ProductsResponse> = state.value.productsResponse;

let form = reactive({
  package: "",
});

let loading = ref(false);
let alertText = ref("");

const goToNextStep = () => {
  const selectedPackage = productsResponse.find(
    (product) => product.id === form.package
  );
  emit("preview-section", selectedPackage);
};

const goToPowerNeed = () => {
  emit("preview-next-section");
};

async function getQuoteDetails() {
  loading.value = true;
  const id = quoteStore.state.createdQuote.data.id;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_QUOTE, id)
      .then(() => {
        loading.value = false;
      })
      .catch((e: any) => {
        loading.value = false;
        const error: string = e?.response?.data;
        alertText.value = error;
      });
  } catch (e: any) {
    loading.value = false;
    const error: string = e?.response?.data;
    alertText.value = error;
  }
}

const getFormDetails = () => {
  const { query } = router;
  if (Number(query.isEditing) === 1) {
    getQuoteDetails();
  }
};

onMounted(() => {
  emit("get-progress", 60);
  getFormDetails();
});
</script>
<style lang="scss">
@import "@/styles/pages/Quote/quote.scss";
@import "@/styles/components/base-radio-field.scss";
</style>
