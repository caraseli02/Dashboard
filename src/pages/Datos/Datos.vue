<template>
  <article>
    <!-- Month selector  -->
    <monthSelector v-if="userData.length > 0" :workplace="userData[0].workplace" :pasedUser="selectedUser"
      :getAsistFunc="true" />
    <!-- User Selector if login like admin -->
    <section v-if="users !== null && users.length > 1" class="flex justify-between items-center p-4 overflow-hidden">
      <attendAdminPlaces v-if="userData[0] && 'workplace' in userData[0]" :workplaceList="userData[0].workplace"
        v-model="workplace" />
      <attendAdminUsers v-if="workplace !== null && workplaceUsers" :usersList="workplaceUsers"
        v-model="selectedUser" />
      <!-- <div class="w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
            for="grid-state"
          >
            Centro
          </label>
          <div class="relative">
            <select
              v-if="userData[0]"
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              v-model="workplace"
            >
              <option
                v-for="place in userData[0].workplace"
                :key="place"
                :value="place"
              >
                {{ place }}
              </option>
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
          <div v-if="workplaceUsers" class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              v-model="selectedUser"
            >
              <option disabled>Seleccionar</option>
              <option
                :value="user.email"
                v-for="(user, index) in workplaceUsers"
                :key="index"
              >
                {{ user.name }} {{ user.surname ? user.surname : "" }}
              </option>
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
        </div> -->
    </section>
    <!-- Attendence Display -->
    <!-- GMAPS -->
    <transition v-if="gMapMarker" name="slide-fade" mode="out-in">
      <section class="fixed top-0 w-screen h-64 z-10 bg-gray-50">

        <button
          class="flex justify-center py-2 px-4 border border-transparent text-lg font-medium text-primary bg-red-800 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out z-10 w-full mx-auto"
          @click="gMapMarker = null">
          Cerrar
        </button>
        <gMaps :markers="gMapMarker" :center="geolocation" />
      </section>
    </transition>
    <!-- GMAPS -->
    <transition-group class="grid grid-flow-col auto-cols-max py-2 overflow-x-scroll mt-2 ml-4" name="list"
      tag="section">
      <attendRow v-on:markersToDisplay="gMapMarker = $event" v-on:passRowToChange="
          (dataToChange = $event.attend), (gpsData = $event.gpsData)
        " :selectedUser="selectedUser" :users="users" v-for="attend in filtredAttends" :key="attend.id"
        :attend="attend" />
    </transition-group>
    <!-- AttendChange -->
    <transition name="fade" mode="out-in">
      <div class="w-full h-full z-10 absolute top-0 bg-gray-800 dark:bg-gray-600 bg-opacity-75"
        v-if="dataToChange && gpsData">
        <attendChange v-on:dataChanged="(dataToChange = null), (gpsData = null)" :dataToChange="dataToChange"
          :gpsData="gpsData" />
        <button
          class="flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-red-800 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out mt-32 z-10 w-1/2 mx-auto"
          @click="(dataToChange = null), (gpsData = null)">
          X
        </button>
      </div>
    </transition>
    <!-- AttendChange -->
    <!-- Worked and Extra Time Calculation -->
    <attendTimeLog v-if="theme && workedDays && workedTime" :theme="theme" :workedDays="workedDays"
      :workedTime="workedTime" />
    <!-- Attendence Display On Map-->
    <HereMap v-if="users && filtredAttends && geolocation" :users="users" :attendance="filtredAttends"
      :center="geolocation" />
  </article>
</template>

<script>
  // import Alerts from "@/components/utils/Alerts.vue";
  import { mapState, mapActions, mapGetters } from "vuex";
  import HereMap from "@/components/HereMap.vue";
  import gMaps from "@/components/gMaps.vue";
  import monthSelector from "@/components/utils/monthSelector.vue";
  // import cssIcon from "@/components/btns/cssIcon.vue";
  import attendChange from "@/pages/Datos/attendChange.vue";
  import attendRow from "@/pages/Datos/attendRow.vue";
  import attendAdminUsers from "@/pages/Datos/attendAdminUsers.vue";
  import attendAdminPlaces from "@/pages/Datos/attendAdminPlaces.vue";
  import attendTimeLog from "@/pages/Datos/attendTimeLog.vue";
  import utils from "@/mixins/utils";

  export default {
    props: {},
    name: "Datos",
    mixins: [utils],
    components: {
      monthSelector,
      HereMap,
      gMaps,
      attendChange,
      attendRow,
      attendAdminUsers,
      attendAdminPlaces,
      attendTimeLog,
      // cssIcon,
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
        workplaceUsers: [],
        filtredAttends: [],
        gMapMarker: null,
      };
    },
    computed: {
      // mix this into the outer object with the object spread operator
      ...mapState({
        attendList: state => state.attendance,
        d: state => state.d,
        geolocation: state => state.geolocation,
        loadingMap: state => state.loadingMap,
        users: state => state.users,
        selectedTime: state => state.selectedTime,
      }),
      ...mapState("auth", ["user"]),
      ...mapState(["showSidebar", "userData"]),
      ...mapGetters(["checkCalendarToday"]),
      ...mapGetters({ theme: "theme/getTheme" }),
    },
    methods: {
      ...mapActions([
        "currentLocation",
        "getAsist",
        "getUsers",
        "currentLocation",
        "clearLocation",
        "getUserData",
      ]),
      getUsersAttends(val) {
        this.filtredAttends = [];

        const dataList = this.attendList.filter(({ data }) => data.email === val);

        this.filtredAttends = dataList;
      },
      generateAttendInfo(newValue) {
        if (newValue.length > 0 && this.selectedUser && this.users) {
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

              if (
                userData &&
                "eatHour" in userData &&
                userData.eatHour === true
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
              this.workedDays += 1;
            }
          }
          this.extraHors = this.timeConvert(this.extraHors + 1);
          this.workedTime = this.timeConvert(this.workedTime + 1);
        }
      },
    },
    watch: {
      // Watch selected user to return Attends of specified User
      selectedUser: function (newValue) {
        this.getUsersAttends(newValue);
        this.generateAttendInfo(this.filtredAttends);
      },
      //Get all Attends from selected workplace
      workplace: function (newValue) {
        if (newValue && this.selectedTime) {
          const data = {
            workplace: this.workplace,
            time: this.selectedTime,
            uid: this.user.uid,
          };
          this.workplaceUsers = null;
          this.getAsist(data);
        }
      },
      // Vuex function to get attendList
      attendList: function (newValue) {
        this.filtredAttends = newValue;
        const data = [...new Set(newValue.map(o => o.data.email))];
        if (data.length > 0) {
          this.workplaceUsers = [];
          data.forEach(o => {
            let user = this.users.find(({ email }) => email === o);
            if (user) {
              this.workplaceUsers.push(user);
            }
          });
        }
        this.generateAttendInfo(newValue);
      },
    },
    async mounted() {
      var date = new Date(); // Or the date you'd like converted.
      this.today = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString();
      this.selectedMes = date.getMonth();
      this.selectedUser = this.user.email;
      await this.getUsers();
      await this.getUserData();
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

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to

  /* .list-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
  }
</style>