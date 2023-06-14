<template>
  <div>
    <h4 class="login--content__header">Setup password</h4>
    <p class="login--content__subheader">
      Get started on your solar journey today
    </p>

    <form class="login--form" style="margin-top: 40px">
      <div>
        <BaseInputField
          :placeholder="'Enter Password'"
          :className="['login__input-field', passError ? 'otpError' : '']"
          :labelText="'Enter Password'"
          :type="'password'"
          :required="true"
          :autoFocus="true"
          name="password"
          v-model="form.password"
          :disabled="false"
          id="password"
          @update:modelValue="validatePassword"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'Re-enter Password'"
          :className="[
            'login__input-field',
            passError ? 'otpError' : '',
            passwordDoNotMatch ? 'otpError' : '',
          ]"
          :labelText="'Confirm Password'"
          :type="'password'"
          :required="true"
          :autoFocus="true"
          name="confirmPassword"
          v-model="form.confirmPassword"
          :disabled="false"
          id="confirmPassword"
        />

        <small class="form-text text-muted" v-if="!passwordComplexityFulfilled"
          >Password should contain atleast
          <span
            v-if="!passwordComplexity.hasMinimumLength"
            :class="passwordComplexity.hasMinimumLength ? 'has_required' : ''"
            >6 chacters,
          </span>
          <span
            v-if="!passwordComplexity.hasALetter"
            :class="passwordComplexity.hasALetter ? 'has_required' : ''"
            >1 character,
          </span>
          <span
            v-if="!passwordComplexity.hasNumber"
            :class="passwordComplexity.hasNumber ? 'has_required' : ''"
            >1 number</span
          >
        </small>
      </div>

      <BaseButton
        buttonText="Confirm"
        className="confirm--pasword"
        @button-clicked="confirmSignUp"
        :disabled="disabledButton"
      />
    </form>

    <transition name="fade" mode="out-in">
      <BaseErrorAlert
        v-if="showErrorAlert"
        :alertText="alertText"
        @close-alert="closeAlert"
      />
    </transition>

    <transition name="fade" mode="out-in">
      <BaseSuccessAlert
        v-if="showSuccessAlert"
        :alertText="alertText"
        @close-success-alert="closeSuccessAlert"
      />
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { CreateUserInfo, Status } from "@/types";
import { computed, reactive, ref } from "vue";
import { RouteLocationRaw, useRoute, useRouter } from "vue-router";

//Declare Vue Router
const router = useRouter();
const route = useRoute();

// const confirmSignUp = () => {
//   const redirectPath = "/get-qoute";
//   router.push(redirectPath);
// };

let form = reactive({
  password: "",
  confirmPassword: "",
});

let passError = ref(false);
let isLoading = ref(Status.NORMAL);

let showErrorAlert = ref(false);
let showSuccessAlert = ref(false);
let alertText = ref("");

const authStore = useAuthStore();
const state = ref(authStore.state);
const storedUser = computed(() => state.value.storedUser);

const passwordDoNotMatch = computed(
  () => form.password !== form.confirmPassword
);

const passwordComplexityFulfilled = computed(() => {
  return (
    passwordComplexity.hasMinimumLength &&
    passwordComplexity.hasNumber &&
    passwordComplexity.hasALetter
  );
});

const disabledButton = computed(
  () =>
    !passwordComplexityFulfilled.value ||
    passwordDoNotMatch.value ||
    isLoading.value === Status.LOADING
);

let passwordComplexity = reactive({
  hasMinimumLength: false,
  hasNumber: false,
  hasALetter: false,
});

const validatePassword = () => {
  passwordComplexity.hasMinimumLength = form.password.length > 6;
  passwordComplexity.hasNumber = /\d/.test(form.password);
  passwordComplexity.hasALetter = /[a-zA-Z]/g.test(form.password);
  if (
    !passwordComplexity.hasMinimumLength ||
    !passwordComplexity.hasNumber ||
    !passwordComplexity.hasALetter
  )
    return true;
  return false;
};

const closeAlert = () => {
  showErrorAlert.value = false;
};

const closeSuccessAlert = () => {
  showSuccessAlert.value = false;
};

const disableButton = computed(() => isLoading.value === Status.LOADING);

const successRedirect = () => {
  if (isLoading.value === Status.SUCCESS) {
    router.push((route.query.redirect as RouteLocationRaw) || "/get-quote");
  }
};

async function confirmSignUp() {
  isLoading.value = Status.LOADING;
  if (passwordDoNotMatch.value) {
    passError.value = true;
    isLoading.value = Status.NORMAL;
    return;
  }
  const payload: any = {
    email: storedUser.value.email,
    password: form.password,
  };
  try {
    await authStore
      .dispatch(AuthActionTypes.SET_PASSWORD, payload)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        alertText.value = "Your account has been successfully created!";
        showSuccessAlert.value = true;
        setTimeout(() => {
          // successRedirect();
          // const nextPage = this.$router.push({ name: "task" });
          // this.$router.go(nextPage);
          const redirectTo = route.query.redirect || { name: "GetQuote" };
          router.push(redirectTo as RouteLocationRaw);
        }, 1500);
      })
      .catch((e: any) => {
        showErrorAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
        isLoading.value = Status.ERROR;
      });
  } catch (e: any) {
    showErrorAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value = Status.ERROR;
  }
  isLoading.value = Status.NORMAL;
}

// const goBack = () => {
//   router.back();
// };
</script>
