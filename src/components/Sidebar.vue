<template>
  <div v-if="user">
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
        v-show="isOpen"
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
      class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="overflow-hidden shadow max-w-xs">
        <div
          class="bg-gradient-to-r from-green-400 to-blue-500 w-full h-16 rounden-b-lg"
        ></div>
        <div class="flex justify-center -mt-8">
          <img
            :src="
              user.photoURL
                ? user.photoURL
                : 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/51709353_1143587805818388_6243076857017663488_n.jpg?_nc_cat=108&ccb=2&_nc_sid=85a577&_nc_ohc=yHuEbw6H53kAX-mA7Iu&_nc_ht=scontent-cdg2-1.xx&oh=60649a0eae8da3584e9fd1afc2a05d07&oe=602C5652'
            "
            class="rounded-full border-solid border-white border-2 mt-3 w-24 h-auto"
          />
        </div>
        <div class="text-center px-3 pb-6 pt-2">
          <h3 class="text-black text-xl bold font-sans">
            {{ user.displayName }}
          </h3>
          <p class="mt-2 font-sans font-light text-gray-700">
            {{ user.email }}
          </p>
        </div>
        <div class="flex justify-center pb-3 text-grey-dark">
          <div class="text-center mr-3 border-r pr-3">
            <h2>0 h</h2>
            <span>Horas Exra</span>
          </div>
          <div class="text-center">
            <h2>22 d</h2>
            <span>Vacaciones</span>
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
        <a
          rel="noopener"
          class="flex items-center p-4 bg-orange-700 text-white"
          href="https://www.buymeacoffee.com/fayazahmed"
          target="_blank"
        >
          <img
            class="mr-2 h-8 w-auto"
            src="/sidebar/bmc.svg"
            alt="Buy Me Coffee"
          />
          <p>
            <span class="font-bold">Buy me a Coffee</span>
            <br />
            <span class="text-sm text-white">Help me keep this site alive</span>
          </p>
        </a>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27 && this.isOpen) this.toggleSidebar;
    });
  },
  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    ...mapState({
      isOpen: "showSidebar",
    }),
  },
  methods: {
    ...mapActions(["toggleSidebar"]),
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
