import { createApp } from "vue";

import "@/styles/main.scss";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { rootStore, rootStoreKey } from "./store";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

/*
  Global component registration
*/
import BaseButton from "@/components/ui/BaseButton.vue";
import SecondButton from "@/components/ui/SecondaryButton.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import BaseInputField from "@/components/ui/BaseInputField.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseRadioField from "@/components/ui/BaseRadioField.vue";
import BaseCheckField from "@/components/ui/BaseCheckField.vue";
import BasePinInputField from "@/components/ui/BasePinInputField.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import AppAccordion from "@/components/ui/AppAccordion.vue";
import BaseErrorAlert from "@/components/ui/BaseErrorAlert.vue";
import BaseSuccessAlert from "@/components/ui/BaseSuccessAlert.vue";
import CountDown from "@/components/ui/CountDown.vue";
import BaseSelectField from "@/components/ui/BaseSelectField.vue";

const app = createApp(App);

/*
  Global components registration
*/
app.component("BaseButton", BaseButton);
app.component("SecondButton", SecondButton);
app.component("ErrorMessage", ErrorMessage);
app.component("BaseInputField", BaseInputField);
app.component("BasePinInputField", BasePinInputField);
app.component("BaseModal", BaseModal);
app.component("AppAccordion", AppAccordion);
app.component("BaseRadioField", BaseRadioField);
app.component("BaseCheckField", BaseCheckField);
app.component("BaseTextArea", BaseTextArea);
app.component("BaseErrorAlert", BaseErrorAlert);
app.component("BaseSuccessAlert", BaseSuccessAlert);
app.component("CountDown", CountDown);
app.component("BaseSelectField", BaseSelectField);
dayjs.extend(duration);

app.use(rootStore, rootStoreKey);
app.use(router);
app.mount("#app");
