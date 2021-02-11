<template>
  <article v-if="geolocation.lat && geolocation.lng">
    <!-- Month selector  -->
    <monthSelector :bindAsistFunc="true" />
    <!-- Attendence Display -->
    <section class="grid grid-flow-row auto-rows-max gap-4">
      <ul
        v-if="checkCalendarToday === true || checkCalendarToday === selectedMes"
        class="glass-dark w-screen h-48 flex flex-col justify-center items-center mb-4"
      >
        <li
          v-if="today"
          class="rounded-lg col-span-2 text-gray-300 w-full mx-auto flex justify-around items-center text-lg mt-2"
        >
          {{ getDayName(today) }} {{ today.slice(0, 10) }}
          <span v-if="today" class="text-xl text-gray-100 font-bold">Hoy</span>
        </li>
        <li class="flex justify-center items-center mb-2">
          <label class="text-xl mb-2 text-gray-200" for="vol"
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
          class="mx-auto relative text-lg flex justify-center items-center p-2"
        >
          <drag-verify
            v-on:passcallback="swipeHandler()"
            class=""
            :width="swiper.width"
            :height="swiper.height"
            :text="swiper.text"
            :success-text="swiper.successText"
            :background="swiper.background"
            :progress-bar-bg="swiper.progressBarBg"
            :completed-bg="swiper.completedBg"
            :handler-bg="swiper.handlerBg"
            :handler-icon="swiper.handlerIcon"
            :text-size="swiper.textSize"
            :success-icon="swiper.successIcon"
            :circle="swiper.isCircle"
          >
          </drag-verify>
        </li>
      </ul>
      <h3
        v-if="d.getMonth() === selectedMes"
        class="text-xl font-bold ml-2 text-gray-800"
      >
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
        class="glass-light w-screen h-32 grid grid-flow-col auto-cols-max classControl"
      >
        <li
          v-if="attend.data"
          class="w-20 bg-green-400 mx-auto flex flex-col justify-center items-center text-3xl my-2 rounded-lg"
        >
          <span class="text-base text-gray-900">{{
            getDayName(attend.data.enterTime)
          }}</span>
          {{ attend.data.enterTime.slice(8, 10) }}
        </li>
        <li
          class="w-24 mx-auto flex flex-col justify-around text-lg items-center p-4"
        >
          Entrada
          <span class="text-2xl text-green-800">
            &#8595;{{ attend.data.enterTime.slice(11, 16) }}</span
          >
        </li>
        <li
          v-if="attend.data.leaveTime"
          class="w-20 mx-auto flex flex-col justify-around text-lg items-center p-4"
        >
          Salida
          <span class="text-2xl text-red-800">
            &#8593;{{ attend.data.leaveTime.slice(11, 16) }}</span
          >
        </li>
        <li v-else class="flex justify-center items-center">
          <button
            @click="saveLeaveTime(attend)"
            class="block text-gray-900 font-bold my-3 mx-auto py-2 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg"
          >
            Apuntar<br />
            Salida<br />
          </button>
        </li>
        <li
          v-if="attend.data.temperature"
          class="flex flex-col ml-2 justify-center items-center text-purple-800 rounded-full my-4 mr-2"
        >
          {{ attend.data.temperature
          }}<icon-base>
            <icon-temp />
          </icon-base>
        </li>
      </ul>
      <ul
        v-if="workedTime"
        class="glass-light w-screen h-24 grid grid-flow-col auto-cols-max classControl"
      >
        <li
          class="w-full mx-auto flex flex-col justify-around text-lg items-center p-4"
        >
          Has trabajado
          <span class="text-xl text-green-800"> {{ workedTime }}</span>
        </li>
        <li
          class="w-full mx-auto flex flex-col justify-around text-lg items-center p-4"
          v-if="extraHors"
        >
          Horas Extra
          <span class="text-xl text-red-800">{{ extraHors }} </span>
        </li>
      </ul>
      <p
        v-if="
          attendList[0] &&
            'msg' in attendList[0].data &&
            d.getMonth() === selectedMes
        "
        class="w-screen glass-light h-auto p-3 flex justify-start items-start overflow-y-auto"
      >
        <icon-base class="mx-4 self-center bg-green-200 rounded-lg pl-1">
          <icon-contact />
        </icon-base>
        <span class="w-64 h-10 overflow-y-auto mx-auto">
          {{ attendList[0].data.msg }}
        </span>
      </p>
      <Options v-if="!checkCalendarToday && d.getMonth() === selectedMes" />
    </section>
  </article>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import Options from "../components/Dashboard/Options.vue";
import IconBase from "../components/IconBase.vue";
import IconTemp from "../components/icons/IconTemp.vue";
import IconContact from "../components/icons/IconContact.vue";
import dragVerify from "vue-drag-verify";
import monthSelector from "@/components/utils/monthSelector.vue";

export default {
  name: "Dashboard",
  components: {
    Options,
    IconBase,
    IconContact,
    IconTemp,
    dragVerify,
    monthSelector,
    // Alerts,
  },
  data() {
    return {
      swiper: {
        width: 300,
        text: "Apuntar Entrada",
        background: "#ccc",
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
      days: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
        "domingo",
      ],
      today: null,
      temperature: 36.6,
      tempList: [],
      workedTime: null,
      extraHors: null,
    };
  },
  watch: {
    attendList: function(newValue) {
      if (newValue.length > 0 && newValue[0].data.leaveTime) {
        let enter = new Date(String(newValue[0].data.enterTime).slice(0, 16));
        let leave = new Date(String(newValue[0].data.leaveTime).slice(0, 16));

        console.log(enter, leave);
        const workedMin = (leave.getTime() - enter.getTime()) / 60000;
        if (enter.getDay() === 5) {
          if (workedMin > 440) {
            this.extraHors = this.timeConvert(
              this.diff_minutes(enter, leave) - 420
            );
          }
        }
        if (enter.getDay() !== 5) {
          if (workedMin > 500) {
            this.extraHors = this.timeConvert(
              this.diff_minutes(enter, leave) - 480
            );
            console.log(enter, leave);
          }
        }
        if (Math.sign(workedMin)) {
          this.workedTime = this.timeConvert(workedMin);
        }
      }
    },
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: state => state.attendance,
      checkDay: state => state.checkDay,
      d: state => state.d,
      geolocation: state => state.geolocation,
      loadingMap: state => state.loadingMap,
      selectedMes: state => state.selectedMonth,
    }),
    ...mapGetters(["checkCalendarToday"]),
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
  },
  methods: {
    ...mapActions([
      "bindLastAsist",
      "setAttendance",
      "changeAttendance",
      "deleteAsist",
      "currentLocation",
      "clearLocation",
    ]),
    deepEqual(object1, object2) {
      function isObject(object) {
        return object != null && typeof object === "object";
      }

      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return true;
      }

      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          (areObjects && !this.deepEqual(val1, val2)) ||
          (!areObjects && val1 !== val2)
        ) {
          return true;
        }
      }
      return false;
    },
    async saveLeaveTime(value) {
      await this.clearLocation();
      await this.currentLocation();
      if (value) {
        this.$confirm(`Apuntar Salida?`).then(() => {
          if (this.deepEqual(value.data.gpsLoc, this.geolocation)) {
            value["data"]["gpsLocLeave"] = this.geolocation;
          }
          value["activeSession"] = false;
          value["data"]["leaveTime"] = this.today;
          this.changeAttendance(value);
        });
      }
    },
    async swipeHandler() {
      await this.clearLocation();
      await this.currentLocation();
      this.setAttendance({
        email: localStorage.getItem("email"),
        uid: localStorage.getItem("uid"),
        gpsLoc: this.$store.state.geolocation,
        dttm: new Date(),
        enterTime: this.today,
        temperature: this.temperature,
      });

      // this.enterModal = false;
      // this.$router.replace("calendar");
    },
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
    timeConvert(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " h " + rminutes + " m ";
    },
    diff_minutes(dt2, dt1) {
      // console.log(dt2, dt1);
      var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    },
  },
  mounted() {
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
