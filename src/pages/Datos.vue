<template>
  <article v-if="geolocation.lat && geolocation.lng">
    <!-- Month selector  -->
    <monthSelector :pasedUser="selectedUser" :getAsistFunc="true" />
    <!-- User Selector if login like admin -->
    <section
      v-if="users.length > 1"
      class="flex justify-between items-center p-4 overflow-hidden"
    >
      <div class="w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Centro
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>PMI</option>
            <option>VLC</option>
            <option>SVQ</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-1/2 px-3 mb-6 md:mb-0 overflow-hidden">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Empleado
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            v-model="selectedUser"
          >
            <option disabled>Seleccionar</option>
            <option v-for="(user, index) in users" :key="index">
              {{ user.email }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
    <!-- Attendence Display -->
    <section
      class="grid grid-flow-col auto-cols-max py-2 overflow-x-scroll mt-2 ml-4"
    >
      <ul
        v-for="(attend, index) in attendList"
        :key="index"
        class="w-24 grid grid-flow-row grid-rows-6 glass-light"
      >
        <li
          v-if="attend.data"
          class="w-20 h-16 row-span-1 mx-auto flex flex-col justify-center items-center text-2xl border-none bg-green-400 rounded-lg"
          @click="deleteAttendData(attend.id)"
        >
          <span
            class="text-gray-900 rounded-t-lg text-base bg-blue-500 w-full h-full text-center"
            >{{ getDayName(attend.data.enterTime).slice(0, 3) }}</span
          >
          {{ attend.data.enterTime.slice(8, 10) }}
        </li>
        <!-- <li
          class="mx-auto h-full flex justify-center items-center p-1 border-b-2 border-gray-600"
        >
          <span class="text-green-700 text-2xl">&#8595;</span>
          <span class="text-xl text-green-800">
            {{
              checkEnterCreated(attend.data.enterTime, attend.data.dttm)
            }}</span
          >
        </li> -->
        <li class="mx-auto h-full flex justify-center items-center p-1">
          <span class="text-green-700 text-2xl mr-1"> &#8595; </span>
          <span class="text-xl text-green-800">
            {{ attend.data.enterTime.slice(11, 16) }}</span
          >
        </li>
        <!-- v-if="checkEnterCreated(attend.createdAt, attend.curentTime) !== 0" -->
        <li
          class="w-full flex justify-center items-center text-gray-800 text-base text-center rounded-lg"
        >
          <span class="h-16 pt-2 px-1">{{
            checkEnterCreated(attend.createdAt, attend.curentTime)
          }}</span>
        </li>
        <li
          class="mx-auto h-full flex justify-center items-center p-1 border-t-2 border-gray-600"
        >
          <span v-if="attend.data.leaveTime" class="text-xl text-red-800">
            {{ attend.data.leaveTime.slice(11, 16) }}</span
          >
          <button v-else class="text-xl text-red-800">--:--</button>
          <span class="text-red-700 text-2xl">&#8593;</span>
        </li>
        <li
          class="mx-auto h-full flex justify-center items-center p-1 border-b-2 border-gray-600"
        >
          <span class="text-red-900 text-base text-center">
            {{ checkLeaveUpdate(attend.closedAt, attend.data.leaveTime) }}
          </span>
        </li>
        <li class="flex justify-center items-center text-purple-800">
          <icon-base>
            <icon-temp />
          </icon-base>
          {{ attend.data.temperature }}
        </li>
        <!-- Attendence Messages -->
        <li
          @click="showInfoMsg(attend.data.msg)"
          class="h-full flex justify-center items-center text-purple-800"
        >
          <icon-base
            v-if="attend.data.msg"
            class="mx-4 self-center bg-green-300 rounded-lg w-full p-1 h-8"
          >
            <icon-contact />
          </icon-base>
          <span class="text-xs mx-4 text-center" v-else>No tiene Mensajes</span>
        </li>
        <li
          @click="showChangeMsg(attend.data.enterChange)"
          class="h-full flex justify-center items-center text-purple-800"
        >
          <div
            v-if="attend.data.enterChange"
            class="mx-4 self-center bg-yellow-300 rounded-lg w-full p-2"
          >
            <i class="gg-sync mx-auto"></i>
          </div>
          <span class="text-xs mx-4 text-center" v-else>No tiene Cambios</span>
        </li>
      </ul>
    </section>
    <section>
      <HereMap :attendance="attendList" :center="geolocation" />
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
import IconContact from "../components/icons/IconContact.vue";
import IconTemp from "../components/icons/IconTemp.vue";
import HereMap from "@/components/HereMap.vue";
import monthSelector from "@/components/utils/monthSelector.vue";

export default {
  props: {},
  name: "Datos",
  components: {
    IconBase,
    monthSelector,
    IconTemp,
    HereMap,
    IconContact,
    // Alerts,
  },
  data() {
    return {
      selectedMes: null,
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
      selectedUser: null,
    };
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: (state) => state.attendance,
      d: (state) => state.d,
      geolocation: (state) => state.geolocation,
      loadingMap: (state) => state.loadingMap,
      users: (state) => state.users,
      selectedTime: (state) => state.selectedTime,
    }),
    ...mapState("auth", ["user"]),
    ...mapGetters(["checkCalendarToday"]),
  },
  methods: {
    ...mapActions([
      "changeAttendance",
      "currentLocation",
      "getAsist",
      "getUsers",
      "deleteAsist",
    ]),
    deleteAttendData(val) {
      this.$confirm("Borar assistencia?").then(() => {
        this.deleteAsist(val);
      });
    },
    checkEnterCreated: (val1, val2) => {
      if (val1 && val2) {
        const created = new Date(val1.seconds * 1000);
        const inserted = new Date(val2);
        const diffMs = created - inserted; // milliseconds between now & Christmas
        const diffDays = Math.floor(diffMs / 86400000); // days
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        // console.log(
        //   diffDays + " days, " + diffHrs + " hours, " + diffMins + " diff =)"
        // );
        if (diffDays > 0) {
          return created.toString().slice(7, 21);
        }
        if (diffMins > 30 || diffHrs > 1) {
          if (diffHrs > 1) {
            return `Retraso de ${diffHrs} Horas`;
          }
          return `Retraso de ${diffMins} Minutes`;
        }
        return "--/--";
      }
    },
    checkLeaveUpdate: (updatedAt, leaveTime) => {
      if (updatedAt && leaveTime) {
        const leave = new Date(leaveTime.replace("Z", ""));
        const updated = new Date(updatedAt.seconds * 1000);

        const diffMs = leave - updated;
        // milliseconds between now & Christmas
        const diffDays = Math.floor(diffMs / 86400000); // days
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        // console.log(
        //   leave.toString().slice(7, 21),
        //   updated.toString().slice(7, 21)
        // );
        if (diffDays < 0) {
          return updated.toString().slice(7, 21);
        }
        if (diffMins > 30 || diffHrs > 0.5) {
          if (diffHrs > 0.5) {
            return `Antes con ${diffHrs} Horas`;
          }
          return `Antes con ${diffMins} Minutes`;
        }
        return "Puntual";
      }
    },
    showInfoMsg(msg) {
      this.$alert(msg);
    },
    showChangeMsg(data) {
      this.$fire({
        title: `
        <ul>
          <li>Cambiado de Entrada</li>
          <li>Antes : ${data.oldValue}</li>
          <li>Ahora : ${data.newValue}</li>
          <li>Fecha de Cambiado : ${data.changeTime}</li>
        </ul>
        `,
        text: `${data.msg}`,
        type: "info",
      });
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
    selectedUser: function (newValue) {
      const data = {
        user: newValue,
        time: this.selectedTime,
        uid: this.user.uid,
      };
      this.getAsist(data);
    },
  },
  async mounted() {
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    this.selectedMes = date.getMonth();
    this.getUsers();
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
