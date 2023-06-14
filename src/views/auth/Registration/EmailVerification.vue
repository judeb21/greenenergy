<template>
  <div>
    <h4 class="login--content__header">Verify your email</h4>
    <p class="login--content__subheader">
      We have sent code to your phone & mailbox, please enter code below
    </p>

    <form class="login--form">
      <div class="pin__verification">
        <BasePinInputField
          :length="6"
          :className="['pin__verification--field', alertText ? 'otpError' : '']"
          @entered="(v) => getAllOtpValues(v)"
        />
      </div>

      <BaseButton
        buttonText="Confirm code"
        :disabled="disableButton"
        @button-clicked="verifyUserInfo"
      />
    </form>

    <p class="login--content__account" v-if="!conditionForCodeResend">
      Didn't get code?
      <span
        class="pointer login--content__account-create"
        @click.prevent="resendCode"
        >Resend now</span
      >
    </p>

    <p class="login--content__account" v-else>
      You can resend code in
      <span class="pointer login--content__account-create"
        >0:{{ counter }}s</span
      >
    </p>

    <transition name="fade" mode="out-in">
      <BaseErrorAlert
        v-if="showSuccessAlert"
        :alertText="alertText"
        @close-alert="closeAlert"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { ConfirmUserDetails, CreateUserInfo, Status } from "@/types";
import {
  nextTick,
  ref,
  defineEmits,
  watch,
  watchEffect,
  reactive,
  computed,
} from "vue";
import { useRouter } from "vue-router";

//Declare Vue Router
const router = useRouter();

const authStore = useAuthStore();
const state = ref(authStore.state);
const storedUser = computed(() => state.value.storedUser);

//define emit
const emit = defineEmits([
  "go-to-previous-section",
  "go-to-next-section",
  "next-section",
]);

let focusIndex = ref(1);

let counter = ref(59);

let OTP = ref("");

let conditionForCodeResend = ref(false);

let form: CreateUserInfo = reactive({
  email: "",
  phoneNumber: "",
  username: "",
  firstname: "",
  lastname: "",
});

let alertText = ref("");

let isLoading = ref(Status.NORMAL);

let showSuccessAlert = ref(false);

const closeAlert = () => {
  showSuccessAlert.value = false;
};

const goBack = () => {
  return emit("go-to-previous-section");
};

const goToNext = () => {
  return emit("go-to-next-section");
};

const startCountDown = watchEffect((onInvalidate) => {
  counter.value = 59;
  const beginProgress = () => (conditionForCodeResend.value = true);

  onInvalidate(() => beginProgress());
});

const resendCode = () => {
  // startCountDown();
  counter.value = 59;
  conditionForCodeResend.value = true;
  resendOTP();
};

const disableButton = computed(
  () => conditionForCodeResend.value || isLoading.value === Status.LOADING
);

const resendStatus = computed(
  () => state.value.resetPasswordRequest?.resendOTP
);

async function resendOTP() {
  isLoading.value = Status.LOADING;
  const payload: any = {
    email: storedUser.value.email,
  };
  try {
    await authStore
      .dispatch(AuthActionTypes.RESEND_OTP, payload)
      .then(() => {
        isLoading.value = resendStatus.value;
      })
      .catch((e: any) => {
        showSuccessAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = resendStatus.value;
      });
  } catch (e: any) {
    showSuccessAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value = resendStatus.value;
  }
  isLoading.value = resendStatus.value;
}

async function verifyUserInfo() {
  isLoading.value = Status.LOADING;
  const payload: ConfirmUserDetails = {
    email: storedUser.value.email,
    token: OTP.value,
  };
  try {
    await authStore
      .dispatch(AuthActionTypes.CONFIRM_USER_ACCOUNT, payload)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        goToNextSection(form);
      })
      .catch((e: any) => {
        showSuccessAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = Status.ERROR;
      });
  } catch (e: any) {
    showSuccessAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value = Status.ERROR;
  }
  isLoading.value = Status.NORMAL;
}

const getAllOtpValues = (v: number) => {
  OTP.value = String(v);
};

const goToNextSection = (form: CreateUserInfo) => {
  return emit("next-section", form);
};

watch(conditionForCodeResend, (value) => {
  if (value) {
    const setTimer = setInterval(() => {
      counter.value--;
      if (counter.value === 0) {
        counter.value = 0;
        conditionForCodeResend.value = false;
        clearInterval(setTimer);
      }
    }, 1000);
  }
});
</script>
<style lang="scss">
@import "@/styles/components/pin-verification.scss";
</style>
