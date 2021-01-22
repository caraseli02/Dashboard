<template>
  <header class="glass-light">
    <div class="mx-auto flex justify-center items-center">
      <nav class="flex items-center justify-between md:justify-between w-full">
        <section class="flex justify-between items-center p-3">
          <button
            v-if="!loadingMap"
            class="ml-2 flex justify-center items-center p-2"
            @click="showMapAction"
            :class="
              showMap ? 'bg-gray-100 rounded-l-lg' : 'glass-gray rounded-lg'
            "
          >
            <icon-base icon-name="maps">
              <icon-maps />
            </icon-base>
            Mapa
          </button>
          <button
            v-if="loadingMap"
            type="button"
            class="mx-auto text-sm"
            disabled
          >
            <svg class="animate-spin h-4 w-4 mx-auto" viewBox="0 0 24 24">
              <path
                d="M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949
                  c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232
                  c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0
                  c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25
                  C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813
                  l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118
                  C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559
                  C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719
                  C13.547,14.992,12.008,15.752,10.288,15.752z"
              ></path>
            </svg>
          </button>
          <span
            v-if="showMap"
            @click="showMapAction"
            class="text-center text-gray-900 
          bg-gradient-to-r from-red-400 via-pink-500 to-red-500 
          font-bold rounded-r-lg p-2"
          >
            x
          </span>
          <router-link
            to="/"
            class="ml-2 flex justify-center items-center p-2 rounded-lg glass-gray"
            v-if="!user && $route.path !== '/'"
            >Inicio</router-link
          >
          <router-link
            to="sign-in"
            class="ml-2 flex justify-center items-center p-2 rounded-lg glass-gray"
            v-if="!user && $route.path !== '/sign-in'"
            >Entrar</router-link
          >
          <router-link
            to="sign-up"
            class="ml-2 flex justify-center items-center p-2 rounded-lg glass-gray"
            v-if="!user && $route.path !== '/sign-up'"
            >Registrate</router-link
          >
          <!-- Side Bar -->
        </section>
        <div v-if="user" @click="toggleSidebar" class="flex items-center">
          <button
            class="flex justify-center items-center p-3 rounded-lg"
            :class="showSidebar ? 'bg-gray-300' : 'glass-gray'"
            aria-label="Open Menu"
          >
            <icon-base icon-name="profile">
              <icon-profile />
            </icon-base>
          </button>
        </div>
        <button
          @click="closeSession"
          class="flex justify-center items-center p-3 rounded-lg glass-gray mr-2"
          v-if="user"
        >
          Salir
          <icon-base icon-name="arrowRight">
            <icon-arrowRight />
          </icon-base>
        </button>
      </nav>
      <!-- <h2 v-if="user">{{ user.email }}</h2> -->
    </div>
  </header>
</template>

<script>
import IconBase from "./IconBase.vue";
import IconMaps from "./icons/IconMaps.vue";
import IconProfile from "./icons/IconProfile.vue";
import IconArrowRight from "./icons/IconArrowRight.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  components: { IconBase, IconMaps, IconArrowRight, IconProfile },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapState({
      showMap: state => state.showMap,
      showSidebar: state => state.showSidebar,
      loadingMap: state => state.loadingMap,
    }),
    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
  methods: {
    ...mapActions(["showMapAction", "toggleSidebar"]),
    ...mapActions("auth", ["signOut"]),
    async closeSession() {
      await this.signOut().then(() => this.$router.replace("sign-in"));
    },
  },
};
</script>
