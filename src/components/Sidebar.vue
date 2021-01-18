<template>
  <div>
    <div class="flex items-center">
      <button
        class="mr-4 hover:bg-blue-400 text-black font-semibold py-2 px-2 border-blue-400 rounded"
        aria-label="Open Menu"
        @click="drawer"
      >
        <icon-base icon-name="profile"><icon-profile /></icon-base>
      </button>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b"
      >
        <img
          v-if="user.image"
          src="/logos/fox-hub.png"
          alt="Logo"
          class="h-auto w-32 mx-auto"
        />
        {{ user.email }}
      </span>
      <!-- Links -->
      <section class="grid grid-cols-auto gap-8 col-span-2 ml-4 mt-4">
        <span
          v-for="(link, index) in links"
          :key="index"
          @click="isOpen = false"
          :class="$route.name === link.path ? 'hidden' : ''"
          class="flex items-center hover:bg-indigo-500 hover:text-white"
        >
          <icon-base :icon-name="link.iconName"
            ><component v-bind:is="link.component"
          /></icon-base>
          <router-link
            :to="link.path"
            class="text-black text-xl ml-4 mt-2"
            v-if="user"
            >{{ link.name }}</router-link
          ></span
        >
      </section>

      <!-- <span

        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
      >
        <span>Callendar</span></span
      >
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
        </span>
        <span>Datos</span></span
      >
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </span>
        <span>Como Usar</span></span
      >
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </span>
        <span>Contacto</span></span
      > -->
      <!-- Links -->
      <div class="fixed bottom-0 w-full">
        <button
          class="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full"
        >
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="h-6 w-6 mr-2"
          >
            <path
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            ></path>
          </svg>
          <span>Salir</span>
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
import IconBase from "./IconBase.vue";
import IconAbout from "./icons/IconAbout.vue";
import IconCalendar from "./icons/IconCalendar.vue";
import IconData from "./icons/IconData.vue";
import IconTime from "./icons/IconTime.vue";
import IconContact from "./icons/IconContact.vue";
import IconProfile from "./icons/IconProfile.vue";
export default {
  components: {
    IconBase,
    IconTime,
    IconCalendar,
    IconData,
    IconAbout,
    IconContact,
    IconProfile,
  },
  data() {
    return {
      isOpen: false,
      links: [
        {
          iconName: "time",
          component: IconTime,
          path: "dashboard",
          name: "Asistencia",
        },
        {
          iconName: "calendar",
          component: IconCalendar,
          path: "calendar",
          name: "Calendar",
        },
        {
          iconName: "data",
          component: IconData,
          path: "data",
          name: "Datos",
        },
        {
          iconName: "about",
          component: IconAbout,
          path: "about",
          name: "Como Usar",
        },
        {
          iconName: "contact",
          component: IconContact,
          path: "contact",
          name: "Contacto",
        },
      ],
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
  },
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
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
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
