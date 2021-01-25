<template>
  <div id="app" class="container pb-24">
    <Header />
    <Alerts />
    <Sidebar />
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
  import Footer from "./components/Footer.vue";
  import Header from "./components/Header.vue";
  import Sidebar from "./components/Sidebar.vue";

  export default {
    data() {
      return {};
    },
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

  .gg-log-out {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 6px;
    height: 16px;
    border: 2px solid;
    transform: scale(var(--ggs, 1));
    border-right: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    margin-left: -10px;
  }

  .gg-log-out::after,
  .gg-log-out::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
  }

  .gg-log-out::after {
    border-top: 2px solid;
    border-left: 2px solid;
    transform: rotate(-45deg);
    width: 8px;
    height: 8px;
    left: 4px;
    bottom: 2px;
  }

  .gg-log-out::before {
    border-radius: 3px;
    width: 10px;
    height: 2px;
    background: currentColor;
    left: 5px;
    bottom: 5px;
  }

  .enterTime {
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yMTguNjY3OTY5IDI0MGgtMjAyLjY2Nzk2OWMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OS0xNi0xNnM3LjE2Nzk2OS0xNiAxNi0xNmgyMDIuNjY3OTY5YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48cGF0aCBkPSJtMTM4LjY2Nzk2OSAzMjBjLTQuMDk3NjU3IDAtOC4xOTE0MDctMS41NTg1OTQtMTEuMzA4NTk0LTQuNjkxNDA2LTYuMjUtNi4yNTM5MDYtNi4yNS0xNi4zODY3MTkgMC0yMi42MzY3MTlsNjguNjk1MzEzLTY4LjY5MTQwNi02OC42OTUzMTMtNjguNjcxODc1Yy02LjI1LTYuMjUzOTA2LTYuMjUtMTYuMzg2NzE5IDAtMjIuNjM2NzE5czE2LjM4MjgxMy02LjI1IDIyLjYzNjcxOSAwbDgwIDgwYzYuMjUgNi4yNSA2LjI1IDE2LjM4MjgxMyAwIDIyLjYzNjcxOWwtODAgODBjLTMuMTM2NzE5IDMuMTMyODEyLTcuMjM0Mzc1IDQuNjkxNDA2LTExLjMyODEyNSA0LjY5MTQwNnptMCAwIi8+PHBhdGggZD0ibTM0MS4zMzIwMzEgNTEyYy0yMy41MzEyNSAwLTQyLjY2NDA2Mi0xOS4xMzY3MTktNDIuNjY0MDYyLTQyLjY2Nzk2OXYtMzg0YzAtMTguMjM4MjgxIDExLjYwNTQ2OS0zNC41MTU2MjUgMjguODgyODEyLTQwLjUxMTcxOWwxMjguMTcxODc1LTQyLjczMDQ2OGMyOC42NzE4NzUtOC43ODkwNjMgNTYuMjc3MzQ0IDEyLjQ4MDQ2OCA1Ni4yNzczNDQgNDAuNTc4MTI1djM4NGMwIDE4LjIxODc1LTExLjYwNTQ2OSAzNC40NzI2NTYtMjguODYzMjgxIDQwLjQ4ODI4MWwtMTI4LjIxNDg0NCA0Mi43NTM5MDZjLTQuNjcxODc1IDEuNDQ5MjE5LTkgMi4wODk4NDQtMTMuNTg5ODQ0IDIuMDg5ODQ0em0xMjgtNDgwYy0xLjM4NjcxOSAwLTIuNTU4NTkzLjE3MTg3NS0zLjgxNjQwNi41NTQ2ODhsLTEyNy42MzY3MTkgNDIuNTU4NTkzYy00LjE4MzU5NCAxLjQ1MzEyNS03LjIxMDkzNyA1LjY3NTc4MS03LjIxMDkzNyAxMC4yMTg3NXYzODRjMCA3LjI3NzM0NCA3Ljg5MDYyNSAxMi4xODM1OTQgMTQuNDg0Mzc1IDEwLjExMzI4MWwxMjcuNjM2NzE4LTQyLjU1ODU5M2M0LjE2MDE1Ny0xLjQ1MzEyNSA3LjIxMDkzOC01LjY3NTc4MSA3LjIxMDkzOC0xMC4yMTg3NXYtMzg0YzAtNS44NjcxODgtNC43NzczNDQtMTAuNjY3OTY5LTEwLjY2Nzk2OS0xMC42Njc5Njl6bTAgMCIvPjxwYXRoIGQ9Im0xODYuNjY3OTY5IDEwNi42Njc5NjljLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZ2LTMyYzAtMzIuMzYzMjgxIDI2LjMwMDc4MS01OC42Njc5NjkgNTguNjY0MDYyLTU4LjY2Nzk2OWgyNDBjOC44MzIwMzEgMCAxNiA3LjE2Nzk2OSAxNiAxNnMtNy4xNjc5NjkgMTYtMTYgMTZoLTI0MGMtMTQuNjk5MjE5IDAtMjYuNjY0MDYyIDExLjk2ODc1LTI2LjY2NDA2MiAyNi42Njc5Njl2MzJjMCA4LjgzMjAzMS03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTMxNC42Njc5NjkgNDQ4aC04NS4zMzU5MzhjLTMyLjM2MzI4MSAwLTU4LjY2NDA2Mi0yNi4zMDQ2ODgtNTguNjY0MDYyLTU4LjY2Nzk2OXYtMzJjMC04LjgzMjAzMSA3LjE2Nzk2OS0xNiAxNi0xNnMxNiA3LjE2Nzk2OSAxNiAxNnYzMmMwIDE0LjY5OTIxOSAxMS45NjQ4NDMgMjYuNjY3OTY5IDI2LjY2NDA2MiAyNi42Njc5NjloODUuMzM1OTM4YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48L3N2Zz4=");
    background-size: 20px;
  }

  .leaveTime {
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyLjAxNiA1MTIiIHdpZHRoPSI1MTJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDk2IDI0MC4wMDc4MTJoLTIwMi42Njc5NjljLTguODMyMDMxIDAtMTYtNy4xNjc5NjgtMTYtMTYgMC04LjgzMjAzMSA3LjE2Nzk2OS0xNiAxNi0xNmgyMDIuNjY3OTY5YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTYgMCA4LjgzMjAzMi03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTQxNiAzMjAuMDA3ODEyYy00LjA5NzY1NiAwLTguMTkxNDA2LTEuNTU4NTkzLTExLjMwODU5NC00LjY5MTQwNi02LjI1LTYuMjUzOTA2LTYuMjUtMTYuMzg2NzE4IDAtMjIuNjM2NzE4bDY4LjY5NTMxMy02OC42OTE0MDctNjguNjk1MzEzLTY4LjY5NTMxMmMtNi4yNS02LjI1LTYuMjUtMTYuMzgyODEzIDAtMjIuNjMyODEzIDYuMjUzOTA2LTYuMjUzOTA2IDE2LjM4NjcxOS02LjI1MzkwNiAyMi42MzY3MTkgMGw4MCA4MGM2LjI1IDYuMjUgNi4yNSAxNi4zODI4MTMgMCAyMi42MzI4MTNsLTgwIDgwYy0zLjEzNjcxOSAzLjE1NjI1LTcuMjMwNDY5IDQuNzE0ODQzLTExLjMyODEyNSA0LjcxNDg0M3ptMCAwIi8+PHBhdGggZD0ibTE3MC42Njc5NjkgNTEyLjAwNzgxMmMtNC41NjY0MDcgMC04Ljg5ODQzOC0uNjQwNjI0LTEzLjIyNjU2My0xLjk4NDM3NGwtMTI4LjM4NjcxOC00Mi43NzM0MzhjLTE3LjQ2ODc1LTYuMTAxNTYyLTI5LjA1NDY4OC0yMi4zNzg5MDYtMjkuMDU0Njg4LTQwLjU3NDIxOXYtMzg0YzAtMjMuNTMxMjUgMTkuMTM2NzE5LTQyLjY2Nzk2ODUgNDIuNjY3OTY5LTQyLjY2Nzk2ODUgNC41NjI1IDAgOC44OTQ1MzEuNjQwNjI1NSAxMy4yMjY1NjIgMS45ODQzNzU1bDEyOC4zODI4MTMgNDIuNzczNDM3YzE3LjQ3MjY1NiA2LjEwMTU2MyAyOS4wNTQ2ODcgMjIuMzc4OTA2IDI5LjA1NDY4NyA0MC41NzQyMTl2Mzg0YzAgMjMuNTMxMjUtMTkuMTMyODEyIDQyLjY2Nzk2OC00Mi42NjQwNjIgNDIuNjY3OTY4em0tMTI4LTQ4MGMtNS44NjcxODggMC0xMC42Njc5NjkgNC44MDA3ODItMTAuNjY3OTY5IDEwLjY2Nzk2OXYzODRjMCA0LjU0Mjk2OSAzLjA1MDc4MSA4Ljc2NTYyNSA3LjQwMjM0NCAxMC4yODEyNWwxMjcuNzg1MTU2IDQyLjU4MjAzMWMuOTE3OTY5LjI5Njg3NiAyLjExMzI4MS40Njg3NSAzLjQ4MDQ2OS40Njg3NSA1Ljg2NzE4NyAwIDEwLjY2NDA2Mi00LjgwMDc4MSAxMC42NjQwNjItMTAuNjY3OTY4di0zODRjMC00LjU0Mjk2OS0zLjA1MDc4MS04Ljc2NTYyNS03LjQwMjM0My0xMC4yODEyNWwtMTI3Ljc4NTE1Ny00Mi41ODIwMzJjLS45MTc5NjktLjI5Njg3NC0yLjExMzI4MS0uNDY4NzUtMy40NzY1NjItLjQ2ODc1em0wIDAiLz48cGF0aCBkPSJtMzI1LjMzMjAzMSAxNzAuNjc1NzgxYy04LjgzMjAzMSAwLTE2LTcuMTY3OTY5LTE2LTE2di05NmMwLTE0LjY5OTIxOS0xMS45NjQ4NDMtMjYuNjY3OTY5LTI2LjY2NDA2Mi0yNi42Njc5NjloLTI0MGMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OC0xNi0xNiAwLTguODMyMDMxIDcuMTY3OTY5LTE1Ljk5OTk5OTUgMTYtMTUuOTk5OTk5NWgyNDBjMzIuMzYzMjgxIDAgNTguNjY0MDYyIDI2LjMwNDY4NzUgNTguNjY0MDYyIDU4LjY2Nzk2ODV2OTZjMCA4LjgzMjAzMS03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTI4Mi42Njc5NjkgNDQ4LjAwNzgxMmgtODUuMzM1OTM4Yy04LjgzMjAzMSAwLTE2LTcuMTY3OTY4LTE2LTE2IDAtOC44MzIwMzEgNy4xNjc5NjktMTYgMTYtMTZoODUuMzM1OTM4YzE0LjY5OTIxOSAwIDI2LjY2NDA2Mi0xMS45Njg3NSAyNi42NjQwNjItMjYuNjY3OTY4di05NmMwLTguODMyMDMyIDcuMTY3OTY5LTE2IDE2LTE2czE2IDcuMTY3OTY4IDE2IDE2djk2YzAgMzIuMzYzMjgxLTI2LjMwMDc4MSA1OC42Njc5NjgtNTguNjY0MDYyIDU4LjY2Nzk2OHptMCAwIi8+PC9zdmc+");
    background-size: 20px;
  }
</style>