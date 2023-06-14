<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="issues">
      <div class="issues--container">
        <h5>Post an Issue</h5>

        <div>
          <BaseInputField
            labelText="Issue Title"
            placeholder="Give your issue a title"
          />

          <BaseTextArea
            labelText="Describe your issue"
            placeholder="Summary of your issue.."
          />
        </div>
      </div>

      <div class="issues--empty__button">
        <BaseButton buttonText="Send now" />
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitle = ref("Post Issue");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Issues/issues";
</style>
