<template>
  <div v-if="!isLoading" class="flex flex-col h-full">
    <div v-if="users !== null && userData !== null" class="w-full px-4 lg:p-10">
      <monthSelector
        :workplace="userData.workplace"
        :selectedWorkplace="workplace"
        :getAsistFunc="true"
      />
      <section
        v-if="users !== null && users.length > 1"
        class="flex justify-between items-center overflow-hidden max-w-lg xl:mt-4 mx-auto"
      >
        <attendAdminPlaces
          v-if="userData && 'workplace' in userData"
          :workplaceList="userData.workplace"
          v-model="workplace"
        />
        <attendAdminUsers
          v-if="workplace !== null && workplaceUsers"
          :usersList="workplaceUsers"
          v-model="selectedUser"
        />
      </section>
      <!-- <Tools /> -->
      <!-- Sidebar Toggler -->
      <section class="flex md:mt-4">
        <div
          @click="showSidebar = !showSidebar"
          :class="`glass-${theme} lg:hidden rounded-xl flex justify-around w-32 mx-auto shadow-lg border-none`"
        >
          <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
          <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
          <svg
            width="42px"
            height="42px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="rounded-lg w-16 p-2 text-primary"
            :class="!showSidebar ? 'bg-blue-800' : ''"
          >
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
            ></path>
          </svg>
          <svg
            width="42px"
            height="42px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="rounded-lg w-16 p-2 text-primary"
            :class="showSidebar ? 'bg-blue-800' : ''"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zm14 2L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div
          v-if="!selectedUser"
          :class="`glass-${theme} rounded-xl flex justify-around w-32 mx-auto shadow-lg border-none lg:h-10`"
        >
          <span
            @click="
              (filtredAttendsDay = new Date(d.setHours(2, 0, 0, 0))),
                (showMonthAttends = false)
            "
            class="w-full h-full rounded-xl flex justify-center items-center text-primary font-semibold text-xl"
            :class="!showMonthAttends ? 'bg-blue-800' : ''"
            >{{ filtredAttendsDay ? filtredAttendsDay.getDate() : "Hoy" }}</span
          >
          <span
            @click="(filtredAttendsDay = null), (showMonthAttends = true)"
            class="w-full h-full rounded-xl flex justify-center items-center text-primary font-semibold text-xl"
            :class="showMonthAttends ? 'bg-blue-800' : ''"
            >Mes</span
          >
        </div>
      </section>
      <div class="overflow-hidden lg:overflow-visible pb-24 lg:pb-0">
        <div
          class="transform lg:transform-none transition-all duration-300"
          :class="showSidebar ? '-translate-x-full' : ''"
        >
          <div class="flex mt-4 lg:mt-10 lg:space-x-10">
            <div
              class="w-full flex-shrink-0 lg:w-2/3 lg:flex-shrink rounded-xl"
            >
              <div
                v-if="filtredAttends.length > 0"
                class="flex space-x-4 lg:space-x-10"
              >
                <infoCard v-if="!selectedUser">
                  <template v-slot:svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="text-secondary w-8 h-8 mx-auto"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Operarios</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >{{ workplaceUsers.length }}</span
                    ></template
                  >
                </infoCard>
                <infoCard>
                  <template v-slot:svg>
                    <svg
                      width="32px"
                      height="32px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-green-500 mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Entradas</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >{{ punchInCount }}</span
                    ></template
                  >
                </infoCard>
                <infoCard>
                  <template v-slot:svg>
                    <svg
                      width="32px"
                      height="32px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-red-500 mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Salidas</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >{{ punchOutCount }}</span
                    ></template
                  >
                </infoCard>
              </div>
              <!-- Attend Day Selector -->
              <attendDaySelector
                v-if="!selectedUser"
                :workedDaysList="workedDaysList"
                :theme="theme"
                :filtredAttendsDay="filtredAttendsDay"
                v-on:sendDay="filtredAttendsDay = $event"
              />
              <!-- Attend Rows -->
              <transition-group
                class="grid grid-flow-col auto-cols-max py-2 overflow-y-scroll mt-2"
                name="list"
                tag="section"
              >
                <attendRow
                  v-on:markersToDisplay="gMapMarker = $event"
                  v-on:passRowToChange="
                    (dataToChange = $event.attend), (gpsData = $event.gpsData)
                  "
                  :selectedUser="selectedUser"
                  :users="users"
                  v-for="attend in filtredAttends"
                  :key="attend.id"
                  :attend="attend"
                />
              </transition-group>
              <!-- AttendChange -->
              <transition name="fade" mode="out-in">
                <div
                  class="w-full h-full z-10 absolute top-0 bg-gray-800 dark:bg-gray-600 bg-opacity-75"
                  v-if="dataToChange && gpsData"
                >
                  <attendChange
                    v-on:dataChanged="
                      (dataToChange = null),
                        (gpsData = null),
                        (adminChange = true)
                    "
                    :dataToChange="dataToChange"
                    :gpsData="gpsData"
                  />
                  <button
                    class="flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-red-800 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out mt-32 z-10 w-1/2 mx-auto"
                    @click="(dataToChange = null), (gpsData = null)"
                  >
                    X
                  </button>
                </div>
              </transition>
              <!-- AttendChange -->
              <!-- <msgBlog /> -->
            </div>
            <div
              class="w-full h-64 flex-shrink-0 lg:w-1/3 lg:flex-shrink rounded-xl"
            >
              <gMaps
                v-if="filtredAttends.length > 0"
                height="500"
                :markers="markers"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <dataGrid :attends="filtredAttends" :users="workplaceUsers" />
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :loader="loader"
    ></loading>
  </div>
</template>

<script>
// VUEX
import { mapState, mapGetters, mapActions } from "vuex";
// Page components
import dataGrid from "@/pages/Admin/dataGrid.vue";
import infoCard from "@/pages/Admin/infoCard.vue";
import attendDaySelector from "@/pages/Admin/attendDaySelector.vue";
// import Tools from "@/pages/Admin/Tools.vue";
// import msgBlog from "@/pages/Admin/msgBlog.vue";
// Workpace & User selectors
import attendAdminUsers from "@/pages/Admin/attendAdminUsers.vue";
import attendAdminPlaces from "@/pages/Admin/attendAdminPlaces.vue";
//Month selector
import monthSelector from "@/components/utils/monthSelector.vue";
//mixins
import utils from "@/mixins/utils";
// Attend List && change popup
import attendChange from "@/pages/Admin/attendChange.vue";
import attendRow from "@/pages/Admin/attendRow.vue";
//gMaps
import gMaps from "@/components/gMaps.vue";
// Loader
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Admin",
  mixins: [utils],
  components: {
    // Tools,
    // msgBlog,
    infoCard,
    monthSelector,
    attendAdminUsers,
    attendAdminPlaces,
    attendChange,
    attendRow,
    attendDaySelector,
    gMaps,
    dataGrid,
    Loading,
  },
  data: function () {
    return {
      showSidebar: false,
      // ATTEND DATA
      selectedMes: null,
      today: null,
      selectedUser: null,
      workedDays: null,
      dataToChange: null,
      workplaceUsers: [],
      filtredAttends: [],
      workedDaysList: [],
      filtredAttendsDay: null,
      gMapMarker: null,
      showMonthAttends: true,
      adminChange: false,
      // Loader
      isLoading: true,
      fullPage: true,
      loader: "dots",
      workplace: null,
    };
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: (state) => state.attendance,
      d: (state) => state.d,
      users: (state) => state.users,
      selectedTime: (state) => state.selectedTime,
    }),
    ...mapState("auth", ["user"]),
    ...mapGetters({ theme: "theme/getTheme" }),
    punchInCount() {
      return this.filtredAttends.reduce((counter, obj) => {
        if (obj.data.enterTime) counter += 1;
        return counter;
      }, 0);
    },
    punchOutCount() {
      return this.filtredAttends.reduce((counter, obj) => {
        if (obj.data.leaveTime) counter += 1;
        return counter;
      }, 0);
    },
    userData() {
      return this.users.find(({ author }) => author === this.user.uid);
    },
    markers() {
      return [
        ...this.filtredAttends.map((item) => ({
          gps: item["data"]["gpsLoc"],
          time: item["data"]["enterTime"],
          author: this.users.find(({ author }) => author === item["author"]),
        })),
        ...this.filtredAttends.map((item) => ({
          gps: item["data"]["gpsLocLeave"],
          time: item["data"]["leaveTime"],
          author: this.users.find(({ author }) => author === item["author"]),
        })),
      ];
    },
  },
  methods: {
    ...mapActions([
      "getAsist",
      "getUsers",
      "getUserData",
      "selectMonthLimites",
    ]),
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    getUsersAttends(val) {
      this.filtredAttends = [];

      const dataList = this.attendList.filter(({ data }) => data.email === val);

      this.filtredAttends = dataList;
    },
    async getDaysAttends(val) {
      this.filtredAttends = [];

      const dataList = await this.attendList.filter(
        ({ curentTime }) => curentTime === new Date(val).getTime()
      );

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
    setStartEnd(date) {
      return {
        start: new Date(date).setHours(0, 0, 0, 0),
        end: new Date(date).setHours(23, 59, 59, 999),
      };
    },
    weekStartEnd() {
      var firstday = new Date(
        this.d.setDate(this.d.getDate() - this.d.getDay())
      );
      firstday = firstday.setHours(0, 0, 0, 0);
      var lastday = new Date(
        this.d.setDate(this.d.getDate() - this.d.getDay() + 6)
      );
      lastday = lastday.setHours(23, 59, 59, 999);
      console.log(firstday, lastday);
    },
    async getMonthAttend(newValue) {
      if (newValue && this.selectedTime) {
        const data = {
          workplace: this.workplace,
          time: this.selectedTime,
          uid: this.user.uid,
        };
        this.selectedUser = null;
        await this.getAsist(data);
        this.getWorkedDaysList();
      }
    },
    roundWithPrecision(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    },
    getWorkedDaysList() {
      this.workedDaysList = this.getUniqueListBy(
        this.filtredAttends,
        "curentTime"
      ).map(({ curentTime }) => new Date(curentTime));
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
  watch: {
    filtredAttendsDay: function (newValue) {
      if (newValue) {
        this.getDaysAttends(newValue);
      }
    },
    // Watch selected user to return Attends of specified User
    selectedUser: function (newValue) {
      if (newValue === "Todos") {
        this.selectedUser = null;
        this.getMonthAttend(this.workplace);
      } else {
        this.getUsersAttends(newValue);
        this.generateAttendInfo(this.filtredAttends);
      }
    },
    //Get all Attends from selected workplace for this day o month
    showMonthAttends: function (newValue) {
      if (newValue === true) {
        this.getMonthAttend(this.workplace);
      }
    },
    workplace: function (newValue) {
      this.getMonthAttend(newValue);
    },
    // Vuex function to get attendList
    attendList: function (newValue) {
      this.filtredAttends = newValue;
      const data = [...new Set(newValue.map((o) => o.data.email))];
      if (data.length > 0) {
        this.workplaceUsers = [];
        data.forEach((o) => {
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
    await this.getUsers();
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    this.selectedMes = date.getMonth();
    this.selectedUser = this.user.email;
    this.workplace = this.userData.workplace[1];
    this.isLoading = false;
  },
};
</script>
<style lang=""></style>