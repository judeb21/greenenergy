<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--notification">
      <h4>Confirm Notification Updates</h4>

      <div class="profile--notification__container">
        <div class="profile--notification__column">
          <div class="profile--notification__alerts">
            <h4>Login Alerts</h4>
            <p>
              Get email or push notifications whenever there’s a login or logout
              activity.
            </p>
          </div>
          <div class="profile--notification__toggle">
            <input class="tgl tgl-ios" id="cb1" type="checkbox" checked />
            <label class="tgl-btn" for="cb1"></label>
          </div>
        </div>

        <div class="profile--notification__column">
          <div class="profile--notification__alerts">
            <h4>Transaction Alerts</h4>
            <p>
              Get email or push notifications whenever a transaction happens.
            </p>
          </div>
          <div class="profile--notification__toggle">
            <input class="tgl tgl-ios" id="cb2" type="checkbox" checked />
            <label class="tgl-btn" for="cb2"></label>
          </div>
        </div>

        <div class="profile--notification__column">
          <div class="profile--notification__alerts">
            <h4>Promotions</h4>
            <p>Get promotional email or exciting deals and offers.</p>
          </div>
          <div class="profile--notification__toggle">
            <input class="tgl tgl-ios" id="cb3" type="checkbox" />
            <label class="tgl-btn" for="cb3"></label>
          </div>
        </div>
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";

const pageTitle = "Notification alerts";
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
@import "@/styles/components/switch";
</style>
