<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div>
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
            <p>12 hardwares to be installed</p>
          </div>
        </div>
      </div>

      <hr />

      <div class="installation--request__tabs">
        <div
          :class="[
            getActiveTab(1) ? 'installation--request__active' : '',
            'installation--request__tab',
          ]"
          @click="switchActiveTabs(1)"
        >
          <span class="installation--request__tab-text">Hardware</span>
        </div>
        <div
          :class="[
            getActiveTab(2) ? 'installation--request__active' : '',
            'installation--request__tab',
          ]"
          @click="switchActiveTabs(2)"
        >
          <span class="installation--request__tab-text">Engineer</span>
        </div>
        <div
          :class="[
            getActiveTab(3) ? 'installation--request__active' : '',
            'installation--request__tab',
          ]"
          @click="switchActiveTabs(3)"
        >
          <span class="installation--request__tab-text">Submitted data</span>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <component
          :is="componentList[activeComponentIndex]"
          :activeComponentIndex="activeComponentIndex"
          @toggle-modal="toggleMoreModal"
        />
      </transition>
    </div>
  </PasswordLayout>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps, nextTick } from "vue";
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import DynamicComponentComposable from "@/composables/dynamicComponents";
import InstallationEngineer from "./InstallationEngineer.vue";
import InstallationData from "./InstallationData.vue";

const { activeComponentIndex } = DynamicComponentComposable();

const componentList: Array<object> = [InstallationEngineer, InstallationData];

const props = defineProps(["installationActiveComponentIndex"]);

let isOpen = ref(false);

const emit = defineEmits(["toggle-modal"]);

const toggleMoreModal = () => {
  isOpen.value = !isOpen.value;
  return emit("toggle-modal", isOpen.value);
};

let activeTab = ref(1);

const switchActiveTabs = (value: number) => {
  activeTab.value = value;
  let index = 0;
  if (value === 1) index = 0;
  if (value === 2) index = 1;
  nextTick(() => {
    activeComponentIndex.value = index;
  });
};

const getActiveTab = (value: number): boolean => {
  if (value === activeTab.value) return true;
  return false;
};

const pageTitle = ref("Installation Details");
</script>
<style lang="scss">
@import "@/styles/pages/Layout/password";
@import "@/styles/pages/Issues/issues";
@import "@/styles/pages/Dashboard/Dashboard.scss";
@import "@/styles/pages/Installation/installation.scss";
@import "@/styles/pages/Quote/quote.scss";
@import "@/styles/pages/Quotation/quote";
</style>
