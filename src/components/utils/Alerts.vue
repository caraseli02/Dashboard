<template>
  <transition name="slide-fade" mode="out-in">
    <div v-click-outside-app="defocusApp" @click="clearNotification" v-if="showNotification" id="alertMsg"
      class="top-0 flex justify-center items-start w-full bg-gray-200 dark:bg-gray-700 setSuperZindex rounded-none"
      :class="[`glass-${notificationType}`]">
      <span class="w-3/5 ml-4 my-6 text-primary text-xl text-left rounded-full">
        {{ notificationMessage }}</span>
      <div class="self-center mr-8">
        <svg v-show="notificationType === 'success'" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round">
            <path class="circle"
              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z" />
            <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
          </g>
        </svg>
      </div>
      <!-- <a
      class="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
    "
      href="https://support.google.com/accounts/answer/3467281?hl=es-419"
    >
      Como administrar tu ubicación</a
    > -->
      <button class="my-1 absolute top-0 right-0">
        <span v-if="notificationType === 'error'"
          class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-sm rounded h-24"
          @click="pageReload">Recargar</span>
        <span v-else class="hover:bg-green-400 text-white py-2 px-4 text-lg rounded">❌</span>
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
      defocusApp() {
        this.$root.$emit("defocusApp"); // emitted event
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
    directives: {
      "click-outside-app": {
        bind: function (el, binding) {
          // Define ourClickEventHandler
          const ourClickEventHandler = event => {
            if (!el.contains(event.target) && el !== event.target) {
              // as we are attaching an click event listern to the document (below)
              // ensure the events target is outside the element or a child of it
              binding.value(event); // before binding it
            }
          };
          // attached the handler to the element so we can remove it later easily
          el.__vueClickEventHandler__ = ourClickEventHandler;

          // attaching ourClickEventHandler to a listener on the document here
          document.addEventListener("click", ourClickEventHandler);
        },
        unbind: function (el) {
          // Remove Event Listener
          document.removeEventListener("click", el.__vueClickEventHandler__);
        },
      },
    },
    created() {
      this.$root.$on("defocusApp", this.clearNotification);
    }
  };
</script>

<style scoped>
  .setSuperZindex {
    z-index: 99999;
    position: fixed;
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