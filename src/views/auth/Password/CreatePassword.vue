<template>
  <div>
    <h4 class="layout--content__header">Create New Password</h4>
    <p class="layout--content__subheader">
      New password should be different from previous password
    </p>

    <form class="layout--form" style="margin-top: 40px">
      <div>
        <BaseInputField
          :placeholder="'Enter New Password'"
          :className="['login__input-field', passError ? 'otpError' : '']"
          :labelText="'Enter Password'"
          :type="'password'"
          :required="true"
          :autoFocus="true"
          name="password"
          v-model="form.newPassword"
          :disabled="false"
          id="password"
          @update:modelValue="validatePassword"
        />
        <BaseInputField
          :placeholder="'Confirm new password'"
          :className="['login__input-field', passError ? 'otpError' : '']"
          :labelText="'Confirm New Password'"
          :type="'password'"
          :required="true"
          :autoFocus="true"
          name="password"
          v-model="confirmPassword"
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
        buttonText="Reset password"
        className="confirm--pasword"
        @button-clicked="resetPassword"
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
import router from "@/router";
import { useAuthStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { Status } from "@/types";
import { ref, defineProps, reactive, computed } from "vue";
const props = defineProps({
  userForm: {
    type: Object,
  },
});

let form = reactive({
  usernameOrEmail: "",
  passwordResetToken: "",
  newPassword: "",
});
let confirmPassword = ref("");
let isLoading = ref(Status.NORMAL);
let showErrorAlert = ref(false);
let showSuccessAlert = ref(false);
let alertText = ref("");
let passError = ref(false);

const authStore = useAuthStore();
const state = ref(authStore.state);
const storedUser = computed(() => state.value.storedUser);

const passwordDoNotMatch = computed(
  () => form.newPassword !== confirmPassword.value
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
  passwordComplexity.hasMinimumLength = form.newPassword.length > 6;
  passwordComplexity.hasNumber = /\d/.test(form.newPassword);
  passwordComplexity.hasALetter = /[a-zA-Z]/g.test(form.newPassword);
  if (
    !passwordComplexity.hasMinimumLength ||
    !passwordComplexity.hasNumber ||
    !passwordComplexity.hasALetter
  )
    return true;
  return false;
};

async function resetPassword() {
  isLoading.value = Status.LOADING;
  form.usernameOrEmail =
    storedUser.value.email || (storedUser.value.username as string);
  form.passwordResetToken = props.userForm?.passwordResetToken;

  if (passwordDoNotMatch.value) {
    passError.value = true;
    isLoading.value = Status.NORMAL;
    return;
  }

  try {
    await authStore
      .dispatch(AuthActionTypes.RESET_PASSWORD, form)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        alertText.value = "Your have reset your password successfully!";
        showSuccessAlert.value = true;

        setTimeout(() => {
          router.push({ path: "/login" });
        }, 1000);
        // goToNextSection(payload);
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
</script>
