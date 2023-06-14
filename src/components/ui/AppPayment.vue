<template>
  <Paystack
    buttonClass="app-primary-btn form-control"
    buttonText="Pay Now"
    ref="paystack"
    :publicKey="publicKey"
    :email="payment.email"
    :firstname="payment.firstname"
    :lastname="payment.lastname"
    :amount="payment.amount"
    :reference="reference"
    :onSuccess="onSuccessfulPayment"
    :onCanel="onCancelledPayment"
  ></Paystack>

  <!-- <Paystack
    ref="paystack"
    :amount="payment.amount"
    :email="payment.email"
    :firstname="payment.firstname"
    :lastname="payment.lastname"
    :reference="payment.reference"
    :paystackkey="PUBLIC_KEY"
    :callback="processPayment"
    :close="closeForm"
  >
    <slot> Make Payment </slot>
  </Paystack> -->
</template>
<script setup lang="ts">
import { PaystackPaymentResponse } from "@/types";
import { computed, defineEmits } from "vue";
import Paystack from "vue3-paystack";

const emits = defineEmits(["payment-successful", "payment-cancelled"]);

const publicKey = process.env.VUE_APP_PAYSTACK_PUBLIC_KEY;

const payment = computed(() => {
  return {
    amount: 1000,
    email: "johndoe@gmail.com",
    firstname: "John",
    lastname: "Doe",
  };
});

const reference = computed(() => {
  let randomRef = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let index = 0; index < 15; index++)
    randomRef += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

  return randomRef;
});

const onSuccessfulPayment = (response: PaystackPaymentResponse) => {
  emits("payment-successful", response);
};

const onCancelledPayment = () => {
  emits("payment-cancelled");
};
</script>

<!-- pk_test_6300192035bf2d426066ef32a384faeb887401eb -->
