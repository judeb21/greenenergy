<script setup lang="ts"></script>

<template id="modal-template">
  <div class="modal--mask">
    <div class="modal--wrapper">
      <transition name="fade" mode="out-in">
        <div class="modal--container">
          <!-- modal header -->
          <div class="modal--header">
            <slot name="header">
              <img src="@/assets/img/illustrations/started-modal.svg" alt="" />
            </slot>
          </div>

          <!-- modal body -->
          <div class="modal--body">
            <slot name="body"> Default body </slot>
          </div>

          <div class="modal--footer">
            <slot name="footer">
              <BaseButton
                class="modal--footer__button"
                @button-clicked="$emit('close')"
                buttonText="Close"
              />
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/components/base-modal.scss";
</style>
