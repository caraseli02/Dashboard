<template>
  <div id="app" :class="`container ${theme}_bg pb-12`">
    <Header />
    <Alerts />
    <transition name="slide-fade" mode="out-in">
      <gpsLoad v-if="loadingMap" />
    </transition>
    <Sidebar />
    <updateAlert v-if="updateExists">
      <button
        @click="refreshApp"
        class="bg-transparent hover:bg-gray-100 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
      >
        OK
      </button>
    </updateAlert>
    <main class="container mx-auto py-5">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <!-- <Footer /> -->
    <a
      class="text-primary fixed bottom-0 right-0 bg-primary p-2 rounded mr-2 -mb-24"
      href="http://www.freepik.com"
    >
      Image Designed by pikisuperstar / Freepik</a
    >
  </div>
</template>

<script>
import Alerts from "@/components/utils/Alerts.vue";
import updateAlert from "@/components/utils/updateAlert.vue";
import gpsLoad from "@/components/utils/gpsLoad.vue";
import { mapActions, mapState, mapGetters } from "vuex";
// import Footer from "./components/Navigation/Footer.vue";
import Header from "./components/Navigation/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import update from "./mixins/update";

export default {
  data() {
    return {};
  },
  name: "App",
  mixins: [update],
  components: {
    Header,
    // Footer,
    Alerts,
    Sidebar,
    updateAlert,
    gpsLoad,
  },
  computed: {
    ...mapState({
      geolocation: state => state.geolocation,
      loadingMap: state => state.loadingMap,
    }),
    ...mapGetters({ theme: "theme/getTheme", user: "auth/getUser" }),
  },
  watch: {
    theme(newTheme) {
      newTheme === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },
  methods: {
    ...mapActions("notifi", ["showNotification"]),
    ...mapActions("auth", ["setUser"]),
    ...mapActions([
      "currentLocation", // -> this['some/nested/module/bar']()
    ]),
  },
  mounted() {
    if (this.updateExists) {
      this.$confirm("Instalar version reciente?").then(() => {
        this.refreshApp;
      });
    }
  },
  async created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    await this.setUser();
  },
};
</script>

<style>
@import "./assets/css/icons.css";

.container {
  min-width: 100vw;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (min-width: 480px) {
    flex-direction: row;
  }
}

.dark_bg {
  background-image: url("assets/img/dark_bg.svg");
}

.light_bg {
  background-image: url("assets/img/light_bg.svg");
}

.glass-error,
.glass-success,
.glass-light,
.glass-gray,
.glass-dark {
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  z-index: 2;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.glass-dark {
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.5);
}

.glass-success {
  background: rgba(1, 130, 11, 0.6);
  border: 2px solid rgba(0, 255, 170, 0.2);
}

.glass-error {
  background: rgba(216, 1, 1, 0.6);
  border: 2px solid rgba(238, 4, 4, 0.2);
}

.glass-gray {
  background: rgba(138, 136, 136, 0.2);
  padding: 15px;
  border: none;
}

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700|Material+Icons");

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active below version 2.1.8 */
 {
  transform: translateY(10px);
  opacity: 0;
}
</style>
