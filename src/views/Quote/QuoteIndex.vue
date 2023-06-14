<template>
  <SetupLayout :radius="31" :stroke="4" :progress="progress" @go-back="goBack">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="componentList[activeComponentIndex]"
          :activeComponentIndex="activeComponentIndex"
          :quoteRequest="quoteRequest"
          :getBuildingType="getBuildingType"
          :generatorCapacity="generatorCapacity"
          :selectedPackage="selectedPackage"
          @get-progress="getNextProgress"
          @next-section="getNextSection"
          @review-section="getReviewSection"
          @preview-section="previewPackage"
          @preview-next-section="populatePackage"
          @go-to-next-section="goToNextSection"
          @go-to-previous-section="handlePrevSection"
          @get-house-details="handleHouseEdit"
          @get-power-need="handlePrevSection"
          @get-selected-packages="handlePackageSelection"
        ></component>
      </keep-alive>
    </transition>
  </SetupLayout>
</template>
<script setup lang="ts">
import SetupLayout from "@/components/layout/password/SetupLayout.vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import StartQuote from "./StartQuote.vue";
import QuotePackages from "./QuotePackages.vue";
import QuoteApartment from "./QuoteApartment.vue";
import QuoteReview from "./QuoteReview.vue";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import {
  BuildingTypeEnum,
  GeneratorCapacityEnum,
  HouseRequest,
  PowerRequest,
  QuoteRequest,
  SelectablePackages,
} from "./types";

let progress = ref(40);

let quoteRequest: QuoteRequest = {
  address: "",
  landmark: "",
  state: "",
  city: "",
  noOfBedrooms: 0,
  noOfLights: 0,
  noOfTv: 0,
  noOfFan: 0,
  buildingType: 0,
  generatorCapacityOthers: "",
  includeRefrigeratorEquiptment: false,
  includeFreezerEquiptment: false,
  includeAirConditionEquiptment: false,
  includeOtherEquiptment: false,
  inverterUsageHoursPerDay: 0,
  hoursOfElectricPowerPerDay: 0,
  hasGenerator: false,
  generatorCapacity: 0,
  havePreferredLocation: false,
  preferredLocationDescription: "",
  addressRequiresAccessCode: false,
  accessCodeContactPersonName: "",
  accessCodeContactPersonPhone: "",
  turnAroundTime: "",
};

let getBuildingType = ref("");
let generatorCapacity = ref("");
let selectedPackage = ref({});

const router = useRouter();

const { activeComponentIndex, handleNextSection, handlePreviousSection } =
  DynamicComponentComposable();

const componentList: Array<object> = [
  StartQuote,
  QuotePackages,
  QuoteApartment,
  QuoteReview,
];

const goToNextSection = () => {
  handleNextSection();
};

const handleHouseEdit = () => {
  activeComponentIndex.value = 0;
};

const handlePackageSelection = () => {
  activeComponentIndex.value = 1;
};

const handlePrevSection = () => {
  handlePreviousSection();
};

const populatePackage = () => {
  selectedPackage.value = {};
  handleNextSection();
};

const previewPackage = (form: object) => {
  selectedPackage.value = form;
  activeComponentIndex.value = 3;
};

const getNextSection = (form: HouseRequest) => {
  quoteRequest.address = form.address;
  quoteRequest.landmark = form.landmark;
  quoteRequest.buildingType = form.buildingType;
  quoteRequest.state = form.state;
  quoteRequest.city = form.city;
  getBuildingType.value = getBuildingTypeFn(form.buildingType);
  handleNextSection();
};

const getReviewSection = (form: PowerRequest) => {
  quoteRequest.noOfBedrooms = form.noOfBedrooms;
  quoteRequest.noOfLights = form.noOfLights;
  quoteRequest.noOfFan = form.noOfFan;
  quoteRequest.noOfTv = form.noOfTv;
  quoteRequest.includeRefrigeratorEquiptment =
    form.includeRefrigeratorEquiptment;
  quoteRequest.includeFreezerEquiptment = form.includeFreezerEquiptment;
  quoteRequest.includeAirConditionEquiptment =
    form.includeAirConditionEquiptment;
  quoteRequest.includeOtherEquiptment = form.includeOtherEquiptment;
  quoteRequest.inverterUsageHoursPerDay = form.inverterUsageHoursPerDay;
  quoteRequest.hoursOfElectricPowerPerDay = form.hoursOfElectricPowerPerDay;
  // quoteRequest.hasGenerator = form.hasGenerator;
  quoteRequest.generatorCapacity = form.generatorCapacity;
  generatorCapacity.value = getGeneratorCapacity(form.generatorCapacity);
  // quoteRequest.havePreferredLocation = form.havePreferredLocation;
  // quoteRequest.preferredLocationDescription = form.preferredLocationDescription;
  // quoteRequest.addressRequiresAccessCode = form.addressRequiresAccessCode;
  // quoteRequest.accessCodeContactPersonName = form.accessCodeContactPersonName;
  // quoteRequest.accessCodeContactPersonPhone = form.accessCodeContactPersonPhone;
  // quoteRequest.turnAroundTime = form.turnAroundTime;
  handleNextSection();
};

const getBuildingTypeFn = (type: number) => {
  return Object.values(BuildingTypeEnum)[type];
};

const getGeneratorCapacity = (type: number) => {
  return Object.values(GeneratorCapacityEnum)[type];
};

const isObjectEmpty = (objectName: object) => {
  return Object.keys(objectName).length === 0;
};

// const isPackageSelected = computed(
//   () => Object.keys(selectedPackage.value).length === 0
// );

const goBack = () => {
  if (activeComponentIndex.value < 0) return router.back();
  if (isObjectEmpty(selectedPackage.value)) return handlePrevSection();
  if (!isObjectEmpty(selectedPackage.value))
    return (activeComponentIndex.value = 1);
  return handlePreviousSection();
};

const getNextProgress = (value: number) => {
  progress.value = value;
};
</script>
