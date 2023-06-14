<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="issues">
      <div class="issues--empty" v-show="false">
        <img src="@/assets/img/icons/empty-issues.svg" alt="" />
        <h5>No issues yet</h5>
        <p>If you have an challenges with your setup, send us a complaint.</p>
      </div>

      <div class="issues--breakdown">
        <div class="issues__active">
          <div class="issues__active--header">
            <h4>Active issues</h4>
            <span>2/3</span>
          </div>

          <div class="issues__active--description">
            <div class="issues__active--description-header">
              <div class="issues__active--description-heading">
                <h5>Issue #05 - 06/08/23</h5>
              </div>
              <div class="issues__active--description-activity">
                <img src="@/assets/img/icons/comment-icon.svg" alt="" />
                <span class="active">Active</span>
              </div>
            </div>

            <div class="issues__active--description-body">
              <p>Solar have lost power due to thunder strike</p>
              <span>Lorem ipsum dolor sit amet, consectetur.....</span>
            </div>
          </div>
        </div>

        <!-- Passed issues -->
        <div class="issues__closed">
          <h5>Passed issues</h5>

          <div class="issues__closed--content">
            <div class="issues__details--header">
              <h5>Issue #04 - 14/06/23</h5>
              <span class="closed">Closed</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Inverter goes off after mere 2hrs of use</p>
              <span>Lorem ipsum dolor sit amet, consectetur.....</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Closed on 17/06/23</p>
            </div>
          </div>

          <div class="issues__closed--content">
            <div class="issues__details--header">
              <h5>Issue #04 - 14/06/23</h5>
              <span class="closed">Closed</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Inverter goes off after mere 2hrs of use</p>
              <span>Lorem ipsum dolor sit amet, consectetur.....</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Closed on 17/06/23</p>
            </div>
          </div>

          <div class="issues__closed--content">
            <div class="issues__details--header">
              <h5>Issue #04 - 14/06/23</h5>
              <span class="closed">Closed</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Inverter goes off after mere 2hrs of use</p>
              <span>Lorem ipsum dolor sit amet, consectetur.....</span>
            </div>
            <div class="issues__closed--content--body">
              <p>Closed on 17/06/23</p>
            </div>
          </div>
        </div>
      </div>

      <div class="issues--empty__button">
        <BaseButton buttonText="Post an issue" @button-clicked="postIssue" />
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const route = useRouter();

const postIssue = () => {
  route.push({ path: "/post-issue" });
};

const pageTitle = ref("Monitor Issues");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Issues/issues";
</style>
