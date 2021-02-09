<template>
  <div id="app" class="container pb-24">
    <Header />
    <Alerts />
    <Sidebar />
    <div v-if="updateExists" class="alert-banner w-full h-screen fixed top-0 z-50 ">
      <input type="checkbox" class="hidden" id="banneralert" />

      <label class="close cursor-pointer flex items-center justify-between w-full p-6 bg-red-700 shadow text-white"
        title="close" for="banneralert">
        Instalar version reciente?
        <button @click="refreshApp"
          class="bg-transparent hover:bg-gray-100 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded">
          OK
        </button>
      </label>
    </div>
    <HereMap class="z-20 absolute" v-if="showMap" :center="geolocation" />
    <main class="container mx-auto py-5">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
  import HereMap from "@/components/HereMap.vue";
  import Alerts from "@/components/utils/Alerts.vue";
  import { mapActions, mapState } from "vuex";
  import Footer from "./components/Navigation/Footer.vue";
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
      Footer,
      HereMap,
      Alerts,
      Sidebar,
    },
    computed: mapState([
      // map this.count to store.state.count
      "showMap",
      "geolocation",
    ]),
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
    created() {
      // when the app is created run the set user method
      // this uses Vuex to check if a user is signed in
      // check out mutations in the store.js file
      this.setUser();
      this.currentLocation();
    },
  };
</script>

<style>
  @import "./assets/css/icons.css";

  .alert-banner {
    -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    background-color: rgba(0, 0, 0, 0.4);
  }

  /*Banner close animation*/
  .alert-banner input:checked~* {
    -webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

  .container {
    min-width: 100vw;
    min-height: 100vh;
    background-image: url("https://i.ibb.co/JdbWM6K/background.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    @media only screen and (min-width: 480px) {
      flex-direction: row;
    }
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
    background: rgba(0, 0, 0, 0.6);
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

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
</style>