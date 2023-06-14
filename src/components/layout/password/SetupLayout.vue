<template>
  <div class="layout--container">
    <!-- Layout header -->
    <div class="layout--header layout--header--setup">
      <BackButton @button-clicked="goBack" />

      <p class="layout--header__text">Get a quote</p>

      <div class="layout--header__progress">
        <div class="progress-bar" :style="ballStyle"></div>
        <!-- <div class="progress-ball" :style="ballStyle"></div> -->
        <svg :height="radius * 2" :width="radius * 2">
          <circle
            stroke="#16A34A"
            :stroke-dasharray="circumference + ' ' + circumference"
            :style="{ strokeDashoffset: strokeDashoffset }"
            :stroke-width="stroke"
            fill="transparent"
            :r="normalizedRadius"
            :cx="radius"
            :cy="radius"
          />
        </svg>
        <span>{{ progress }}%</span>
      </div>
    </div>

    <!-- Layout content -->
    <div class="layout--content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BackButton from "@/components/ui/BackButton.vue";

export default defineComponent({
  name: "SetupLayout",

  props: ["ballStyle", "radius", "stroke", "progress"],

  data() {
    const normalizedRadius = this.radius - this.stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    return {
      normalizedRadius,
      circumference,
    };
  },

  components: {
    BackButton,
  },

  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference;
    },
  },

  methods: {
    goBack() {
      this.$emit("go-back");
      // this.$router.back();
    },
  },
});
</script>
<style lang="scss">
@import "@/styles/pages/Layout/setup";
</style>
