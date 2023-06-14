<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { Status, TargetObject } from "@/types";
import {
  nextTick,
  ref,
  defineEmits,
  watch,
  watchEffect,
  computed,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";

//Declare Vue Router
const router = useRouter();

//define emit
const emit = defineEmits([
  "go-to-previous-section",
  "go-to-next-section",
  "next-section",
]);

let focusIndex = ref(1);

let counter = ref(59);

let OTP = ref("");

let alertText = ref("");

let isLoading = ref(Status.NORMAL);

let showSuccessAlert = ref(false);

let conditionForCodeResend = ref(false);

const goBack = () => {
  return emit("go-to-previous-section");
};

const goToNextSection = (form: any) => {
  return emit("next-section", form);
};

const getAllOtpValues = (v: number) => {
  OTP.value = String(v);
};

const authStore = useAuthStore();
const state = ref(authStore.state);
const storedUser = computed(() => state.value.storedUser);

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

const closeAlert = () => {
  showSuccessAlert.value = false;
};

// sendResetPasswordEmail
const OTPStatus = computed(
  () => state.value.resetPasswordRequest?.sendResetPasswordEmail
);

const passwordStatus = computed(
  () => state.value.resetPasswordRequest?.validateOTP
);

const resendStatus = computed(
  () => state.value.resetPasswordRequest?.resendOTP
);

const disableButton = computed(
  () => isLoading.value === Status.LOADING || conditionForCodeResend
);

async function resendOTP() {
  isLoading.value = Status.LOADING;
  const payload: any = {
    email: storedUser.value.email || storedUser.value.username,
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

async function resetPassword() {
  isLoading.value = Status.LOADING;
  const payload: any = {
    usernameOrEmail: storedUser.value.email || storedUser.value.username,
    passwordResetToken: OTP.value,
  };
  try {
    await authStore
      .dispatch(AuthActionTypes.CONFIRM_RESET_PASSWORD, payload)
      .then(() => {
        isLoading.value = passwordStatus.value;
        goToNextSection(payload);
      })
      .catch((e: any) => {
        showSuccessAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = passwordStatus.value;
      });
  } catch (e: any) {
    showSuccessAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value = passwordStatus.value;
  }
  isLoading.value = passwordStatus.value;
}

async function sendResetPassword() {
  isLoading.value = Status.LOADING;
  const payload: any = {
    usernameOrEmail: storedUser.value.email || storedUser.value.username,
    // token: OTP.value,
  };
  try {
    await authStore
      .dispatch(AuthActionTypes.RESET_PASSWORD_REQUEST, payload)
      .then(() => {
        isLoading.value = OTPStatus.value;
        // goToNextSection();
      })
      .catch((e: any) => {
        showSuccessAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = OTPStatus.value;
      });
  } catch (e: any) {
    showSuccessAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value = OTPStatus.value;
  }
  isLoading.value = OTPStatus.value;
}

onMounted(() => {
  sendResetPassword();
});

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
<template>
  <div>
    <h4 class="layout--content__header">Verify your email</h4>
    <p class="layout--content__subheader">
      We have sent code to your phone & mailbox, please enter code below
    </p>

    <form class="layout--form">
      <div class="pin__verification">
        <BasePinInputField
          :length="6"
          :className="['pin__verification--field', alertText ? 'otpError' : '']"
          @entered="(v) => getAllOtpValues(v)"
        />
      </div>

      <BaseButton
        buttonText="Confirm code"
        @button-clicked="resetPassword"
        :disabled="isLoading === Status.LOADING"
      />
    </form>

    <p class="layout--content__account" v-if="!conditionForCodeResend">
      Didn't get code?
      <span
        class="pointer layout--content__account-create"
        @click.prevent="resendCode"
        >Resend now</span
      >
    </p>

    <p class="layout--content__account" v-else>
      You can resend code in
      <span class="pointer layout--content__account-create"
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
<style lang="scss">
@import "@/styles/components/pin-verification.scss";
</style>
