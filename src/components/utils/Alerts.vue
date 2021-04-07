<template>
  <transition name="fade">
    <div
      @click="clearNotification"
      v-if="showNotification"
      class="top-0 mt-20 flex flex-col justify-around items-center h-64 w-full bg-gray-700 setSuperZindex"
      :class="[`glass-${notificationType}`]"
    >
      <span class="w-2/3 h-20 mx-auto text-gray-100 text-2xl text-center">
        {{ notificationMessage }}</span
      >
      <svg
        v-show="notificationType === 'success'"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            class="circle"
            d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
          />
          <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
        </g>
      </svg>
      <!-- <a
      class="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
    "
      href="https://support.google.com/accounts/answer/3467281?hl=es-419"
    >
      Como administrar tu ubicación</a
    > -->
      <button class="my-3 mx-auto w-full">
        <span
          v-if="notificationType === 'error'"
          class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
          @click="pageReload"
          >Recargar</span
        >
        <span
          v-else
          class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
          >Cerrar</span
        >
      </button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "Alert",
  // watch: {
  //   notificationMessage(newValue, oldValue) {
  //     console.log(`Updating from ${oldValue} to ${newValue}`);
  //   },
  // },
  methods: {
    ...mapActions("notifi", ["clearNotification"]),
    pageReload() {
      this.$router.go(this.$router.path);
    },
  },
  computed: {
    ...mapGetters("notifi", ["notificationMessage", "notificationType"]),
    ...mapState({
      geolocation: state => state.geolocation,
    }),
    showNotification() {
      return !!this.notificationType;
    },
  },
};
</script>

<style scoped>
.setSuperZindex {
  z-index: 99999;
  position: absolute;
}

svg {
  display: block;
  height: 15vw;
  width: 15vw;
  color: #03f497;
  /* SVG path use currentColor to inherit this */
}

.circle {
  stroke-dasharray: 76;
  stroke-dashoffset: 76;
  -webkit-animation: draw 1s forwards;
  animation: draw 1s forwards;
}

.tick {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  -webkit-animation: draw 1s forwards 1s;
  animation: draw 1s forwards 1s;
}

@-webkit-keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
