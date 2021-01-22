<template>
  <article v-if="geolocation.lat && geolocation.lng">
    <!-- Month selector  -->
    <section class="w-full glass-light h-12 mb-4 px-2 flex justify-between">
      <button v-if="selectedMes > 0" @click="prevMonth()">
        <icon-base>
          <icon-arrow-left />
        </icon-base>
      </button>
      <button
        class="text-lg bg-gray-400 rounded-lg m-1 w-24"
        v-if="selectedMes > 0"
        @click="selectedMes = selectedMes - 1"
      >
        {{ meses[selectedMes - 1].slice(0, 3) }}
      </button>
      <button class="text-lg bg-gray-200 shadow-lg rounded-lg m-1 w-24">
        {{ meses[selectedMes] }}
      </button>
      <button
        class="text-lg bg-gray-400 rounded-lg m-1 w-24"
        v-if="selectedMes < 11"
        @click="selectedMes = selectedMes + 1"
      >
        {{ meses[selectedMes + 1].slice(0, 3) }}
      </button>
      <button v-if="selectedMes < 11" @click="nextMonth()">
        <icon-base>
          <icon-arrow-right />
        </icon-base>
      </button>
    </section>
    <!-- Attendence Display -->
    <section class="grid grid-flow-row auto-rows-max gap-4">
      <ul
        v-if="checkCalendarToday === true || checkCalendarToday === selectedMes"
        class="glass-dark w-screen h-40 flex flex-col justify-center items-center mb-4"
      >
        <li
          v-if="today"
          class="rounded-lg col-span-2 text-gray-300 w-full mx-auto flex justify-around items-center text-lg mt-2"
        >
          {{ getDayName(today) }} {{ today.slice(0, 10) }}
          <span v-if="today" class="text-xl text-gray-100 font-bold"
            >hoy {{ timeNow }}</span
          >
        </li>
        <li class="flex flex-col justify-center items-center mb-2">
          <label class="text-xl mb-2" for="vol"
            >Temperatura : {{ temperature }}</label
          >
          <input
            v-model="temperature"
            type="range"
            id="vol"
            name="vol"
            min="35"
            max="40"
            step="0.1"
          />
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
      <ul
        v-for="(attend, index) in attendList"
        :key="index"
        class="glass-light w-screen h-32 grid grid-flow-col auto-cols-max"
      >
        <li
          v-if="attend.data"
          class="w-20 mx-auto flex flex-col justify-center items-center text-3xl"
        >
          <span class="text-base text-gray-600">{{
            getDayName(attend.data.enterTime)
          }}</span>
          {{ attend.data.enterTime.slice(8, 10) }}
        </li>
        <li
          class="w-24 mx-auto flex flex-col justify-around text-lg items-center p-4"
        >
          Entrada
          <span class="text-2xl text-green-800">
            {{ attend.data.enterTime.slice(11, 16) }}</span
          >
        </li>
        <li
          v-if="attend.data.leaveTime"
          class="w-20 mx-auto flex flex-col justify-around text-lg items-center p-4"
        >
          Salida
          <span class="text-2xl text-green-800">
            {{ attend.data.leaveTime.slice(11, 16) }}</span
          >
        </li>
        <li v-else class="flex justify-center items-center">
          <button
            @click="saveLeaveTime(attend)"
            class="block text-gray-900 font-bold my-3 mx-auto py-2 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg"
          >
            Apuntar<br />
            Salida<br />
            {{ timeNow }}
          </button>
        </li>
        <li
          class="flex flex-col ml-2 justify-center items-center text-purple-800 rounded-full my-4"
        >
          {{ attend.data.temperature
          }}<icon-base>
            <icon-temp />
          </icon-base>
        </li>
      </ul>
    </section>
  </article>
  <section v-else class="flex flex-col justify-center items-center">
    <button v-if="loadingMap" type="button" class="mx-auto text-sm" disabled>
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
      Cargando...
    </button>
    <div v-else>
      <Alerts />
      <h1 class="text-red-600 text-2xl text-center m-4 glass-light">
        Tu ubicación no esta disponible
      </h1>
      <a
        class="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
        href="https://support.google.com/accounts/answer/3467281?hl=es-419"
      >
        Como administrar tu ubicación
        <span class="block mt-2 text-sm text-center"
          >( Ayuda de Cuenta de Google )</span
        ></a
      >
    </div>
  </section>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import IconBase from "../components/IconBase.vue";
import IconArrowLeft from "../components/icons/IconArrowLeft.vue";
import IconArrowRight from "../components/icons/IconArrowRight.vue";
import IconTemp from "../components/icons/IconTemp.vue";
import dragVerify from "vue-drag-verify";

export default {
  name: "calendar",
  components: {
    IconBase,
    IconArrowLeft,
    IconArrowRight,
    IconTemp,
    dragVerify,
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
      selectedMes: null,
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
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
    };
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: state => state.attendance,
      checkDay: state => state.checkDay,
      d: state => state.d,
      geolocation: state => state.geolocation,
      loadingMap: state => state.loadingMap,
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
    saveLeaveTime(value) {
      if (value) {
        this.$confirm("Apuntar Salida?").then(() => {
          if (this.deepEqual(value.data.gpsLoc, this.geolocation)) {
            value["data"]["gpsLocLeave"] = this.geolocation;
            console.log(value);
          }
          value["data"]["leaveTime"] = this.today;
          this.changeAttendance(value);
        });
      }
    },
    async swipeHandler() {
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
    nextMonth() {
      if (this.selectedMes > 12) {
        this.selectedMes = 0;
      }
      this.selectedMes++;
    },
    prevMonth() {
      if (this.selectedMes < 0) {
        this.selectedMes = 12;
      }
      this.selectedMes--;
    },
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
  },
  watch: {
    selectedMes: function(newValue) {
      // GET CURRENT YEAR
      let time = new Object();
      time["year"] = new Date()
        .toISOString()
        .split("T")[0]
        .slice(0, 4);
      console.log("Inicio", time);
      // Month Transform
      if (newValue < 10) {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() - 1;
      } else if (newValue === 11) {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() + 2.678e9;
      } else {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() - 1;
      }
      if (time) {
        this.$store.dispatch("bindAsist", time).then(() => {
          console.log(`new Value: ${newValue}`);
        });
      }
    },
  },
  async mounted() {
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    this.selectedMes = date.getMonth();
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
