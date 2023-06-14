<template>
  <div>
    <h4 class="login--content__header">Login</h4>
    <p class="login--content__subheader">Enter your credentials below</p>

    <form class="login--form">
      <div>
        <BaseInputField
          :placeholder="'Johndoe@gmail.com'"
          :className="'login__input-field'"
          :labelText="'Email address'"
          :required="true"
          :autoFocus="true"
          v-model="loginInfo.username"
          :disabled="false"
          type="text"
          id="username"
        />
      </div>
      <div>
        <BaseInputField
          :placeholder="'Enter Password'"
          :className="'login__input-field'"
          :labelText="'Enter Password'"
          :type="'password'"
          :required="true"
          :autoFocus="true"
          name="password"
          v-model="loginInfo.password"
          :disabled="false"
          id="password"
        />
      </div>

      <p class="login--form__passforgot">
        Forgot your password?
        <span class="login--form__passreset" @click="goToRestLink">Reset</span>
      </p>

      <BaseButton
        buttonText="Login"
        @button-clicked="loginUser"
        :disabled="isLoading === Status.LOADING"
      />
    </form>

    <p class="login--content__account">
      Don't have an account yet?
      <span
        class="pointer login--content__account-create"
        @click="registerRoute"
        >Create one</span
      >
    </p>

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
// import AuthLayout from "@/components/layout/auth/AuthLayout.vue";
import { useAuthStore } from "@/store";
import { computed, reactive, ref, watch } from "vue";
import { MutationTypes } from "@/store/modules/auth/types";
import { AuthMutationTypes } from "@/store/modules/auth/mutations";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { AuthGetterTypes } from "@/store/modules/auth/getters";

import { RouteLocationRaw, useRoute, useRouter } from "vue-router";
import { LoginInfo, Status } from "@/types";

//Declare Vue Router
const router = useRouter();
const route = useRoute();

//AuthStore
const authStore = useAuthStore();

let loginInfo: LoginInfo = reactive({
  username: "",
  password: "",
});

let showErrorAlert = ref(false);
let showSuccessAlert = ref(false);
let alertText = ref("");

//Go to register page
const registerRoute = () => {
  const redirectPath = "/register";
  router.push(redirectPath);
};

const goToRestLink = () => {
  const redirectPath = "/reset-password";
  router.push(redirectPath);
};
const state = ref(authStore.state);

const loginStatus = computed(() => state.value.authRequestStatus.login);

let isLoading = ref(Status.NORMAL);

const successRedirect = () => {
  if (loginStatus.value === Status.SUCCESS) {
    const redirectTo = route.query.redirect || { name: "Dashboard" };
    router.push(redirectTo as RouteLocationRaw);
    // const redirectPath = "/dashboard";
    // // { path: redirectPath }
    // router.push((route.query.redirect as RouteLocationRaw) || "/dashboard");
  }
};

const closeAlert = () => {
  showErrorAlert.value = false;
};

async function loginUser() {
  isLoading.value = Status.LOADING;

  try {
    authStore
      .dispatch(AuthActionTypes.LOGIN_USER, loginInfo)
      .then(() => {
        isLoading.value = loginStatus.value;
        authStore.dispatch(AuthActionTypes.STORE_USER, loginInfo);
        // successRedirect();
        const redirectTo = route.query.redirect || { name: "Dashboard" };
        router.push(redirectTo as RouteLocationRaw);
      })
      .catch((e: any) => {
        isLoading.value = loginStatus.value;
        showErrorAlert.value = true;
        const error: string = e?.response?.data;
        alertText.value = error;
      });
  } catch (e: any) {
    showErrorAlert.value = true;
    const error: string = e?.response?.data;
    alertText.value = error;
    isLoading.value === loginStatus.value;
  }
  isLoading.value === loginStatus.value;
}
</script>
