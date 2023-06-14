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

  <div v-else class="dashboard--quote">
    <div class="dashboard--quote__head">
      <p class="dashboard--quote__process proces">
        <img src="@/assets/img/icons/pending-icon.svg" alt="" />
        Your quote request is processing
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
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/house-icon.svg" alt="" />
        {{ buldingType }}
      </p>
      <p class="dashboard--quote__detail">
        <img src="@/assets/img/icons/details-icon.svg" alt="" />
        <span class="dashboard--quote__det">{{ roomNo }} Rooms</span>
        <span class="dashboard--quote__det">{{ lightNo }} Bulbs</span>
        <span class="dashboard--quote__det">{{ fanNo }} Fans</span>
        <span class="dashboard--quote__det">{{ noOfTv }} TVs</span>
      </p>
    </div>

    <!-- Turnaround Time -->
    <div class="dashboard--turnaround">
      <h4 class="dashboard--turnaround__header">
        Your will receive your quote in
      </h4>
      <p class="dashboard--turnaround__countdown">
        <!-- <span class="primary-blue">48</span>H:
        <span class="primary-blue">30</span>M:
        <span class="primary-blue">00</span>S -->
        <CountDown :until="props.defaultDate" />
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
      <BaseButton buttonText="Edit" @button-clicked="editHouseDetails" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";
import { QuoteRequest } from "../types";
import dayjs from "dayjs";
import { BuildingTypeEnum } from "@/views/Quote/types";

let isOpen = ref(false);

const emit = defineEmits(["toggle-modal"]);

const router = useRouter();

// const props = defineProps(["quoteRequest", "loading", "defaultDate"]);
const props = defineProps<{
  quoteRequest: QuoteRequest;
  loading: boolean;
  defaultDate: string;
}>();

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};

const address = computed(() => props?.quoteRequest?.address);
const creationDate = computed(() =>
  dayjs(props?.quoteRequest?.dateCreated).format("MMMM D, YYYY")
);
const buldingType = computed(
  () => Object.values(BuildingTypeEnum)[props?.quoteRequest?.buildingType]
);
const roomNo = computed(() => props?.quoteRequest?.noOfBedrooms);
const lightNo = computed(() => props?.quoteRequest?.noOfLights);
const fanNo = computed(() => props?.quoteRequest?.noOfFan);
const noOfTv = computed(() => props?.quoteRequest?.noOfTv);

function getUntilDate() {
  return props.defaultDate;
}

const until = getUntilDate();

const editHouseDetails = () => {
  router.push({
    path: "/start-quote",
    query: { isEditing: 1 },
  });
};
</script>
