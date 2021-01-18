<template>
  <div id="app" class="container pb-24">
    <Header />
    <Alerts />
    <HereMap class="z-20 absolute" v-if="showMap" :center="geolocation" />
    <!-- <h1>Notification Example</h1>
    <button @click="showSuccess">Show Success Notfication</button>
    <button @click="showError">Show Error Notfication</button> -->
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
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    HereMap,
    Alerts,
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

.gg-chevron-double-right {
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(var(--ggs, 1));
  width: 100%;
  height: 100%;
}

.gg-chevron-double-right::after,
.gg-chevron-double-right::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 12px;
  height: 12px;
  border-right: 2px solid;
  border-top: 2px solid;
  transform: rotate(45deg);
  top: 40%;
  right: 8px;
  margin-right: 12px;
}

.gg-chevron-double-right::after {
  right: 14px;
}

.gg-check {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 100px;
}

.gg-check::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 35%;
  top: 12%;
  width: 12px;
  height: 20px;
  border-color: green;
  border-width: 0 5px 3px 0;
  border-style: solid;
  transform-origin: bottom left;
  transform: rotate(45deg);
}
</style>
