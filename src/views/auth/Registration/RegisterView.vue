<template>
  <div>
    <h4 class="login--content__header">Create an account</h4>
    <p class="login--content__subheader">
      Get started on your solar journey today
    </p>

    <form class="login--form" style="margin-top: 40px">
      <div>
        <BaseInputField
          :placeholder="'First name'"
          :className="'login__input-field'"
          :labelText="'First name'"
          :required="true"
          :autoFocus="true"
          v-model="form.firstname"
          :disabled="false"
          type="text"
          id="firstname"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'Last name'"
          :className="'login__input-field'"
          :labelText="'Last name'"
          :required="true"
          :autoFocus="true"
          v-model="form.lastname"
          :disabled="false"
          type="text"
          id="lastname"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'John'"
          :className="'login__input-field'"
          :labelText="'Username'"
          :required="true"
          :autoFocus="true"
          v-model="form.username"
          :disabled="false"
          type="text"
          id="username"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'Johndoe@gmail.com'"
          :className="'login__input-field'"
          :labelText="'Email address'"
          :required="true"
          :autoFocus="true"
          v-model="form.email"
          :disabled="false"
          type="email"
          id="email"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'Phone number'"
          :className="'login__input-field'"
          :labelText="'Enter phone number'"
          :required="true"
          :autoFocus="true"
          v-model="form.phoneNumber"
          :disabled="false"
          type="text"
          id="phone"
        />
      </div>

      <p class="login--form__passforgot">
        By creating an account, you agreeing to our
        <span class="login--content__account-terms">Privacy Policy,</span>
        and
        <span class="login--content__account-terms"
          >Electronics Communication Policy.</span
        >
      </p>

      <BaseButton
        buttonText="Signup"
        @button-clicked="saveUserInfo"
        :disabled="isLoading === Status.LOADING"
      />
    </form>

    <p class="login--content__account">
      Already have an account?
      <span class="pointer login--content__account-create" @click="loginRoute"
        >Sign In</span
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
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineEmits, reactive, ref } from "vue";
import { useAuthStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { ConfirmUserDetails, CreateUserInfo, Status } from "@/types";

//Declare Vue Router
const router = useRouter();

const authStore = useAuthStore();

const emit = defineEmits(["go-to-previous-section", "next-section"]);

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

async function saveUserInfo() {
  isLoading.value = Status.LOADING;
  try {
    await authStore
      .dispatch(AuthActionTypes.CREATE_CLIENT_ACCOUNT, form)
      .then(() => {
        isLoading.value = Status.SUCCESS;
        authStore.dispatch(AuthActionTypes.STORE_USER, form);
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
    const error: string = e?.response?.data || "Please check your internet";
    alertText.value = error;
    isLoading.value = Status.ERROR;
  }
  isLoading.value = Status.NORMAL;
}

//Go to login page
const loginRoute = () => {
  const redirectPath = "/login";
  router.push(redirectPath);
};

const goToNextSection = (form: CreateUserInfo) => {
  return emit("next-section", form);
};
</script>
