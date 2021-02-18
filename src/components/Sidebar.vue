<template>
  <div v-if="getUser && userData[0]" >
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="toggleSidebar"
        v-show="showSidebar"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="toggleSidebar"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      v-if="userData"
      class="transform top-0 left-0 w-64 bg-gray-300 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="overflow-hidden shadow max-w-xs">
        <div
          class="bg-gradient-to-r from-green-400 to-blue-500 w-full h-16 rounden-b-lg"
        ></div>
        <div class="flex justify-center -mt-8">
          <img
            :src="
              getUser.photoURL
                ? getUser.photoURL
                : 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/51709353_1143587805818388_6243076857017663488_n.jpg?_nc_cat=108&ccb=2&_nc_sid=85a577&_nc_ohc=yHuEbw6H53kAX-mA7Iu&_nc_ht=scontent-cdg2-1.xx&oh=60649a0eae8da3584e9fd1afc2a05d07&oe=602C5652'
            "
            class="rounded-full border-solid border-white border-2 mt-3 w-24 h-auto"
          />
        </div>
        <div class="text-center px-3 pb-6 pt-2">
          <h3 class="text-black text-xl bold font-sans">
            {{ getUser.displayName }}
          </h3>
          <p class="mt-2 font-sans font-light text-gray-700">
            {{ getUser.email }}
          </p>
        </div>
        <div class="flex justify-center pb-3 text-grey-dark">
          <div class="text-center mr-3 border-r pr-3">
            <span>Horas Exra</span>
            <h2>0 h</h2>
          </div>
          <div class="text-center">
            <span>Vacaciones</span>
            <h2>22 d</h2>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Horario de Trabajo
        </label>
        <div v-if="!userData[0]" class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>40 horas</option>
            <option>39 horas</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          class="flex items-center bg-gray-200 p-2 glass-light shadow rounded-lg"
        >
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-10 w-10 text-blue-600 bg-gray-100 rounded-full mr-6 shadow-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 5.07089C16.3923 5.55612 19 8.47353 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 9.96159 5.87128 8.12669 7.26175 6.84738L5.84658 5.43221C4.09461 7.0743 3 9.40932 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C11.662 3 11.3283 3.01863 11 3.05493V9.08551H13V5.07089Z"
                fill="currentColor"
              />
              <path
                d="M7.70711 8.70708C7.31658 9.0976 7.31658 9.73077 7.70711 10.1213L10.5355 12.9497C10.9261 13.3402 11.5592 13.3402 11.9497 12.9497C12.3403 12.5592 12.3403 11.926 11.9497 11.5355L9.12132 8.70708C8.7308 8.31655 8.09763 8.31655 7.70711 8.70708Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="flex">
            <span
              v-if="'schedule' in userData[0]"
              class="block text-base font-bold text-gray-700 mt-2"
              >{{ userData[0]["schedule"] }}h</span
            >
            <span
              v-if="userData[0].eatHour"
              class="text-xs font-bold ml-4 flex flex-col justify-center items-center"
              ><i class="gg-coffee"></i> 15:00/16:00</span
            >
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Centro de Trabajo
        </label>
        <div v-if="!userData[0]['workplace']" class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Palma de Mallorca</option>
            <option>Sevilla</option>
            <option>Valencia</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          class="flex items-center bg-gray-200 p-2 glass-light shadow rounded-lg"
        >
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-blue-600 bg-gray-100 rounded-full mr-6 shadow-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <span class="block text-3xl font-bold"></span>
            <span
              v-if="'workplace' in userData[0]"
              class="block text-base font-bold text-gray-700"
              >{{ userData[0]["workplace"] }}</span
            >
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 w-full">
        <button
          @click="closeSession"
          class="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full"
        >
          <span class="gg-log-out mr-4 ml-2"></span>
          <span>Cerrar Session</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  watch: {
    showSidebar: {
      immediate: true,
      handler(showSidebar) {
        if (process.client) {
          if (showSidebar)
            document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.showSidebar) this.toggleSidebar;
    });
  },
  async created() {
    await this.getUserData();
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapState(["showSidebar", "userData"]),
  },
  methods: {
    ...mapActions(["toggleSidebar", "getUserData"]),
    ...mapActions("auth", ["signOut"]),
    async closeSession() {
      await this.toggleSidebar();
      await this.signOut().then(() => {
        this.$router.replace("sign-in");
      });
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 2em;
  height: 2em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #0551b5;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 2;
}
</style>