<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="repayment--container">
      <div class="repayment">
        <div class="repayment__header">
          <h4>Quotation Request</h4>
          <span class="payment">Payment made</span>
        </div>
        <div class="repayment__body">
          <div class="repayment__body--container">
            <span class="repayment__body--text">Your Contribution</span>
            <p class="repayment__body--amount">
              #831,150 <span class="repayment__body--text">(25%)</span>
            </p>
          </div>
          <div class="repayment__body--container">
            <span class="repayment__body--text">Total Asset Amount</span>
            <p class="repayment__body--amount">#1,108,150</p>
          </div>
        </div>
        <div class="repayment__footer">
          <div class="repayment__body--container">
            <span class="repayment__body--text">Total Repayment</span>
            <p class="repayment__body--amount">#2,831,150</p>
          </div>
          <div class="repayment__body--container">
            <span class="repayment__body--text">Duration</span>
            <p class="repayment__body--amount">12 months</p>
          </div>
        </div>
      </div>

      <div class="repayment--empty" v-show="false">
        <div class="repayment--empty__img">
          <img src="@/assets/img/icons/empty-icon.svg" alt="" />
        </div>
        <div class="repayment--empty__body">
          <h5>Repayment schedule yet to be confirmed</h5>
          <p>
            Full repayment breakdown will be available after installation
            process begins.
          </p>
        </div>
      </div>

      <div class="repayment__schedule">
        <h5>Repayment schedule</h5>
        <p>
          You'll be expected to pay
          <span class="primary-blue">#69,263</span> monthly
        </p>

        <!-- Not confirmed -->
        <div class="repayment__schedule--content">
          <div class="repayment__schedule--amount">
            <p>#69,263</p>
            <span>Date: 27th March, 2023</span>
          </div>
          <div class="repayment__schedule--unconfirm">
            <span>Not confirmed</span>
          </div>
        </div>

        <!-- confirmed and paid -->
        <div class="repayment__schedule--content">
          <div class="repayment__schedule--amount">
            <p>#69,263</p>
            <span>Date: 27th March, 2023</span>
          </div>
          <div class="repayment__schedule--status paid">
            <span>paid</span>
          </div>
        </div>

        <!-- Confirmed and due -->
        <div class="repayment__schedule--content">
          <div class="repayment__schedule--amount">
            <p>#69,263</p>
            <span>Date: 27th March, 2023</span>
          </div>
          <div class="repayment__schedule--status due">
            <span>Due</span>
          </div>
        </div>

        <!-- Just confirmed -->
        <div class="repayment__schedule--content">
          <div class="repayment__schedule--amount">
            <p>#69,263</p>
            <span>Date: 27th March, 2023</span>
          </div>
        </div>
      </div>

      <div class="repayment--button">
        <BaseButton buttonText="Pay Now" />
      </div>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitle = ref("Repayment Schedule");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Quotation/repayment";
</style>
