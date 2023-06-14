<script setup lang="ts">
import * as dayjs from "dayjs";
import { computed, ref, defineProps } from "vue";
import { useNow } from "@vueuse/core";

const props = defineProps<{
  until: string;
}>();

// const clock = ref<HTMLDivElement>();

const now = useNow();
const untilDayjs = dayjs(props.until);

const duration = computed(() => {
  if (untilDayjs.isBefore(now.value)) return dayjs.duration(0);
  return dayjs.duration(untilDayjs.diff(now.value));
});

const untilFormatted = untilDayjs.format("YYYY/MM/DD");
const remainingFormatted = computed(() => {
  const dur = duration.value;

  //Make days pad with 2 at least.
  let days = String(Math.floor(dur.asDays()));
  if (days.length === 1) days = `0${days}`;

  const hms = dur.format("HH[H] mm[M] ss[S]");
  return `${days}D ${hms}`;
});

const timeOver = computed(() => {
  const dur = duration.value;
  let days = String(Math.floor(dur.asDays()));
  const hms = dur.format("HH[H] mm[M] ss[S]");
  if (days.length < 1 && Number(hms) === 0) return "greyed-out";
  return "primary-blue";
});
</script>

<template>
  <!-- <div ref="clock">
    <div class="quote--modal__type"> -->
  <!-- <span>Turnaround Time</span> -->
  <p :class="timeOver">{{ remainingFormatted }}</p>
  <!-- </div>
  </div> -->
</template>
