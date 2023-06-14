<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--setting">
      <div class="profile--setting__details">
        <div class="profile--setting__profile">
          <img src="@/assets/img/profile-pic.png" alt="Profile picture" />
        </div>
        <div class="profile--setting__identity">
          <h4>Terry Pouke</h4>
          <p>terry@sunbeam.studio</p>
        </div>
      </div>

      <div class="profile--setting__others">
        <!-- Edit profile -->
        <div class="profile--setting__link" @click="editProfile">
          <div class="profile--setting__link-des">
            <img src="@/assets/img/icons/profile-icon.svg" alt="" />
            <span>Edit Profile</span>
          </div>
          <img
            class="profile--setting__link-action"
            src="@/assets/img/icons/right-caret.svg"
            alt=""
          />
        </div>

        <!-- Change password -->
        <div class="profile--setting__link" @click="changePassword">
          <div class="profile--setting__link-des">
            <img src="@/assets/img/icons/password-icon.svg" alt="" />
            <span>Change Password</span>
          </div>
          <img
            class="profile--setting__link-action"
            src="@/assets/img/icons/right-caret.svg"
            alt=""
          />
        </div>

        <!-- Enable 2FA -->
        <!-- <div class="profile--setting__link" @click="enableFactor">
          <div class="profile--setting__link-des">
            <img src="@/assets/img/icons/2FA-icon.svg" alt="" />
            <span>Enable 2FA</span>
          </div>
          <img
            class="profile--setting__link-action"
            src="@/assets/img/icons/right-caret.svg"
            alt=""
          />
        </div> -->

        <!-- Payment methods -->
        <div class="profile--setting__link" @click="viewPaymentMethods">
          <div class="profile--setting__link-des">
            <img src="@/assets/img/icons/payment-icon.svg" alt="" />
            <span>Payment Methods</span>
          </div>
          <img
            class="profile--setting__link-action"
            src="@/assets/img/icons/right-caret.svg"
            alt=""
          />
        </div>

        <!-- Notifications Alert -->
        <div class="profile--setting__link" @click="notification">
          <div class="profile--setting__link-des">
            <img src="@/assets/img/icons/alert-icon.svg" alt="" />
            <span>Notifications Alert</span>
          </div>
          <img
            class="profile--setting__link-action"
            src="@/assets/img/icons/right-caret.svg"
            alt=""
          />
        </div>

        <!-- Logout button -->
        <div class="profile--setting__button" @click="logout">
          <SecondButton className="" buttonText="Logout" />
        </div>
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import AuthenticationService from "@/services/AuthenticationService";
import { ref } from "vue";
import { useRouter } from "vue-router";

const pageTitle = "Settings";

const router = useRouter();

const editProfile = () => {
  const redirectPath = "/edit-profile";
  router.push(redirectPath);
};

const changePassword = () => {
  const redirectPath = "/change-password";
  router.push(redirectPath);
};

// const enableFactor = () => {
//   const redirectPath = "/notification-setting";
//   router.push(redirectPath);
// };

const viewPaymentMethods = () => {
  const redirectPath = "/payment-method";
  router.push(redirectPath);
};

const notification = () => {
  const redirectPath = "/notification-setting";
  router.push(redirectPath);
};

const logout = () => {
  AuthenticationService.logoutUser();
};
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
</style>
