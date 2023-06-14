<template>
  <div>
    <div class="payment--container">
      <h4>
        Agree to
        <span class="primary-blue">terms & conditions</span>
      </h4>
    </div>

    <div class="payment--terms">
      <ol>
        <li class="payment--terms__conditions">
          <h4>Terms and conditions</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia,
          </p>
        </li>

        <li class="payment--terms__conditions">
          <h4>Terms and conditions</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia,
          </p>
        </li>

        <li class="payment--terms__conditions">
          <h4>Terms and conditions</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia,
          </p>
        </li>
      </ol>
    </div>

    <div class="payment--terms__button">
      <SecondButton
        buttonText="Decline"
        className="decline"
        @button-clicked="termsDisagreeModal"
      />
      <BaseButton buttonText="Accept" @button-clicked="showPaymentModal" />
    </div>

    <!-- Get quote modal -->
    <transition name="modal">
      <BaseModal v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <img
            src="@/assets/img/illustrations/payment.svg"
            alt="success header"
          />
        </template>
        <template v-slot:body>
          <div class="quote--modal__container">
            <p>
              <b>Hi, Terry,</b> Your quotation request has been received and is
              been processed. You will ger a response within the next
              <span class="primary-color">48 hours.</span>
            </p>

            <div class="quote--modal__info">
              <div class="quote--modal__type">
                <span>Reference Number</span>
                <p>#QTE-657365658</p>
              </div>
              <div class="quote--modal__copy">
                <img src="@/assets/img/icons/copy-icon.svg" alt="" />
                <p>Copy</p>
              </div>
            </div>

            <div class="quote--modal__info">
              <div class="quote--modal__type">
                <span>You will receive your quote</span>
                <p>in 48H: 00M: 20S</p>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <BaseButton
            class="modal--footer__button"
            buttonText="Continue"
            @button-clicked="showModal = false"
          />
        </template>
      </BaseModal>
    </transition>

    <transition name="modal">
      <BaseModal v-if="showError" @close="showError = false">
        <template v-slot:header>
          <img src="@/assets/img/illustrations/error.svg" alt="" />
        </template>

        <template v-slot:body>
          <p class="get--quote-modal--subheader">
            You need to agree to terms to proceed
          </p>
        </template>

        <template v-slot:footer>
          <p class="get--quote-modal--cancel" @click="showError = false">
            Okay
          </p>
        </template>
      </BaseModal>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

let showError = ref(false);
let showModal = ref(false);

const showPaymentModal = () => {
  showModal.value = true;
};

const termsDisagreeModal = () => {
  showError.value = true;
};
</script>
<style lang="scss">
@import "@/styles/pages/Quote/quote.scss";
</style>
