<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--update">
      <h4>Update your password</h4>

      <BaseInputField labelText="Enter Old Password" type="password" />

      <BaseInputField labelText="Enter New Password" type="password" />

      <BaseInputField labelText="Confirm New Password" type="password" />

      <BaseButton className="profile--update__button" buttonText="Confirm" />
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const pageTitle = "Update password";
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
</style>
