<script lang="ts" setup>
import RegisterView from "./RegisterView.vue";
import EmailVerification from "./EmailVerification.vue";
import PasswordSetup from "./PasswordSetup.vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import { useRouter } from "vue-router";
import { CreateUserInfo } from "@/types";
import { reactive } from "vue";

//Declare Vue Router
const router = useRouter();

const { activeComponentIndex, handleNextSection, handlePreviousSection } =
  DynamicComponentComposable();

const componentList: Array<object> = [
  RegisterView,
  EmailVerification,
  PasswordSetup,
];

let userForm: CreateUserInfo = reactive({
  email: "",
  phoneNumber: "",
  username: "",
  firstname: "",
  lastname: "",
});

const goToNextSection = () => {
  handleNextSection();
};

const goToVerificationSection = (form: CreateUserInfo) => {
  userForm = form;
  handleNextSection();
};

const handlePrevSection = () => {
  handlePreviousSection();
};

const goBack = () => {
  handlePreviousSection();
  if (activeComponentIndex.value === 0) return router.back();
};
</script>

<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <component
        :is="componentList[activeComponentIndex]"
        :activeComponentIndex="activeComponentIndex"
        @next-section="goToVerificationSection"
        @go-to-next-section="goToNextSection"
        @go-to-previous-section="handlePrevSection"
      ></component>
    </keep-alive>
  </transition>
</template>
