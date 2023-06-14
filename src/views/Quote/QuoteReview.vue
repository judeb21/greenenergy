<template>
  <div>
    <div>
      <h2 class="quote--header">
        Let's <span class="quote--header__sub">review</span> your request
      </h2>
      <p class="quote--subheader">Get started on your solar journey today</p>
    </div>

    <div>
      <!-- House Location -->
      <AppAccordion>
        <template v-slot:title>
          <span class="quote--accordion__header">House Location</span>
        </template>
        <template v-slot:content>
          <div class="quote--accordion__body">
            <div class="quote--accordion__body-content">
              <p class="textfield-label">What's your location?</p>
              <div class="quote--details">
                <p>{{ quoteRequest.address }}</p>
                <img
                  @click.prevent="editHouseDetails"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                What's your nearest landmark or bus stop?
              </p>
              <div class="quote--details">
                <p>{{ quoteRequest.landmark }}</p>
                <img
                  @click.prevent="editHouseDetails"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">What's the type of your building?</p>
              <div class="quote--details">
                <p>{{ getBuildingType }}</p>
                <img
                  @click.prevent="editHouseDetails"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </template>
      </AppAccordion>

      <!-- Power need -->
      <AppAccordion v-if="!isPackageSelected">
        <template v-slot:title>
          <span class="quote--accordion__header">Power need</span>
        </template>
        <template v-slot:content>
          <div class="quote--accordion__body">
            <div class="quote--accordion__body-content">
              <p class="textfield-label">How many bedroom is your apartment?</p>
              <div class="quote--details">
                <p>{{ quoteRequest.noOfBedrooms }} Rooms</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                How many ligh bulbs do you have in all?
              </p>
              <div class="quote--details">
                <p>{{ quoteRequest.noOfLights }}</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">How many fans do you have in all?</p>
              <div class="quote--details">
                <p>{{ quoteRequest.noOfFan }}</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                How many TVs would you like to run simultaneously?
              </p>
              <div class="quote--details">
                <p>{{ quoteRequest.noOfTv }}</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                What other equipments would you want to power on your inverter?
              </p>
              <div class="quote--details">
                <ul>
                  <li v-if="quoteRequest.includeRefrigeratorEquiptment">
                    Refrigerator
                  </li>
                  <li v-if="quoteRequest.includeAirConditionEquiptment">
                    Air Conditioner
                  </li>
                  <li v-if="quoteRequest.includeFreezerEquiptment">Freezer</li>
                  <li v-if="quoteRequest.includeOtherEquiptment">Others</li>
                </ul>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                How many hours do you require power in a day?
              </p>
              <div class="quote--details">
                <p>{{ quoteRequest.inverterUsageHoursPerDay }}hrs/day</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                How many hours of power do you have on a daily basis from PHCN?
              </p>
              <div class="quote--details">
                <p>{{ quoteRequest.hoursOfElectricPowerPerDay }}hrs/day</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="quote--accordion__body-content">
              <p class="textfield-label">
                If you have a generator, what is the capacity?
              </p>
              <div class="quote--details">
                <p>{{ generatorCapacity }}</p>
                <img
                  @click.prevent="editPowerNeed"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
                <p v-if="quoteRequest.generatorCapacityOthers">
                  {{ quoteRequest.generatorCapacityOthers }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </AppAccordion>

      <!-- Package Selected -->
      <AppAccordion v-if="isPackageSelected">
        <template v-slot:title>
          <span class="quote--accordion__header">Selected Package</span>
        </template>
        <template v-slot:content>
          <div class="quote--accordion__body">
            <div class="quote--accordion__body-content">
              <p class="textfield-label">{{ selectedPackage.name }}</p>
              <div class="quote--details">
                <div>
                  <p class="package--body__amount">
                    {{ formatCurrency(selectedPackage.price) }}
                  </p>
                  <p>{{ selectedPackage.description }}</p>
                </div>
                <img
                  @click.prevent="editSelectedPackage"
                  src="@/assets/img/icons/edit-icon.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </template>
      </AppAccordion>

      <BaseButton
        buttonText="Submit request"
        @button-clicked="sumbitRequest"
        class="quote--button"
      />
    </div>

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
        <p class="quote--modal--subheader">Processing quote...</p>
      </template>
      <template v-slot:footer>
        <p></p>
      </template>
    </BaseModal>

    <!-- Sucess modal -->
    <BaseModal v-if="successModal">
      <template v-slot:header>
        <img
          src="@/assets/img/illustrations/success.svg"
          alt="success header"
        />
      </template>
      <template v-slot:body>
        <div class="quote--modal__container">
          <p>
            <b>Hi, {{ user.user.firstname }},</b> Your quotation request has
            been received and is been processed. You will ger a response within
            the next
            <span class="primary-color">48 hours.</span>
          </p>

          <div class="quote--modal__info">
            <div class="quote--modal__type">
              <span>Reference Number</span>
              <p>{{ refNo }}</p>
            </div>
            <div class="quote--modal__copy">
              <img src="@/assets/img/icons/copy-icon.svg" alt="" />
              <p>Copy</p>
            </div>
          </div>

          <div class="quote--modal__info">
            <div class="quote--modal__type">
              <span>Turnaround Time</span>
              <CountDown :until="defaultDate" />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <BaseButton
          class="modal--footer__button"
          buttonText="Continue"
          @button-clicked="proceedToDashboard"
        />
      </template>
    </BaseModal>

    <!-- Error modal -->
    <transition name="fade" mode="out-in">
      <BaseErrorAlert
        v-if="showErrorAlert"
        :alertText="alertText"
        @close-alert="closeAlert"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineEmits, ref, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { HouseRequest, PowerRequest, QuoteRequest } from "./types";
import { useAuthStore, useQuoteStore } from "@/store";
import { QuoteActionTypes } from "@/store/modules/quote/actions";
import { Status } from "@/types";
import { BuildingTypeEnum } from "./types";
import currencyFormatter from "@/composables/currencyFormat";
import { QuoteRequest } from "../Dashboard/types";

const props = defineProps([
  "quoteRequest",
  "getBuildingType",
  "generatorCapacity",
  "selectedPackage",
]);

const emit = defineEmits([
  "go-to-next-section",
  "get-progress",
  "get-house-details",
  "get-power-need",
  "get-selected-packages",
]);
const router = useRouter();
const route = useRoute();

const { formatCurrency } = currencyFormatter();

let loading = ref(false);
let isLoading = ref(Status.NORMAL);
let successModal = ref(false);
let alertText = ref("");
let showErrorAlert = ref(false);

const quoteStore = useQuoteStore();
const authStore = useAuthStore();
const state = ref(quoteStore.state);
const user = computed(() => authStore.state.authenticatedUser);

const isPackageSelected = computed(
  () => Object.keys(props.selectedPackage).length > 0
);

const closeAlert = () => {
  showErrorAlert.value = false;
};

let defaultDate = ref("");
let refNo = ref("");

const sumbitRequest = () => {
  const { query } = route;
  if (Number(query.isEditing) === 1) return update();
  return submit();
};

// Trim payload for quote request with object
function trimQuoteProductRequest() {
  // delete obj['name'];
  const payload = props.quoteRequest;
  delete payload["noOfBedrooms"];
  delete payload["noOfLights"];
  delete payload["noOfTv"];
  delete payload["noOfFan"];
  delete payload["includeRefrigeratorEquiptment"];
  delete payload["includeFreezerEquiptment"];
  delete payload["includeAirConditionEquiptment"];
  delete payload["includeOtherEquiptment"];
  delete payload["inverterUsageHoursPerDay"];
  delete payload["hoursOfElectricPowerPerDay"];
  delete payload["hasGenerator"];
  delete payload["generatorCapacity"];
  delete payload["generatorCapacityOthers"];
  delete payload["havePreferredLocation"];
  delete payload["preferredLocationDescription"];
  delete payload["addressRequiresAccessCode"];
  delete payload["accessCodeContactPersonName"];
  delete payload["accessCodeContactPersonPhone"];
  payload.productId = props.selectedPackage?.id;
  return payload;
}

// Submit quote without product selected
async function submitQuoteWithoutProduct() {
  const payload = props.quoteRequest;
  // payload.productId = props.selectedPackage?.id;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.CREATE_QUOTE, payload)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        loading.value = false;
        successModal.value = true;
        defaultDate.value = quoteStore.state.createdQuote.data.turnAroundTime;
        refNo.value = quoteStore.state.createdQuote.data.referenceNo;
      })
      .catch((e: any) => {
        showErrorAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error?.message;
        isLoading.value = Status.ERROR;
        successModal.value = false;
        loading.value = false;
      });
  } catch (e: any) {
    showErrorAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error?.message;
    successModal.value = false;
    isLoading.value = Status.ERROR;
    loading.value = false;
  }
}

// Submit quote request with selected product
async function submitQuoteWithProduct() {
  try {
    await quoteStore
      .dispatch(
        QuoteActionTypes.CREATE_QUOTE_WITH_PRODUCT,
        trimQuoteProductRequest()
      )
      .then(() => {
        isLoading.value = Status.SUCCESS;
        loading.value = false;
        successModal.value = true;
        defaultDate.value = quoteStore.state.createdQuote.data.turnAroundTime;
      })
      .catch((e: any) => {
        showErrorAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error?.message;
        isLoading.value = Status.ERROR;
        successModal.value = false;
        loading.value = false;
      });
  } catch (e: any) {
    showErrorAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error?.message;
    successModal.value = false;
    isLoading.value = Status.ERROR;
    loading.value = false;
  }
}

async function submit() {
  loading.value = true;

  if (isPackageSelected.value) return await submitQuoteWithProduct();
  return await submitQuoteWithoutProduct();
}

async function update() {
  loading.value = true;
  const payload = props.quoteRequest;
  payload.productId = props.selectedPackage?.id;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.UPDATE_QUOTE, payload)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        loading.value = false;
        successModal.value = true;
        defaultDate.value = quoteStore.state.createdQuote.data.turnAroundTime;
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

const editHouseDetails = () => {
  emit("get-house-details");
};

const editSelectedPackage = () => {
  emit("get-selected-packages");
};

const editPowerNeed = () => {
  emit("get-power-need");
};

const proceedToDashboard = () => {
  const redirectPath = "/dashboard";
  const page = route.query.page;
  if (page)
    return router.push({
      name: "Dashboard",
    });
  return router.push(redirectPath);
};

function getUntilDate() {
  return defaultDate;
}

const until = getUntilDate();

onMounted(() => {
  emit("get-progress", 80);
});
</script>
<style lang="scss">
@import "@/styles/pages/Quote/quote.scss";
</style>
