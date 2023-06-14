<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--edit">
      <div class="profile--edit__image">
        <img src="@/assets/img/Profile.png" alt="Profile image" />
        <div class="profile--edit__change">
          <img src="@/assets/img/icons/white-edit-icon.svg" alt="" />
        </div>
      </div>

      <BaseInputField labelText="First name" placeholder="John" />

      <BaseInputField labelText="Last name" placeholder="Doe" />

      <BaseInputField
        labelText="Email address"
        type="email"
        placeholder="johndoe@gmail.com"
      />

      <BaseInputField labelText="Phone number" placeholder="08012346057" />

      <BaseButton className="profile--edit__button" buttonText="Update" />
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const pageTitle = "Edit profile";
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
</style>
