<template>
  <div
    ref="container"
    :class="[inputContainerClass ? inputContainerClass : 'input-field']"
  >
    <input
      v-for="n in length"
      :key="n"
      @keyup="(e) => handleEnter(e, n - 1)"
      v-model="otpArray[n - 1]"
      type="text"
      maxlength="1"
      class="form-control"
      :class="className"
    />
  </div>
  <!-- <div>
    <div
      v-for="n in length"
      :key="n"
      :class="[
        inputContainerClass ? inputContainerClass : 'input-field',
        n - 1 === 3 ? 'sep' : '',
      ]"
      ref="container"
    >
      <div v-show="n - 1 === 3">
        <div>-</div>
      </div>
      <input
        @keyup="(e) => handleEnter(e, n - 1)"
        v-model="otpArray[n - 1]"
        type="text"
        maxlength="1"
        class="form-control"
        :class="className"
      />
    </div>
  </div> -->
</template>
<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  watch,
  withDefaults,
} from "vue";

const otpProps = defineProps({
  length: {
    type: Number,
    default: 6,
  },
  className: {
    type: String,
    default: "",
  },
  inputContainerClass: {
    type: String,
    default: "",
  },
});

const otpArray = ref<Array<any>>([]);
const container = ref();
const otpEmit = defineEmits(["entered"]);

onMounted(() => {
  for (let index = 0; index < otpProps.length; index++) {
    otpArray.value[index] = null;
  }
});

const handleEnter = (e: any, i: any) => {
  const children = container.value.children;
  const keypressed = e.key;

  if (i > 0 && (keypressed === "Backspace" || keypressed === "Delete")) {
    otpArray.value[i] = null;
    setTimeout(() => {
      children[i - 1].focus();
    }, 100);
  } else {
    const matched = keypressed.match(/^[0-9]$/);
    if (!matched) {
      otpArray.value[i] = null;
      return;
    } else if (i < otpProps.length - 1) {
      setTimeout(() => {
        children[i + 1].focus();
      }, 100);
    }
    checkOTP();
  }
};

const checkOTP = () => {
  const children = container.value.children;

  let flag = true;

  for (let i = 0; i < otpProps.length - 1; i++) {
    if (otpArray.value[i] == null) {
      children[i].classList.add("otpError");
      flag = false;
    } else {
      children[i].classList.remove("otpError");
    }
  }

  if (flag) otpEmit("entered", otpArray.value.join(""));
};
</script>
<style lang="scss">
@import "@/styles/components/base-pin-field.scss";
</style>
