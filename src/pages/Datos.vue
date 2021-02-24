<template>
  <transition name="slide-fade" mode="out-in">
    <article v-if="geolocation.lat && geolocation.lng">
      <!-- Month selector  -->
      <monthSelector :pasedUser="selectedUser" :getAsistFunc="true" />
      <!-- User Selector if login like admin -->
      <section
        v-if="users !== null && users.length > 1"
        class="flex justify-between items-center p-4 overflow-hidden"
      >
        <div class="w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
            for="grid-state"
          >
            Centro
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              v-model="workplace"
            >
              <option value="Palma">Palma de Mallorca</option>
              <option value="Sevilla">Sevilla</option>
              <option value="Valencia">Valencia</option>
              <option value="Malaga">Malaga</option>
              <option value="Tenerife">Tenerife</option>
              <option value="Ibiza">Ibiza</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary"
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
        <div v-if="workplace" class="w-1/2 px-3 mb-6 md:mb-0 overflow-hidden">
          <label
            class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
            for="grid-state"
          >
            Empleado
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              v-model="selectedUser"
            >
              <option disabled>Seleccionar</option>
              <option
                :value="user.email"
                v-for="(user, index) in users"
                :key="index"
                :class="user.workplace === workplace ? '' : 'hidden'"
              >
                {{ user.name }} {{ user.surname ? user.surname : "" }}
              </option>
              <!-- <option v-for="(user, index) in users" :key="index">
              {{ user.email }}
            </option> -->
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary"
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
        <attendRow
          v-on:passRowToChange="dataToChange = $event"
          :selectedUser="selectedUser"
          :users="users"
          v-for="(attend, index) in attendList"
          :key="index"
          :attend="attend"
        />
      </section>
      <!-- AttendChange -->
      <transition name="fade" mode="out-in">
        <div
          class="w-full h-full z-10 absolute top-0 bg-gray-800 dark:bg-gray-600 bg-opacity-75"
          v-if="dataToChange"
        >
          <attendChange
            v-on:dataChanged="dataToChange = null"
            :dataToChange="dataToChange"
          />
          <button
            class="flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-red-800 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out mt-32 z-10 w-1/2 mx-auto"
            @click="dataToChange = null"
          >
            X
          </button>
        </div>
      </transition>
      <!-- AttendChange -->
      <!-- Worked and Extra Time Calculation -->
      <section class="mt-8">
        <div :class="`flex items-center p-2 glass-${theme} shadow rounded-lg`">
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
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
            <span
              :key="workedDays"
              class="block text-3xl text-primary font-bold"
              >{{ workedDays }}</span
            >
            <span class="block text-xl text-secondary">Días de trabajo</span>
          </div>
        </div>
        <div
          :class="`flex items-center p-2 glass-${theme} shadow rounded-lg my-4`"
        >
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-10 w-10 text-green-500"
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
            <span
              :key="workedTime"
              class="block text-3xl font-bold text-primary"
              >{{ workedTime }}</span
            >
            <span class="block text-xl text-secondary">Horas de servicio</span>
          </div>
        </div>
        <div :class="`flex items-center p-2 glass-${theme} shadow rounded-lg`">
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
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
            <span
              :key="extraHors"
              class="block text-3xl font-bold text-primary"
              >{{ extraHors }}</span
            >
            <span class="block text-xl text-secondary"
              >Horas extraordinarias</span
            >
          </div>
        </div>
      </section>
      <section>
        <HereMap :attendance="attendList" :center="geolocation" />
      </section>
    </article>
  </transition>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import HereMap from "@/components/HereMap.vue";
import monthSelector from "@/components/utils/monthSelector.vue";
import attendChange from "@/components/Datos/attendChange.vue";
import attendRow from "@/components/Datos/attendRow.vue";
import utils from "@/mixins/utils";

export default {
  props: {},
  name: "Datos",
  mixins: [utils],
  components: {
    monthSelector,
    HereMap,
    attendChange,
    attendRow,
    // Alerts,
  },
  data() {
    return {
      selectedMes: null,
      today: null,
      selectedUser: null,
      workedDays: null,
      workplace: null,
      dataToChange: null,
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
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    ...mapActions([
      "changeAttendance",
      "currentLocation",
      "getAsist",
      "getUsers",
      "currentLocation",
      "clearLocation",
    ]),
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
    changeAttendance(attend) {
      this.dataToChange = attend;
    },
  },
  watch: {
    selectedUser: function (newValue) {
      if (newValue && this.selectedTime) {
        const data = {
          user: newValue,
          time: this.selectedTime,
          uid: this.user.uid,
        };
        this.getAsist(data);
      }
    },
    attendList: function (newValue) {
      if (newValue.length > 0 && this.selectedUser) {
        const userData = this.users.find(
          ({ email }) => email === this.selectedUser
        );
        this.extraHors = 0;
        this.workedTime = 0;
        this.workedDays = 0;
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

            if ("eatHour" in userData) {
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
            this.workedDays += 1;
          }
        }
        this.extraHors = this.timeConvert(this.extraHors + 1);
        this.workedTime = this.timeConvert(this.workedTime + 1);
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
    this.selectedUser = this.user.email;
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