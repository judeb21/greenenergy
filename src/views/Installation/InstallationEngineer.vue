<template>
  <!-- Engineer -->
  <div class="engineer--container">
    <div class="engineer--container__header">
      <span>Engineer</span>
      <p>Date confirmed</p>
    </div>

    <div class="engineer--container__details">
      <!-- Engineer image and details -->
      <div class="engineer--container__fDetails">
        <div class="engineer--container__image">
          <img src="@/assets/img/engineer.svg" alt="engineer" />
        </div>

        <!-- Engineer Details -->
        <div class="engineer--container__rating">
          <!-- Name and rating -->
          <div class="engineer--container__detail">
            <p class="engineer--container__detail--name">Demola</p>
            <div class="engineer--container__ratings">
              <!-- star rating -->
              <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
              <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
              <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
              <img src="@/assets/img/icons/full-star-icon.svg" alt="" />
              <img src="@/assets/img/icons/half-star-icon.svg" alt="" />
            </div>
          </div>

          <!-- Phone number -->
          <span class="engineer--container__call">+234 803 4000 1290</span>
        </div>
      </div>

      <!-- Call Engineer -->
      <div class="">
        <a href="tel:+23480340001290">
          <img src="@/assets/img/icons/call-icon.svg" alt="" />
        </a>
      </div>
    </div>

    <div class="engineer--container__date">
      <span>Date:</span>
      <p>30th April, 2023 (in 2 days)</p>
    </div>
  </div>

  <!-- hardwares installed -->
  <div class="dashboard--hardwares">
    <h5 class="dashboard--hardwares__header">Hardwares to be installed</h5>
    <p class="dashboard--hardwares__subheader">
      4 solar panels, 2 24OAh Batteries, 18KW inverter, Surge protector and
      more.
    </p>
    <div class="app--notice">
      <img
        class="app--notice__image"
        src="@/assets/img/icons/info-icon.svg"
        alt=""
      />
      <div class="app--notice__text">
        <p>These devices comes with a 24 months warranty</p>
      </div>
    </div>
  </div>
</template>
