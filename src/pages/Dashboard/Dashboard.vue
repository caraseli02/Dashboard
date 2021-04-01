<template>
  <article>
    <!-- LOADER -->
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <!-- Month selector  -->
    <monthSelector :bindAsistFunc="true" />
    <!-- Attendence Display -->
    <transition name="slide-fade" mode="out-in">
      <punchIn v-if="dataPunchInLoaded" :checkCalendarToday="checkCalendarToday" :theme="theme" :today="today"
        :selectedMes="selectedMes" :days="days" v-model="temperature">
        <btnVerify :enterFunc="true" :temperature="temperature" :gpsData="gpsData[0]" text="Entrada"
          v-on:toggleLoading="isLoading = $event" :key="isLoading" />
      </punchIn>
    </transition>
    <section v-if="awaitData" class="grid grid-flow-row auto-rows-max gap-4">
      <h3 v-if="actualMonthCheck" class="text-xl font-bold ml-2 text-primary">
        TU ÚLTIMA OPERACIÓN:
      </h3>
      <h3 v-if="d.getMonth() > selectedMes" class="uppercase mt-4 ml-2 font-bold text-center">
        {{
        attendList[0] ? "Sesión sin cerrar" : "No tienes sesiónes sin cerrar"
        }}
      </h3>
      <div v-if="attendList.length > 0">
        <attendInfo :theme="theme" :actualMonthCheck="actualMonthCheck" :attend="attendList[0]" :key="attendList[0].id" />
      </div>
      <transition name="slide-fade" mode="out-in">
        <btnVerify class="mb-8 mt-4" v-if="showPunchOut && dataPunchOutLoaded && actualMonthCheck"
          :value="attendList[0]" :leaveFunc="true" :temperature="temperature" :gpsData="gpsData[0]" text="Salida"
          v-on:togglePunchOut="showPunchOut = $event" />
      </transition>
      <workedTime v-if="attendList[0] && 'activeSession' in attendList[0]" :workedTime="workedTime"
        :actualMonthCheck="actualMonthCheck" :theme="theme" :checkCalendarToday="checkCalendarToday"
        :showCurrentSession="attendList[0].activeSession">
      </workedTime>
      <p v-if="attendList[0] && 'msg' in attendList[0].data && actualMonthCheck"
        :class="`w-24 mx-auto glass-${theme} h-auto p-3 flex justify-start items-start overflow-y-auto`"
        @click="showMsg(attendList[0].data.msg)">
        <icon-base class="mx-4 self-center bg-green-200 rounded-lg pl-1">
          <icon-contact />
        </icon-base>
      </p>
      <Options :theme="theme" v-if="!checkCalendarToday && actualMonthCheck" />
    </section>
    <transition name="slide-fade" mode="out-in">
      <section class="w-screen h-64 z-10 bg-gray-50">
        <gMaps :markers="[geolocation]" />
      </section>
    </transition>
  </article>
</template>

<script>
  // import Alerts from "@/components/utils/Alerts.vue";
  //LOADER
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  // VUEX
  import { mapState, mapActions, mapGetters } from "vuex";
  // ADD MSG COMPONENT
  import Options from "@/pages/Dashboard/Options.vue";
  // EXTERNAL COMPONENTs
  import btnVerify from "@/components/btns/btnVerify.vue";
  import monthSelector from "@/components/utils/monthSelector.vue";
  import gMaps from "@/components/gMaps.vue";
  import IconBase from "@/components/IconBase.vue";
  import IconContact from "@/components/icons/IconContact.vue";
  // INTERNAL COMPONENTS
  import workedTime from "@/pages/Dashboard/workedTime.vue";
  import punchIn from "@/pages/Dashboard/punchIn.vue";
  import attendInfo from "@/pages/Dashboard/attendInfo.vue";
  // MAP COMPONENT
  import hereMap from "@/mixins/hereMap";
  // MIXINS
  import utils from "@/mixins/utils";

  export default {
    name: "Dashboard",
    mixins: [utils, hereMap],
    components: {
      Options,
      btnVerify,
      monthSelector,
      punchIn,
      attendInfo,
      IconContact,
      IconBase,
      workedTime,
      Loading,
      gMaps
      // Alerts,
    },
    data() {
      return {
        today: null,
        temperature: "36.6",
        showPunchOut: false,
        awaitData: false,
        isLoading: true,
        fullPage: false,
        loader: "dots",
      };
    },
    watch: {
      attendList: function (newValue) {
        if (newValue.length > 0 && this.users) {
          this.awaitData = true;
          this.isLoading = false;
          if (
            newValue[0].data.enterTime &&
            newValue[0].activeSession &&
            !this.checkCalendarToday
          ) {
            this.showPunchOut = true;
          }
          const userData = this.users.find(
            ({ email }) => email === this.user.email
          );

          this.extraHors = 0;
          this.workedTime = 0;
          var minutes = 0;
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i].data.leaveTime) {
              let enter = new Date(
                String(newValue[i].data.enterTime).slice(0, 16)
              );
              let leave = new Date(
                String(newValue[i].data.leaveTime).slice(0, 16)
              );
              let workedMin = (leave.getTime() - enter.getTime()) / 60000;

              const isWeekends = enter.getDay() === 0 || enter.getDay() === 6;

              const isCurentMonth = enter.getMonth() === new Date().getMonth();

              if (
                userData !== undefined &&
                "eatHour" in userData &&
                userData.eatHour == true &&
                workedMin > 540
              ) {
                workedMin -= 60;
              }
              const minDiff = this.diff_minutes(enter, leave);
              if (
                enter.getDay() === 5 &&
                enter.getMonth() === new Date().getMonth() &&
                userData !== undefined &&
                userData.schedule !== "39"
              ) {
                if (workedMin > 440) {
                  this.extraHors += minDiff - 420;
                  // this.extraHors = this.timeConvert(
                  //   this.diff_minutes(enter, leave) - 420
                  // );
                }
              }
              if (enter.getDay() !== 5 && isCurentMonth) {
                if (workedMin > 500) {
                  this.extraHors += minDiff - 480;
                  minutes = minDiff % 60;
                  if (minutes < 30) {
                    this.extraHors -= minutes;
                  }
                }
              }
              if (isWeekends && isCurentMonth) {
                this.extraHors += minDiff;
                this.workedTime += minDiff;
                minutes = minDiff % 60;
                if (minutes < 30) {
                  this.extraHors -= minutes;
                  this.workedTime -= minutes;
                }
              }
              if (Math.sign(workedMin) && !isWeekends) {
                minutes = workedMin % 60;
                if (minutes < 30) {
                  workedMin -= minutes;
                }
                this.workedTime += workedMin;
                // this.workedTime = this.timeConvert(workedMin);
              }
            }
          }
          this.extraHors = this.timeConvert(this.extraHors + 1);
          this.workedTime = this.timeConvert(this.workedTime + 1);
        }
      },
    },
    computed: {
      // mix this into the outer object with the object spread operator
      ...mapState({
        attendList: (state) => state.attendance,
        checkDay: (state) => state.checkDay,
        d: (state) => state.d,
        geolocation: (state) => state.geolocation,
        loadingMap: (state) => state.loadingMap,
        selectedMes: (state) => state.selectedMonth,
        users: (state) => state.users,
      }),
      ...mapState("auth", ["user"]),
      ...mapGetters(["checkCalendarToday"]),
      ...mapGetters({ theme: "theme/getTheme" }),
      actualMonthCheck() {
        return this.d.getMonth() === this.selectedMes;
      },
      dataPunchInLoaded() {
        return (
          this.selectedMes &&
          this.today &&
          this.days.length > 0 &&
          this.gpsData.length > 0
        );
      },
      dataPunchOutLoaded() {
        return (
          this.gpsData.length > 0 &&
          this.attendIsToday &&
          this.attendList.length > 0
        );
      },
    },
    methods: {
      ...mapActions(["getUsers", "currentLocation"]),
      attendIsToday() {
        // `this` points to the vm instance
        if (this.attendList.length > 0) {
          return (
            new Date(this.attendList[0].curentTime).toISOString().slice(0, 10) ===
            this.today.slice(0, 10)
          );
        } else {
          return false;
        }
      },
      showMsg(msg) {
        this.$alert(msg);
      },
    },
    async mounted() {
      this.getUsers();
      const platform = new window.H.service.Platform({
        apikey: this.apikey,
      });
      this.platform = platform;
      const geocoder = platform.getGeocodingService();
      if (!this.geolocation.lat && !this.geolocation.lng) {
        await this.currentLocation();
      }
      this.getInfoFromGps(geocoder, [this.geolocation]);
      var date = new Date(); // Or the date you'd like converted.
      this.today = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString();
      this.isLoading = false;
    },
  };
</script>

<style scoped>
  .theme-orange .vdatetime-popup__header,
  .theme-orange .vdatetime-calendar__month__day--selected>span>span,
  .theme-orange .vdatetime-calendar__month__day--selected:hover>span>span {
    background: #ff9800;
  }

  .theme-orange .vdatetime-year-picker__item--selected,
  .theme-orange .vdatetime-time-picker__item--selected,
  .theme-orange .vdatetime-popup__actions__button {
    color: #ff9800;
  }

  .swipAnimation {
    animation: slidein 5s infinite;
  }

  @keyframes slidein {
    0% {
      opacity: 0.25;
      left: 0;
    }

    99% {
      opacity: 0.95;
      left: 80%;
    }
  }
</style>