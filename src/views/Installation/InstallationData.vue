<template>
  <div class="quote--summary">
    <h4 class="quote--summary__heading">Submitted Details</h4>

    <div class="quote--summary__context">
      <!-- House Location -->
      <AppAccordion>
        <template v-slot:title>
          <span class="quote--accordion__header">House Location</span>
        </template>
        <template v-slot:content>
          <div class="quote--accordion__body">
            <div class="quote--accordion__body-cont">
              <p class="textfield-label">What's your location?</p>
              <div class="quote--details">
                <p>67, Ebenezer Akintuni Street.</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                What's your nearest landmark or bus stop?
              </p>
              <div class="quote--details">
                <p>Bayota bus stop</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">What's the type of your building?</p>
              <div class="quote--details">
                <p>Storey building</p>
              </div>
            </div>
          </div>
        </template>
      </AppAccordion>

      <!-- Power need -->
      <AppAccordion>
        <template v-slot:title>
          <span class="quote--accordion__header">Power need</span>
        </template>
        <template v-slot:content>
          <div class="quote--accordion__body">
            <div class="quote--accordion__body-cont">
              <p class="textfield-label">How many bedroom is your apartment?</p>
              <div class="quote--details">
                <p>4 Rooms</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                How many ligh bulbs do you have in all?
              </p>
              <div class="quote--details">
                <p>24 light bubls</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">How many fans do you have in all?</p>
              <div class="quote--details">
                <p>6 Fans</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                How many TVs would you like to run simultaneously?
              </p>
              <div class="quote--details">
                <p>2 TVs</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                What other equipments would you want to power on your inverter?
              </p>
              <div class="quote--details">
                <ul>
                  <li>Refrigerator</li>
                  <li>Air Conditioner</li>
                </ul>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                How many hours do you require power in a day?
              </p>
              <div class="quote--details">
                <p>12hrs/day</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                How many hours of power do you have on a daily basis from PHCN?
              </p>
              <div class="quote--details">
                <p>8hrs/day</p>
              </div>
            </div>

            <div class="quote--accordion__body-cont">
              <p class="textfield-label">
                If you have a generator, what is the capacity?
              </p>
              <div class="quote--details">
                <p>2 KVA</p>
              </div>
            </div>
          </div>
        </template>
      </AppAccordion>

      <BaseButton buttonText="Edit Quote Request" class="quote--button" />
    </div>
  </div>
</template>
