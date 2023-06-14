<script lang="ts" setup>
// import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import CreatePassword from "@/views/auth/Password/CreatePassword.vue";
import ResetPassword from "@/views/auth/Password/ResetPassword.vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import { useRouter } from "vue-router";

import { reactive } from "vue";

let userForm = reactive({
  usernameOrEmail: "",
  passwordResetToken: "",
  newPassword: "",
});

//Declare Vue Router
const router = useRouter();

const { activeComponentIndex, handleNextSection, handlePreviousSection } =
  DynamicComponentComposable();

const componentList: Array<object> = [ResetPassword, CreatePassword];

const goToNextSection = () => {
  handleNextSection();
};

const NextSection = (form: any) => {
  userForm.usernameOrEmail = form.usernameOrEmail;
  userForm.passwordResetToken = form.passwordResetToken;
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
  <!-- <PasswordLayout @go-back="goBack"> -->
  <transition name="fade" mode="out-in">
    <keep-alive>
      <component
        :is="componentList[activeComponentIndex]"
        :activeComponentIndex="activeComponentIndex"
        :userForm="userForm"
        @next-section="NextSection"
        @go-to-next-section="goToNextSection"
        @go-to-previous-section="handlePrevSection"
      ></component>
    </keep-alive>
  </transition>
  <!-- </PasswordLayout> -->
</template>
