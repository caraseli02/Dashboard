<template>
  <article v-if="geolocation.lat && geolocation.lng">
    <!-- Month selector  -->
    <monthSelector :bindAsistFunc="true" />
    <!-- Attendence Display -->
    <section v-if="today" class="grid grid-flow-row auto-rows-max gap-4">
      <ul
        v-if="checkCalendarToday === true || checkCalendarToday === selectedMes"
        :class="`glass-${theme} w-screen h-56 flex flex-col justify-center items-center my-4 rounded-none`"
      >
        <li
          v-if="today"
          class="rounded-lg col-span-2 text-primary w-full mx-auto flex justify-around items-center text-lg mt-2"
        >
          {{ getDayName(today) }} {{ today.slice(0, 10) }}
          <span v-if="today" class="text-xl text-primary font-bold">Hoy</span>
        </li>
        <li class="flex justify-center items-center mb-2">
          <label class="text-xl mb-2 text-primary" for="vol"
            >Temperatura :</label
          >
          <select
            v-model="temperature"
            id="vol"
            name="vol"
            required
            class="appearance-none block w-20 ml-2 my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus"
          >
            <option v-for="temp in tempList" :value="temp" :key="temp">
              {{ temp }}
            </option>
          </select>
        </li>
        <li
          class="mx-auto relative text-lg flex flex-col justify-center items-center p-2"
        >
          <btnVerify
            v-if="gpsData[0]"
            :enterFunc="true"
            :temperature="temperature"
            :gpsData="gpsData[0]"
            text="Apuntar Entrada"
          />
        </li>
      </ul>
      <h3 v-if="actualMonthCheck" class="text-xl font-bold ml-2 text-primary">
        TU ÚLTIMA OPERACIÓN:
      </h3>
      <h3
        v-if="d.getMonth() > selectedMes"
        class="uppercase mt-4 ml-2 font-bold text-center"
      >
        {{
          attendList[0] ? "Sesión sin cerrar" : "No tienes sesiónes sin cerrar"
        }}
      </h3>
      <ul
        v-for="(attend, index) in attendList"
        :key="index"
        :class="`glass-${theme} w-screen h-32 flex justify-center items-center`"
      >
        <li
          v-if="attend.data"
          class="mx-auto flex flex-col justify-around text-2xl items-center p-2 text-primary capitalize rounded-lg m-2"
        >
          <span class="text-lg text-primary w-full text-center rounded">{{
            getDayName(attend.data.enterTime)
          }}</span>
          {{ attend.data.enterTime.slice(8, 10) }}
        </li>
        <li
          class="mx-auto flex flex-col justify-around text-lg items-center p-4 text-primary"
        >
          Entrada
          <span class="text-2xl text-green-800 dark:text-green-500">
            &#8595;{{ attend.data.enterTime.slice(11, 16) }}</span
          >
        </li>
        <li
          v-if="attend.data.leaveTime"
          class="mx-auto flex flex-col justify-around text-lg items-center p-4 text-primary"
        >
          Salida
          <span class="text-2xl text-red-800 dark:text-red-500">
            &#8593;{{ attend.data.leaveTime.slice(11, 16) }}</span
          >
        </li>
        <li
          class="flex flex-col justify-center text-red-900 font-bold items-center h-full"
          v-if="'curentTime' in attendList[0]"
        >
          <span
            v-if="actualMonthCheck && !attend.data.leaveTime && attendIsToday"
            class="block text-primary font-bold my-3 mx-auto py-2 px-4 bg-secondary dark:bg-black rounded-lg"
          >
            -- / --
          </span>
          <div
            v-if="!attend.msgLeave && !attend.data.leaveTime && !attendIsToday"
            class="text-secondary text-center"
          >
            <button
              class="block text-primary font-bold w-20 mx-auto p-3 bg-secondary rounded-lg text-center"
              placeholder="Avisar"
              @click="addMsg()"
            >
              Dejar Nota
            </button>
          </div>
        </li>
        <li
          v-if="attend.msgLeave"
          class="flex flex-col justify-center text-red-900 font-bold items-center h-full"
          @click="showMsg(attend.msgLeave)"
        >
          <icon-base class="mx-4 self-center bg-green-200 rounded-lg pl-1">
            <icon-contact />
          </icon-base>
        </li>
        <li
          v-if="attend.data.temperature"
          class="flex flex-col ml-2 justify-center items-center text-accent rounded-full my-4 mr-2 w-20 dark:text-secondary"
        >
          {{ attend.data.temperature
          }}<icon-base>
            <icon-temp />
          </icon-base>
        </li>
      </ul>
      <btnVerify
        v-if="gpsData[0] && attendList[0]"
        :value="attendList[0]"
        :leaveFunc="true"
        :temperature="temperature"
        :gpsData="gpsData[0]"
        text="Apuntar Salida"
        
      />
      <ul
        v-if="workedTime && actualMonthCheck"
        :class="`glass-${theme} w-screen mx-auto h-24 flex justify-center items-center`"
      >
        <li
          class="mx-auto flex justify-around text-lg items-center p-4 text-secondary w-56"
        >
          <i class="gg-time mb-2 text-green-800 dark:text-green-500"></i>
          <div class="flex flex-col justify-around">
            Has trabajado
            <span class="text-2xl text-green-800 dark:text-green-500">
              {{ workedTime }}</span
            >
          </div>
        </li>
        <!-- <li
          class="w-full text-secondary mx-auto flex justify-around text-lg items-center p-4"
          v-if="extraHors"
        >
          <i class="gg-insert-after text-red-800 dark:text-red-500 mb-2 "></i>
          <div class="flex flex-col justify-around">
            Horas Extra
            <span class="text-2xl text-red-800 dark:text-red-500"
              >{{ extraHors }}
            </span>
          </div>
        </li> -->
      </ul>
      <p
        v-if="attendList[0] && 'msg' in attendList[0].data && actualMonthCheck"
        :class="`w-24 mx-auto glass-${theme} h-auto p-3 flex justify-start items-start overflow-y-auto`"
        @click="showMsg(attendList[0].data.msg)"
      >
        <icon-base class="mx-4 self-center bg-green-200 rounded-lg pl-1">
          <icon-contact />
        </icon-base>
      </p>
      <Options v-if="!checkCalendarToday && actualMonthCheck" />
    </section>
  </article>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import Options from "@/components/Dashboard/Options.vue";
import IconBase from "@/components/IconBase.vue";
import IconTemp from "@/components/icons/IconTemp.vue";
import IconContact from "@/components/icons/IconContact.vue";
import btnVerify from "@/components/btns/btnVerify.vue";
import monthSelector from "@/components/utils/monthSelector.vue";
import utils from "@/mixins/utils";
import hereMap from "@/mixins/hereMap";

export default {
  name: "Dashboard",
  mixins: [utils, hereMap],
  components: {
    Options,
    IconBase,
    IconContact,
    IconTemp,
    btnVerify,
    monthSelector,
    // Alerts,
  },
  data() {
    return {
      swiper: {
        width: 300,
        text: "Apuntar Entrada",
        background: "#ffffff00",
        handlerIcon: "gg-chevron-double-right",
        successIcon: "gg-check",
        progressBarBg: "#FFFF99",
        completedBg: "#66cc66",
        handlerBg: "#fff",
        successText: "success",
        height: 50,
        textSize: "20px",
        isCircle: true,
      },
      today: null,
      temperature: 36.6,
      tempList: [],
    };
  },
  watch: {
    attendList: function (newValue) {
      if (newValue.length > 0) {
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

            if (userData.eatHour) {
              workedMin -= 60;
            }
            const minDiff = this.diff_minutes(enter, leave);
            if (
              enter.getDay() === 5 &&
              enter.getMonth() === new Date().getMonth() &&
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
    timeNow() {
      let minutes = this.d.getMinutes();
      let hours = this.d.getHours();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      return `${hours} : ${minutes} `;
    },
    actualMonthCheck() {
      return this.d.getMonth() === this.selectedMes;
    },
    attendIsToday: function () {
      // `this` points to the vm instance
      return (
        new Date(this.attendList[0].curentTime).toISOString().slice(0, 10) ===
        this.today.slice(0, 10)
      );
    },
  },
  methods: {
    ...mapActions(["changeAttendance"]),
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
    addMsg() {
      this.$prompt("Mensaje").then((text) => {
        let attend = this.attendList[0];
        attend["msgLeave"] = text;
        attend["activeSession"] = false;
        this.changeAttendance(attend);
      });
    },
    showMsg(msg) {
      this.$alert(msg);
    },
  },
  mounted() {
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    const geocoder = platform.getGeocodingService();
    this.getInfoFromGps(geocoder, [this.geolocation]);
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    for (var temp = 355; temp <= 375; temp++) {
      this.tempList.push(temp / 10);
    }
  },
};
</script>

<style scoped>
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
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
