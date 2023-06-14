<template>
  <div>
    <div>
      <h2 class="quote--header">
        Let's understand your <span class="quote--header__sub">power need</span>
      </h2>
      <p class="quote--subheader">Get started on your solar journey today</p>
    </div>

    <form>
      <BaseInputField
        labelText="How many bedroom is your apartment?"
        :placeholder="'Please enter'"
        :required="true"
        :autoFocus="true"
        type="number"
        v-model="form.noOfBedrooms"
      />

      <BaseInputField
        labelText="How many light bulbs do you have in all?"
        :placeholder="'Enter number of total light bulbs'"
        :required="true"
        :autoFocus="true"
        type="number"
        v-model="form.noOfLights"
      />

      <BaseInputField
        :placeholder="'Enter number of fans'"
        labelText="How many fans do you have in all?"
        :required="true"
        :autoFocus="true"
        type="number"
        v-model="form.noOfFan"
      />

      <BaseInputField
        :placeholder="'Enter number of TV sets'"
        labelText="How many TVs would you like to run simultaneously?"
        :required="true"
        :autoFocus="true"
        type="number"
        v-model="form.noOfTv"
      />

      <div class="quote--building__container">
        <p class="textfield-label">
          What other equipments would you want to power on your inverter?
        </p>
        <div class="quote--building">
          <BaseCheckField
            labelText="Refrigerator"
            name="equipments"
            id="equip"
            value="Refrigerator"
            v-model="form.includeRefrigeratorEquiptment"
          />
          <BaseCheckField
            labelText="Freezer"
            name="equipments"
            id="equipm"
            value="Freezer"
            v-model="form.includeFreezerEquiptment"
          />
          <BaseCheckField
            labelText="Air Conditioner"
            name="equipments"
            id="equipme"
            value="Air Condition"
            v-model="form.includeAirConditionEquiptment"
          />
          <BaseCheckField
            labelText="Others"
            name="equipments"
            id="equipmen"
            vlaue="Others"
            v-model="form.includeOtherEquiptment"
          />
        </div>
      </div>

      <BaseInputField
        :placeholder="'XX Days'"
        labelText="How many hours do you require power in a day?"
        :required="true"
        :autoFocus="true"
        v-model.number="form.hoursOfElectricPowerPerDay"
        type="number"
      />

      <BaseInputField
        :placeholder="'XX Days'"
        labelText="How many hours of power do you have on a daily basis from PHCN?"
        :required="true"
        :autoFocus="true"
        type="number"
        v-model.number="form.inverterUsageHoursPerDay"
      />

      <div class="quote--building__container">
        <p class="textfield-label">
          If you have a generator, what is your capacity?
        </p>
        <div class="quote--building">
          <BaseRadioField
            labelText="I don't have one"
            id="radio1"
            name="building"
            value="0"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseRadioField
            labelText="1 KVA"
            id="radio2"
            name="building"
            value="1"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseRadioField
            labelText="2 KVA"
            id="radio3"
            name="building"
            value="2"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseRadioField
            labelText="5 KVA"
            id="radio4"
            name="building"
            value="3"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseRadioField
            labelText="More than 5 KVA"
            id="radio5"
            name="building"
            value="4"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseRadioField
            labelText="Others"
            id="radio6"
            name="building"
            value="5"
            :checked="form.generatorCapacity"
            v-model.number="form.generatorCapacity"
          />
          <BaseTextArea
            labelText="Enter comment if you selected others"
            placeholder="Summary"
            v-model="form.generatorCapacityOthers"
            rows="1"
            name="comment"
          />
        </div>
      </div>

      <div class="app--notice">
        <img
          class="app--notice__image"
          src="@/assets/img/icons/info-icon.svg"
          alt=""
        />
        <div class="app--notice__text">
          <p>
            <b>Why this?</b> - Some boring but needed information that is still
            boring abeg, change this.
          </p>
        </div>
      </div>

      <BaseButton buttonText="Preview request" @button-clicked="goToNextStep" />
    </form>
  </div>
</template>
<script setup lang="ts">
import { useQuoteStore } from "@/store";
import { onMounted, defineEmits, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { PowerRequest } from "./types";

const emit = defineEmits(["review-section", "get-progress"]);

let capacity = ref("");

let form: PowerRequest = reactive({
  noOfBedrooms: 0,
  noOfLights: 0,
  noOfFan: 0,
  noOfTv: 0,
  includeRefrigeratorEquiptment: false,
  includeFreezerEquiptment: false,
  includeAirConditionEquiptment: false,
  includeOtherEquiptment: false,
  inverterUsageHoursPerDay: 0,
  hoursOfElectricPowerPerDay: 0,
  // hasGenerator: false,
  generatorCapacity: 0,
  generatorCapacityOthers: "",
  // havePreferredLocation: false,
  // preferredLocationDescription: "",
  // addressRequiresAccessCode: false,
  // accessCodeContactPersonName: "",
  // accessCodeContactPersonPhone: "",
  // turnAroundTime: "",
});

const quoteStore = useQuoteStore();
let loading = ref(false);
const state = ref(quoteStore.state);

const goToNextStep = () => {
  emit("review-section", form);
};

const router = useRoute();

const populateForm = () => {
  form.noOfBedrooms = state.value.quoteResponse.quoteRequest.noOfBedrooms;
  form.noOfLights = state.value.quoteResponse.quoteRequest.noOfLights;
  form.noOfFan = state.value.quoteResponse.quoteRequest.noOfFan;
  form.noOfTv = state.value.quoteResponse.quoteRequest.noOfTv;
  form.includeRefrigeratorEquiptment =
    state.value.quoteResponse.quoteRequest.includeRefrigeratorEquiptment;
  form.includeFreezerEquiptment =
    state.value.quoteResponse.quoteRequest.includeFreezerEquiptment;
  form.includeAirConditionEquiptment =
    state.value.quoteResponse.quoteRequest.includeAirConditionEquiptment;
  form.includeOtherEquiptment =
    state.value.quoteResponse.quoteRequest.includeOtherEquiptment;
  form.inverterUsageHoursPerDay =
    state.value.quoteResponse.quoteRequest.inverterUsageHoursPerDay;
  form.hoursOfElectricPowerPerDay =
    state.value.quoteResponse.quoteRequest.hoursOfElectricPowerPerDay;
  form.generatorCapacity =
    state.value.quoteResponse.quoteRequest.generatorCapacity;
  form.generatorCapacityOthers =
    state.value.quoteResponse.quoteRequest.generatorCapacityOthers;
};

const getFormDetails = () => {
  const { query } = router;
  if (Number(query.isEditing) === 1) {
    return populateForm();
  }
};

onMounted(() => {
  emit("get-progress", 80);
  getFormDetails();
});
</script>
<style lang="scss">
@import "@/styles/pages/Quote/quote.scss";
</style>
