<template>
  <div class="quote">
    <div>
      <h2 class="quote--header">
        Let's know you <span class="quote--header__sub">better</span>
      </h2>
      <p class="quote--subheader">Get started on your solar journey today</p>
    </div>

    <form>
      <BaseSelectField
        labelText="Which state is your home?"
        id="home-state"
        keyProperty="title"
        textProperty="title"
        valueProperty="title"
        value="title"
        :options="nigerianStates"
        v-model="form.state"
        @input="getLGA"
        placeholder="Select State"
      />

      <BaseSelectField
        labelText="Which LGA is your home?"
        id="home-lga"
        keyProperty="id"
        textProperty="title"
        valueProperty="id"
        value="title"
        :options="lgas"
        v-model="form.city"
        placeholder="Select LGA"
      />

      <div class="textfield-input-container" style="margin-top: 18px">
        <label for="addressText" class="textfield-label">Address</label>
        <vue-google-autocomplete
          id="map"
          ref="input"
          label="Address"
          classname="textfield-input login__input-field"
          placeholder="Search address"
          v-on:placechanged="getAddressData"
          v-model="form.address"
        />
      </div>

      <!-- <div class="map--frame">
        <img src="@/assets/img/illustrations/map.svg" alt="" />
      </div> -->

      <BaseInputField
        :placeholder="'Enter name of landmark'"
        labelText="What's your nearest landmark or bus stop?"
        :required="true"
        :autoFocus="false"
        v-model="form.landmark"
        :className="'login__input-field'"
        :disabled="false"
        type="text"
        id="landmarkText"
      />

      <div class="quote--building__container">
        <p class="textfield-label">What's the type of your building?</p>
        <div class="quote--building">
          <BaseRadioField
            labelText="Storey building"
            id="radio1"
            name="building"
            v-model.number="form.buildingType"
            value="0"
          />
          <BaseRadioField
            labelText="Bungalow"
            id="radio2"
            name="building"
            value="1"
            v-model.number="form.buildingType"
          />
          <BaseRadioField
            labelText="Block of flats"
            value="2"
            id="radio3"
            name="building"
            v-model.number="form.buildingType"
          />
        </div>
      </div>

      <BaseButton buttonText="Select package" @button-clicked="goToNextStep" />
    </form>
  </div>
</template>
<script setup lang="ts">
import BaseRadioField from "@/components/ui/BaseRadioField.vue";
import {
  computed,
  defineEmits,
  nextTick,
  onMounted,
  reactive,
  Ref,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { useQuoteStore } from "@/store";
import { QuoteActionTypes } from "@/store/modules/quote/actions";
import { NigerianState, Status } from "@/types";
// import { QuoteGetterTypes } from "@/store/modules/quote/getters";

const quoteStore = useQuoteStore();
const state = ref(quoteStore.state);

// Sort states by alphabetical order
const nigerianStates = computed(() => {
  const states = quoteStore.state.nigerianStates;
  const sortedStates = states.sort((firstEl, secondEl): number => {
    const firstTitle = firstEl.title.toLowerCase();
    const secondTitle = secondEl.title.toLowerCase();

    return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
  });
  return sortedStates;
});

// Sort lga by alphabetical order
const lgas = computed(() => {
  const states = quoteStore.state.lga;
  const sortedLga = states.sort((firstEl, secondEl): number => {
    const firstTitle = firstEl.title.toLowerCase();
    const secondTitle = secondEl.title.toLowerCase();

    return firstTitle < secondTitle ? -1 : firstTitle > secondTitle ? 1 : 0;
  });
  return sortedLga;
});

const router = useRoute();
const emit = defineEmits(["next-section"]);

const input = ref<HTMLInputElement>();

let form = reactive({
  address: "",
  landmark: "",
  buildingType: "",
  state: "",
  city: "",
});

let loading = ref(false);
let alertText = ref("");

const goToNextStep = () => {
  emit("next-section", form);
};

const getInputFocus = (): void => {
  const name = router.hash.slice(1);
  if (name === "address") {
    nextTick().then(() => {
      input.value?.focus;
    });
  }
};

function getAddressData(data: any) {
  form.address = `${data.street_number} ${data.route} ${data.administrative_area_level_2} ${data.locality}, ${data.country}`;
}

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

async function getProducts() {
  loading.value = true;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_PRODUCTS)
      .then((response) => {
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

async function getStates() {
  loading.value = true;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_STATES)
      .then((response) => {
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

async function getLGA(e: any) {
  const target = e.target.value;
  loading.value = true;

  try {
    await quoteStore
      .dispatch(QuoteActionTypes.GET_LGA, target)
      .then((response) => {
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

/*eslint-disable no-undef*/
const originAutoComplete = () =>
  new google.maps.places.Autocomplete(input.value, {
    types: ["address"],
    componentRestrictions: { country: ["ng"] },
    fields: ["address_components", "opening_hours"],
  });

const populateForm = () => {
  form.address = state.value.quoteResponse.quoteRequest.address;
  form.landmark = state.value.quoteResponse.quoteRequest.landmark;
  form.buildingType = state.value.quoteResponse.quoteRequest.buildingType;
};

const getFormDetails = () => {
  const { query } = router;
  if (Number(query.isEditing) === 1) {
    getQuoteDetails();
    return populateForm();
  }
};

onMounted(() => {
  getInputFocus();
  getFormDetails();
  getProducts();
  getStates();
  originAutoComplete();
  // nextTick(() => {
  //   address?.value?.focus();
  // });
});
</script>
<style lang="scss">
@import "@/styles/pages/Quote/quote.scss";
</style>
