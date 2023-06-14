<template>
  <PasswordLayout :pageTitle="pageTitle">
    <div class="profile--update">
      <h4>Add a New Card</h4>

      <div>
        <div class="card-form">
          <div class="card-list">
            <div class="card-item" v-bind:class="{ '-active': isCardFlipped }">
              <div class="card-item__side -front">
                <div
                  class="card-item__focus"
                  v-bind:class="{ '-active': focusElementStyle }"
                  v-bind:style="focusElementStyle"
                  ref="focusElement"
                ></div>
                <div class="card-item__cover"></div>

                <div class="card-item__wrapper">
                  <div class="card-item__top">
                    <img
                      src="@/assets/img/icons/card-chip.svg"
                      class="card-item__chip"
                    />
                    <div class="card-item__type">
                      <transition name="slide-fade-up">
                        <img
                          v-bind:src="
                            'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                            getCardType +
                            '.png'
                          "
                          v-if="getCardType"
                          v-bind:key="getCardType"
                          alt=""
                          class="card-item__typeImg"
                        />
                      </transition>
                    </div>
                  </div>
                  <label
                    for="cardNumber"
                    class="card-item__number"
                    ref="cardNumber"
                  >
                    <template v-if="getCardType === 'amex'">
                      <span v-for="(n, $index) in amexCardMask" :key="$index">
                        <transition name="slide-fade-up">
                          <div
                            class="card-item__numberItem"
                            v-if="
                              $index > 4 &&
                              $index < 14 &&
                              cardNumber.length > $index &&
                              n.trim() !== ''
                            "
                          >
                            *
                          </div>
                          <div
                            class="card-item__numberItem"
                            :class="{ '-active': n.trim() === '' }"
                            :key="$index"
                            v-else-if="cardNumber.length > $index"
                          >
                            {{ cardNumber[$index] }}
                          </div>
                          <div
                            class="card-item__numberItem"
                            :class="{ '-active': n.trim() === '' }"
                            v-else
                            :key="$index + 1"
                          >
                            {{ n }}
                          </div>
                        </transition>
                      </span>
                    </template>

                    <template v-else>
                      <span v-for="(n, $index) in otherCardMask" :key="$index">
                        <transition name="slide-fade-up">
                          <div
                            class="card-item__numberItem"
                            v-if="
                              $index > 4 &&
                              $index < 15 &&
                              cardNumber.length > $index &&
                              n.trim() !== ''
                            "
                          >
                            *
                          </div>
                          <div
                            class="card-item__numberItem"
                            :class="{ '-active': n.trim() === '' }"
                            :key="$index"
                            v-else-if="cardNumber.length > $index"
                          >
                            {{ cardNumber[$index] }}
                          </div>
                          <div
                            class="card-item__numberItem"
                            :class="{ '-active': n.trim() === '' }"
                            v-else
                            :key="$index + 1"
                          >
                            {{ n }}
                          </div>
                        </transition>
                      </span>
                    </template>
                  </label>
                  <div class="card-item__content">
                    <label
                      for="cardName"
                      class="card-item__info"
                      ref="cardName"
                    >
                      <div class="card-item__holder">Card Holder Name</div>
                      <transition name="slide-fade-up">
                        <div
                          class="card-item__name"
                          v-if="cardName.length"
                          key="1"
                        >
                          <transition-group name="slide-fade-right">
                            <div
                              :key="$index + 1"
                              v-for="(n, $index) in cardName.replace(
                                /\s\s+/g,
                                ' '
                              )"
                            >
                              <span
                                class="card-item__nameItem"
                                v-if="$index === $index"
                                >{{ n }}</span
                              >
                            </div>
                          </transition-group>
                        </div>
                        <div class="card-item__name" v-else key="2">
                          John Doe
                        </div>
                      </transition>
                    </label>
                    <div class="card-item__date" ref="cardDate">
                      <label for="cardMonth" class="card-item__dateTitle"
                        >Expires</label
                      >
                      <div style="display: flex">
                        <label for="cardMonth" class="card-item__dateItem">
                          <transition name="slide-fade-up">
                            <span v-if="cardMonth" v-bind:key="cardMonth">{{
                              cardMonth
                            }}</span>
                            <span v-else key="2">MM</span>
                          </transition>
                        </label>
                        /
                        <label for="cardYear" class="card-item__dateItem">
                          <transition name="slide-fade-up">
                            <span v-if="cardYear" :key="cardYear">{{
                              String(cardYear).slice(2, 4)
                            }}</span>
                            <span v-else key="2">YY</span>
                          </transition>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-item__side -back">
                <div class="card-item__cover"></div>
                <div class="card-item__band"></div>
                <div class="card-item__cvv">
                  <div class="card-item__cvvTitle">CVV</div>
                  <div class="card-item__cvvBand">
                    <span v-for="(n, $index) in cardCvv" :key="$index">
                      *
                    </span>
                  </div>
                  <div class="card-item__type">
                    <img
                      v-bind:src="
                        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                        getCardType +
                        '.png'
                      "
                      v-if="getCardType"
                      class="card-item__typeImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-form__inner">
            <div class="card-input">
              <label for="cardNumber" class="card-input__label"
                >Card Number</label
              >
              <input
                type="text"
                ref="cardNumberInput"
                id="cardNumber"
                class="card-input__input"
                v-mask="generateCardNumberMask"
                v-model="cardNumber"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardNumber"
                autocomplete="off"
                maxlength="16"
              />
            </div>
            <div class="card-input">
              <label for="cardName" class="card-input__label"
                >Card Holders</label
              >
              <input
                type="text"
                id="cardName"
                class="card-input__input"
                v-model="cardName"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardName"
                autocomplete="off"
              />
            </div>
            <div class="card-form__row">
              <div class="card-form__col">
                <div class="card-form__group">
                  <label for="cardMonth" class="card-input__label"
                    >Expiration Date</label
                  >
                  <select
                    class="card-input__input -select"
                    id="cardMonth"
                    v-model="cardMonth"
                    v-on:focus="focusInput"
                    v-on:blur="blurInput"
                    data-ref="cardDate"
                  >
                    <option value="" disabled selected>Month</option>
                    <option
                      v-bind:value="n < 10 ? '0' + n : n"
                      v-for="n in 12"
                      v-bind:disabled="n < minCardMonth"
                      v-bind:key="n"
                    >
                      {{ n < 10 ? "0" + n : n }}
                    </option>
                  </select>
                  <select
                    class="card-input__input -select"
                    id="cardYear"
                    v-model="cardYear"
                    v-on:focus="focusInput"
                    v-on:blur="blurInput"
                    data-ref="cardDate"
                  >
                    <option value="" disabled selected>Year</option>
                    <option
                      v-bind:value="$index + minCardYear"
                      v-for="(n, $index) in 12"
                      v-bind:key="n"
                    >
                      {{ $index + minCardYear }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="card-form__col -cvv">
                <div class="card-input">
                  <label for="cardCvv" class="card-input__label">CVV</label>
                  <input
                    type="text"
                    class="card-input__input"
                    id="cardCvv"
                    v-mask="'###'"
                    maxlength="3"
                    v-model="cardCvv"
                    v-on:focus="flipCard(true)"
                    v-on:blur="flipCard(false)"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>

            <BaseButton buttonText="Submit" />

            <!-- <button class="card-form__button">Submit</button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card-form">
      <div class="card-list">
        <div class="card-item" v-bind:class="{ '-active': isCardFlipped }">
          <div class="card-item__side -front">
            <div
              class="card-item__focus"
              v-bind:class="{ '-active': focusElementStyle }"
              v-bind:style="focusElementStyle"
              ref="focusElement"
            ></div>
            <div class="card-item__cover">
              <img
                v-bind:src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  currentCardBackground +
                  '.jpeg'
                "
                class="card-item__bg"
              />
            </div>

            <div class="card-item__wrapper">
              <div class="card-item__top">
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                  class="card-item__chip"
                />
                <div class="card-item__type">
                  <transition name="slide-fade-up">
                    <img
                      v-bind:src="
                        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                        getCardType +
                        '.png'
                      "
                      v-if="getCardType"
                      v-bind:key="getCardType"
                      alt=""
                      class="card-item__typeImg"
                    />
                  </transition>
                </div>
              </div>
              <label
                for="cardNumber"
                class="card-item__number"
                ref="cardNumber"
              >
                <template v-if="getCardType === 'amex'">
                  <span v-for="(n, $index) in amexCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="
                          $index > 4 &&
                          $index < 14 &&
                          cardNumber.length > $index &&
                          n.trim() !== ''
                        "
                      >
                        *
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        :key="$index"
                        v-else-if="cardNumber.length > $index"
                      >
                        {{ cardNumber[$index] }}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >
                        {{ n }}
                      </div>
                    </transition>
                  </span>
                </template>

                <template v-else>
                  <span v-for="(n, $index) in otherCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="
                          $index > 4 &&
                          $index < 15 &&
                          cardNumber.length > $index &&
                          n.trim() !== ''
                        "
                      >
                        *
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        :key="$index"
                        v-else-if="cardNumber.length > $index"
                      >
                        {{ cardNumber[$index] }}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >
                        {{ n }}
                      </div>
                    </transition>
                  </span>
                </template>
              </label>
              <div class="card-item__content">
                <label for="cardName" class="card-item__info" ref="cardName">
                  <div class="card-item__holder">Card Holder</div>
                  <transition name="slide-fade-up">
                    <div class="card-item__name" v-if="cardName.length" key="1">
                      <transition-group name="slide-fade-right">
                        <div
                          class="card-item__nameItem"
                          v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                          v-bind:key="$index + 1"
                        >
                          <span v-if="$index === $index">{{ n }}</span>
                        </div>
                      </transition-group>
                    </div>
                    <div class="card-item__name" v-else key="2">Full Name</div>
                  </transition>
                </label>
                <div class="card-item__date" ref="cardDate">
                  <label for="cardMonth" class="card-item__dateTitle"
                    >Expires</label
                  >
                  <label for="cardMonth" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardMonth" v-bind:key="cardMonth">{{
                        cardMonth
                      }}</span>
                      <span v-else key="2">MM</span>
                    </transition>
                  </label>
                  /
                  <label for="cardYear" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardYear" v-bind:key="cardYear">{{
                        String(cardYear).slice(2, 4)
                      }}</span>
                      <span v-else key="2">YY</span>
                    </transition>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-item__side -back">
            <div class="card-item__cover">
              <img
                v-bind:src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  currentCardBackground +
                  '.jpeg'
                "
                class="card-item__bg"
              />
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
              <div class="card-item__cvvTitle">CVV</div>
              <div class="card-item__cvvBand">
                <span v-for="(n, $index) in cardCvv" :key="$index"> * </span>
              </div>
              <div class="card-item__type">
                <img
                  v-bind:src="
                    'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                    getCardType +
                    '.png'
                  "
                  v-if="getCardType"
                  class="card-item__typeImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-form__inner">
        <div class="card-input">
          <label for="cardNumber" class="card-input__label">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            class="card-input__input"
            v-mask="generateCardNumberMask"
            v-model="cardNumber"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardNumber"
            autocomplete="off"
          />
        </div>
        <div class="card-input">
          <label for="cardName" class="card-input__label">Card Holders</label>
          <input
            type="text"
            id="cardName"
            class="card-input__input"
            v-model="cardName"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardName"
            autocomplete="off"
          />
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-form__group">
              <label for="cardMonth" class="card-input__label"
                >Expiration Date</label
              >
              <select
                class="card-input__input -select"
                id="cardMonth"
                v-model="cardMonth"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Month</option>
                <option
                  v-bind:value="n < 10 ? '0' + n : n"
                  v-for="n in 12"
                  v-bind:disabled="n < minCardMonth"
                  v-bind:key="n"
                >
                  {{ n < 10 ? "0" + n : n }}
                </option>
              </select>
              <select
                class="card-input__input -select"
                id="cardYear"
                v-model="cardYear"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Year</option>
                <option
                  v-bind:value="$index + minCardYear"
                  v-for="(n, $index) in 12"
                  v-bind:key="n"
                >
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input">
              <label for="cardCvv" class="card-input__label">CVV</label>
              <input
                type="text"
                class="card-input__input"
                id="cardCvv"
                v-mask="'####'"
                maxlength="4"
                v-model="cardCvv"
                v-on:focus="flipCard(true)"
                v-on:blur="flipCard(false)"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <button class="card-form__button">Submit</button>
      </div>
    </div> -->
  </PasswordLayout>
</template>
<!-- <script setup lang="ts">
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const pageTitle = "payment methods";

let cardCvv = ref("");
let cardName = ref("");
let cardMonth = ref("");
let cardYear = ref("");
let cardNumber = ref("");
let cardNumberForm = ref("");
let cardNameForm = ref("");
const minCardYear = ref(new Date().getFullYear());
const amexCardMask = ref("#### ###### ######");
const otherCardMask = ref("#### #### #### ####");
let cardNumberTemP = ref("");
let isCardFlipped = ref(false);
let isInputFocused = ref(false);
const cardNumberInput = ref<HTMLInputElement | null>(null);
let focusElementStyle = ref();

const isAmex = computed(() => "amex");
const getCardType = computed((): string => {
  let number = cardNumberForm.value;
  let reg = new RegExp("^4");

  if (number.match(reg) !== null) return "visa";

  reg = new RegExp("^(34|37)");
  if (number.match(reg) !== null) return "amex";

  reg = new RegExp("^5[1-5]");
  if (number.match(reg) !== null) return "mastercard";

  reg = new RegExp("^6011");
  if (number.match(reg) != null) return "discover";

  reg = new RegExp("^9792");
  if (number.match(reg) != null) return "troy";

  return "visa";
});

const generateCardNumberMask = computed(() => {
  return getCardType.value === isAmex.value ? amexCardMask : otherCardMask;
});

const minCardMonth = computed(() => {
  if (Number(cardYear.value) === minCardYear.value)
    return new Date().getMonth() + 1;
  return 1;
});

const flipCard = (status: boolean) => {
  isCardFlipped.value = status;
};

const focusInput = (e: any) => {
  isInputFocused.value = true;
  let targetRef = e?.target?.dataset?.ref;
  let target = targetRef;

  console.log("Target ref", targetRef);
  console.log("Target", target);

  focusElementStyle.value = {
    width: `${target.offsetWidth}px`,
    height: `${target.offsetHeight}px`,
    transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
  };
};

const blurInput = () => {
  setTimeout(() => {
    if (!isInputFocused.value) {
      focusElementStyle.value = null;
    }
  }, 300);
  isInputFocused.value = false;
};

watch(cardYear, () => {
  if (Number(cardMonth.value) < minCardMonth.value) {
    cardMonth.value = "";
  }
});

onMounted(() => {
  cardNumberTemP.value = otherCardMask.value;
  cardNumberInput.value?.focus();
}); 
</script>-->
<script lang="ts">
import { defineComponent } from "vue";
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";

export default defineComponent({
  name: "AddPayment",

  components: {
    PasswordLayout,
  },

  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "###############",
      otherCardMask: "################",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: {},
      isInputFocused: false,
      pageTitle: "Payment Method",
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber")?.focus();
  },
  computed: {
    getCardType() {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp("^9792");
      if (number.match(re) != null) return "troy";

      return "visa"; // default type
    },
    generateCardNumberMask(): string {
      return this.getCardType === "amex"
        ? this.amexCardMask
        : this.otherCardMask;
    },
    minCardMonth() {
      if (Number(this.cardYear) === this.minCardYear)
        return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (Number(this.cardMonth) < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },
  methods: {
    flipCard(status: boolean) {
      this.isCardFlipped = status;
    },
    focusInput(e: any) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target: any = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      };
    },
    blurInput() {
      setTimeout(() => {
        if (!this.isInputFocused) {
          this.focusElementStyle = {};
        }
      }, 300);
      this.isInputFocused = false;
    },
  },
});
</script>
<style lang="scss">
@import "@/styles/pages/Profile/settings";
@import "@/styles/components/card";
</style>
