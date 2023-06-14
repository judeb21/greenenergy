<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="issues">
      <div class="issues--container">
        <div class="issues__details">
          <div class="issues__details--header">
            <h5>Issue #05</h5>
            <span class="active">Active</span>
          </div>
          <h5>Placed on - 06/08/23</h5>
          <h5>Resolved on - 11/08/23</h5>
        </div>

        <!-- Status details -->
        <div class="issues__detail">
          <h5>Status Details</h5>

          <!-- new issue -->
          <div class="issues__detail--container">
            <p>
              Your complaint have been receive, an Engineer will be provided to
              you soon...
            </p>
          </div>

          <!-- confirmed issue -->
          <div class="issues__detail--container issue--confirmed">
            <div class="issues__detail--confirmation">
              <div class="issues__detail--isconfirmed">
                <img src="@/assets/img/icons/craft-icon.svg" alt="" />
                <p>April 20th, 2023</p>
              </div>
              <span class="issues__detail--date">Date confirmed</span>
            </div>

            <div class="issues__detail--confirmation">
              <div class="issues__detail--isconfirmed">
                <img src="@/assets/img/icons/engineer-icon.svg" alt="" />
                <p>Demola</p>
              </div>
              <img
                class="issues__detail--engineer"
                src="@/assets/img/engineer.svg"
              />
            </div>

            <div class="issues__detail--confirmation">
              <div class="issues__detail--isconfirmed">
                <img src="@/assets/img/icons/apartment-icon.svg" alt="" />
                <p>Astra Tech LTD</p>
              </div>
            </div>

            <!-- Turn around time -->
            <div class="issues__detail--turnaround">
              <h5>You will receive your quote in</h5>
              <p>
                <span class="primary-blue">14</span>H:
                <span class="primary-blue">30</span>M:
                <span class="primary-blue">20</span>S
              </p>
            </div>
          </div>

          <!-- Issue resolved -->
          <div class="issues__detail--container">
            <div class="issues__detail--isconfirmed">
              <img src="@/assets/img/icons/craft-icon.svg" alt="" />
              <p>April 20th, 2023</p>
            </div>
            <span class="issues__detail--date">Date resolved</span>
          </div>
        </div>

        <!-- Issue summary -->
        <div class="issues__summary">
          <h5>Issue Summary</h5>

          <div class="issues__summary--content">
            <div class="issues__summary--body">
              <p>Solar have lost power due to thunder strike</p>
              <span
                >Lorem ipsum dolor sit amet, consectetur olor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae.</span
              >
              <div class="issues__summary--body-img">
                <img src="@/assets/img/icons/edit-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="issues--empty__button">
        <BaseButton buttonText="Close" />
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitle = ref("Issue Details");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Issues/issues";
</style>
