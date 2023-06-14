<template>
  <div>
    <div class="payment--container">
      <h4>
        Let's understand your
        <span class="primary-blue">Installation</span> process
      </h4>
      <p>Get started on your solar journey today</p>
    </div>

    <div>
      <div class="quote--building__container">
        <p class="textfield-label">
          Do you have a preferred location in your house that you will want this
          system to be installed?
        </p>
        <div class="quote--building">
          <BaseRadioField labelText="Yes" name="building" value="Yes" />
          <BaseRadioField labelText="No" name="building" value="No" />
        </div>
      </div>

      <BaseInputField
        labelText="Please describe the location, if possible upload a picture of the location by clicking the upload button below"
        placeholder="Describe location"
      />

      <div class="payment--image__container">
        <div class="payment--image">
          <img src="@/assets/img/illustrations/image.svg" alt="" />
        </div>
        <div>
          <p>Add image</p>
          <span>PNG, JPG Max size 1MB</span>
        </div>
        <div class="payment--image__button">
          <input
            ref="fileInput"
            class="file-input"
            type="file"
            v-on:change="onFileChanged"
          />
          <p @click="openFileSelection">Upload</p>
        </div>
      </div>

      <div class="quote--building__container">
        <p class="textfield-label">
          Does your estate or address needs access code to gain entrance?
        </p>
        <div class="quote--building">
          <BaseRadioField labelText="Yes" name="entrance" value="Yes" />
          <BaseRadioField labelText="No" name="entrance" Value="No" />
        </div>
      </div>

      <BaseInputField
        labelText="What's the name of contact person for access code?"
        placeholder="John Doe"
      />

      <BaseInputField
        labelText="What's the phone number of contact person?"
        placeholder="+2340000000000"
      />

      <!-- button -->
      <div class="payment--button">
        <BaseButton buttonText="Proceed" @button-clicked="goToNextSection" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, Ref, ref } from "vue";

const emit = defineEmits(["next-section"]);

let file = ref<File>();
const fileInput = ref<HTMLInputElement | null>(null);

const goToNextSection = () => {
  emit("next-section");
};

const openFileSelection = (): void => {
  fileInput.value?.click();
};

const onFileChanged = (event: any) => {
  let files: FileList = event.target.files;
  let result: File[] = [];
  for (var i = 0; i < files.length; i++) {
    result.push(files.item(i) as File);
  }
  // file.value = result;
  console.log(files);
  console.log(result);
};
</script>
