<template>
  <article v-if="geolocation.lat && geolocation.lng">
    <!-- Month selector  -->
    <monthSelector :pasedUser="selectedUser" :getAsistFunc="true" />
    <!-- User Selector if login like admin -->
    <section
      v-if="users !== null && users.length > 0"
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
          class="mx-auto h-full w-full flex justify-center items-center p-1 border-b-2 border-gray-600"
        >
          <span
            v-if="attend.closedAt"
            class="text-red-900 text-base text-center"
          >
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
          class="h-10 flex justify-center items-center text-purple-800 my-2"
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
          class="h-10 flex justify-center items-center text-purple-800 my-2 pb-2"
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
    <!-- Worked and Extra Time Calculation -->
    <section class="mt-8">
      <div class="flex items-center p-2 glass-light shadow rounded-lg">
        <div
          class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <span :key="workedDays" class="block text-3xl font-bold">{{
            workedDays
          }}</span>
          <span class="block text-xl text-gray-900">Días de trabajo</span>
        </div>
      </div>
      <div class="flex items-center p-2 glass-light shadow rounded-lg my-4">
        <div
          class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-10 w-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <span :key="workedTime" class="block text-3xl font-bold">{{
            workedTime
          }}</span>
          <span class="block text-xl text-gray-900">Horas de servicio</span>
        </div>
      </div>
      <div class="flex items-center p-2 glass-light shadow rounded-lg">
        <div
          class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-gray-100 rounded-full mr-6"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C12.5523 4 13 4.44772 13 5V8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H13V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V10H8C7.44772 10 7 9.55228 7 9C7 8.44772 7.44772 8 8 8H11V5C11 4.44772 11.4477 4 12 4Z"
              fill="currentColor"
            />
            <path
              d="M3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <span :key="extraHors" class="block text-3xl font-bold">{{
            extraHors
          }}</span>
          <span class="block text-xl text-gray-900">Horas extraordinarias</span>
        </div>
      </div>
    </section>
    <section>
      <HereMap :attendance="attendList" :center="geolocation" />
    </section>
  </article>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import IconBase from "../components/IconBase.vue";
import IconContact from "../components/icons/IconContact.vue";
import IconTemp from "../components/icons/IconTemp.vue";
import HereMap from "@/components/HereMap.vue";
import monthSelector from "@/components/utils/monthSelector.vue";
import utils from "@/mixins/utils";

export default {
  props: {},
  name: "Datos",
  mixins: [utils],
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
      workedDays: null,
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
      "currentLocation",
      "clearLocation",
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
    checkLeaveUpdate: (closedAt, leaveTime) => {
      if (closedAt && leaveTime) {
        const leave = new Date(leaveTime.replace("Z", ""));
        const closed = new Date(closedAt.seconds * 1000);

        const diffMs = leave - closed;
        // console.log(diffMs);
        // milliseconds between now & Christmas
        // const diffDays = Math.floor(diffMs / 86400000); // days
        // const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        // console.log(
        //   leave.toString().slice(7, 21),
        //   updated.toString().slice(7, 21)
        // );

        if (diffMs < -900000) {
          return closed.toString().slice(7, 21);
        }
        // if (diffMins > 30 || diffHrs > 0.5) {
        //   if (diffHrs > 0.5) {
        //     return `Antes con ${diffHrs} Horas`;
        //   }
        //   return `Antes con ${diffMins} Minutes`;
        // }
        return "--/--";
      }
      return "--/--";
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
      console.log(this.workedTime, this.workedDays);
    },
    attendList: function (newValue) {
      if (newValue.length > 0) {
        this.extraHors = 0;
        this.workedTime = 0;
        this.workedDays = 0;
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].data.leaveTime) {
            let enter = new Date(
              String(newValue[i].data.enterTime).slice(0, 16)
            );
            let leave = new Date(
              String(newValue[i].data.leaveTime).slice(0, 16)
            );
            const workedMin = (leave.getTime() - enter.getTime()) / 60000;

            if (
              enter.getDay() === 5 &&
              enter.getMonth() === new Date().getMonth()
            ) {
              if (workedMin > 440) {
                this.extraHors += this.diff_minutes(enter, leave) - 420;
                // this.extraHors = this.timeConvert(
                //   this.diff_minutes(enter, leave) - 420
                // );
              }
            }
            if (
              enter.getDay() !== 5 &&
              enter.getMonth() === new Date().getMonth()
            ) {
              if (workedMin > 500) {
                this.extraHors += this.diff_minutes(enter, leave) - 480;
                // this.extraHors = this.timeConvert(
                //   this.diff_minutes(enter, leave) - 480
                // );
              }
            }
            if (Math.sign(workedMin)) {
              this.workedTime += workedMin;
              // this.workedTime = this.timeConvert(workedMin);
            }
            this.workedDays += 1;
          }
        }
        this.extraHors = this.timeConvert(this.extraHors);
        this.workedTime = this.timeConvert(this.workedTime);
      }
    },
  },
  mounted() {
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
