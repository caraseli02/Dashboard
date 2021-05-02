<template>
  <div class="flex flex-col h-full">
    <div v-if="users !== null && userData !== null" class="w-full px-4 lg:p-10">
      <monthSelector
        :workplace="workplace"
        :selectedWorkplace="userData.workplace[1]"
        :getAsistFunc="true"
        v-on:changeSelectedMonth="changeSelectedMonth($event)"
      />
      <section
        v-if="users !== null && users.length > 1"
        class="flex justify-between items-center overflow-hidden max-w-lg xl:mt-4 mx-auto"
      >
        <attendAdminPlaces
          v-if="userData && 'workplace' in userData"
          :userData="userData"
          :workplace.sync="workplace"
        />
        <attendAdminUsers
          v-show="workplaceUsers"
          :usersList="workplaceUsers"
          v-model="selectedUser"
        />
      </section>
      <!-- <Tools /> -->
      <!-- Sidebar Toggler -->
      <section class="flex md:mt-4">
        <sidebarToggler
          @click.native="showSidebar = !showSidebar"
          :theme="theme"
          :showSidebar="showSidebar"
        />
        <!-- Month / Day Selector -->
        <monthDaySelect
          @click.native="showMonthAttends = !showMonthAttends"
          v-on:dayClick="resetToDayAttend()"
          v-on:monthClick="resetToMonthAttend()"
          :selectedUser="selectedUser"
          :theme="theme"
          :filtredAttendsDay="filtredAttendsDay"
          :showMonthAttends="showMonthAttends"
        />
      </section>

      <div
        v-if="!isLoading"
        class="overflow-hidden lg:overflow-visible pb-8 lg:pb-0"
      >
        <div
          class="transform lg:transform-none transition-all duration-300"
          :class="showSidebar ? '-translate-x-full' : ''"
        >
          <div class="flex mt-4 lg:mt-10 lg:space-x-10">
            <div
              class="w-full flex-shrink-0 lg:w-2/3 lg:flex-shrink rounded-xl"
            >
              <div
                v-show="filtredAttends.length > 0"
                class="flex space-x-4 lg:space-x-10"
              >
                <infoCard v-show="!selectedUser || selectedUser === 'allData'">
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
                <infoCard v-show="selectedUser && selectedUser !== 'allData'">
                  <template v-slot:svg>
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      class="text-secondary w-8 h-8 mx-auto"
                    >
                      <path
                        d="M3.74 14.47c0-2.04.51-3.93 1.52-5.66s2.38-3.1 4.11-4.11 3.61-1.51 5.64-1.51c1.52 0 2.98.3 4.37.89s2.58 1.4 3.59 2.4 1.81 2.2 2.4 3.6.89 2.85.89 4.39c0 1.52-.3 2.98-.89 4.37s-1.4 2.59-2.4 3.59-2.2 1.8-3.59 2.39-2.84.89-4.37.89c-1.53 0-3-.3-4.39-.89s-2.59-1.4-3.6-2.4-1.8-2.2-2.4-3.58-.88-2.84-.88-4.37zm2.48 0c0 2.37.86 4.43 2.59 6.18 1.73 1.73 3.79 2.59 6.2 2.59 1.58 0 3.05-.39 4.39-1.18s2.42-1.85 3.21-3.2 1.19-2.81 1.19-4.39-.4-3.05-1.19-4.4-1.86-2.42-3.21-3.21-2.81-1.18-4.39-1.18-3.05.39-4.39 1.18S8.2 8.72 7.4 10.07s-1.18 2.82-1.18 4.4zm3.29-.01c0-.23.08-.43.24-.59s.36-.24.59-.24h3.79V7.81c0-.23.08-.43.24-.59s.36-.24.59-.24.43.08.59.24.24.36.24.59v6.67c0 .23-.08.43-.24.59s-.36.24-.59.24c-.1 0-.16 0-.19-.01h-4.44c-.23 0-.43-.08-.59-.25a.876.876 0 01-.23-.59z"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Horas de Trabajo</span
                    ></template
                  >
                  <template v-slot:number>
                    <span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                    >
                      {{ workedTime }}
                      <i class="text-xs text-secondary">en {{ workedDays }}d</i>
                    </span>
                  </template>
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
                v-show="!selectedUser || selectedUser === 'allData'"
                :workedDaysList="workedDaysList"
                :theme="theme"
                :filtredAttendsDay="filtredAttendsDay"
                v-on:sendDay="setAttendDay($event)"
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
                  class="w-full h-full z-10 absolute top-0 bg-gray-800 dark:bg-gray-600 bg-opacity-75 flex justify-center items-center"
                  v-if="dataToChange && gpsData"
                  @click.self="(dataToChange = null), (gpsData = null)"
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
                    class="py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-red-800 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out absolute top-0 right-0 z-10 w-16"
                    @click.self="(dataToChange = null), (gpsData = null)"
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
      <div v-else class="mx-10 mt-10 h-64">
        <div class="animate-pulse flex flex-col space-x-4">
          <div class="flex-1 space-y-4 py-1">
            <div class="space-y-2">
              <div class="h-8 bg-primary rounded"></div>
              <div class="h-8 bg-primary rounded w-5/6"></div>
            </div>
          </div>
          <ul class="mt-4 flex flex-wrap justify-center items-center">
            <li
              v-for="i in 9"
              :key="i"
              class="rounded-lg bg-primary h-24 w-1/4 m-2"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <dataGrid
      v-if="!isLoading && filtredAttends"
      :attends="filtredAttends"
      :users="workplaceUsers"
      :workplace="workplace"
      :selectedMonth="selectedMonth"
      :key="selectedMonth"
    />
  </div>
</template>

<script>
// VUEX
import { mapState, mapGetters, mapActions } from "vuex";
// Page components
import dataGrid from "@/pages/Admin/dataGrid.vue";
import infoCard from "@/pages/Admin/infoCard.vue";
import sidebarToggler from "@/pages/Admin/sidebarToggler.vue";
import monthDaySelect from "@/pages/Admin/monthDaySelect.vue";
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
// import Loading from "vue-loading-overlay";
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
    // Loading,
    sidebarToggler,
    monthDaySelect,
  },
  data: function () {
    return {
      showSidebar: false,
      // ATTEND DATA
      selectedMonth: null,
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
      userData: (state) => state.userData,
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
    ...mapActions(["getAsist", "selectMonthLimites"]),
    changeSelectedMonth(e) {
      this.selectedMonth = e;
      this.isLoading = true;
    },
    setAttendDay(event) {
      this.filtredAttendsDay = event;
      this.showMonthAttends = false;
      console.log(this.filtredAttendsDay.getDay() === this.d.getDay());
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    async getUsersAttends(val) {
      this.filtredAttends = [];

      const dataList = this.attendList.filter(
        ({ data }) =>
          data.email === val && data.email !== "vladwebapp@gmail.com"
      );

      this.filtredAttends = dataList;
    },
    async getDaysAttends(val) {
      this.filtredAttends = [];
      const dataList = await this.attendList.filter(
        ({ curentTime, data }) =>
          curentTime === new Date(val).getTime() &&
          data.email !== "vladwebapp@gmail.com"
      );

      if (dataList.length > 0) {
        this.filtredAttends = dataList;
        setTimeout(() => (this.isLoading = false), 500);
      }
    },
    async generateAttendInfo(newValue) {
      if (newValue.length > 0 && this.selectedUser && this.users) {
        const userData = await this.users.find(
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
    async getMonthAttend(newValue) {
      if (newValue && this.selectedTime) {
        const data = {
          workplace: this.workplace,
          time: this.selectedTime,
          uid: this.user.uid,
        };
        this.selectedUser = null;
        await this.getAsist(data).then(() => (this.isLoading = false));
        // this.getWorkedDaysList();
      }
    },
    roundWithPrecision(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    resetToMonthAttend() {
      (this.filtredAttendsDay = null), (this.showMonthAttends = true);
    },
    resetToDayAttend() {
      this.filtredAttendsDay = new Date(this.d.setHours(2, 0, 0, 0));
      this.showMonthAttends = false;
    },
    attendDataFilter(val) {
      return val.filter(({ data }) => data.email !== "vladwebapp@gmail.com");
    },
  },
  watch: {
    filtredAttendsDay: function (newValue) {
      if (newValue) {
        this.isLoading = true;
        this.getDaysAttends(newValue);
      }
    },
    // Watch selected user to return Attends of specified User
    selectedUser: function (newValue) {
      this.isLoading = true;
      try {
        if (newValue === "allData") {
          this.filtredAttends = this.attendDataFilter(this.attendList);
        } else {
          (this.filtredAttendsDay = null),
            (this.showMonthAttends = true),
            this.getUsersAttends(newValue);
          this.generateAttendInfo(this.filtredAttends);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => (this.isLoading = false), 500);
      }
    },
    //Get all Attends from selected workplace for this day o month
    showMonthAttends: function (newValue) {
      if (newValue === true) {
        try {
          this.filtredAttends = this.attendDataFilter(this.attendList);
          this.isLoading = true;
        } catch (err) {
          console.log(err);
        } finally {
          setTimeout(() => (this.isLoading = false), 500);
        }
      }
    },
    workplace: function (newValue) {
      if (newValue) {
        this.isLoading = true;
        this.getMonthAttend(newValue);
      }
    },
    // Vuex function to get attendList
    attendList: function (newValue) {
      if (this.selectedUser && this.selectedUser !== "allData") {
        return;
      }
      let filtredData = this.attendDataFilter(newValue);
      this.filtredAttends = filtredData;
      this.workedDaysList = this.getUniqueListBy(filtredData, "curentTime").map(
        ({ curentTime }) => new Date(curentTime)
      );
      const data = [...new Set(newValue.map((o) => o.data.email))];
      if (data.length > 0) {
        this.workplaceUsers = [];
        data.forEach((o) => {
          let user = this.users.find(
            ({ email }) => email === o && email !== "vladwebapp@gmail.com"
          );
          if (user) {
            this.workplaceUsers.push(user);
          }
        });
      }
      this.generateAttendInfo(newValue);
      setTimeout(() => (this.isLoading = false), 500);
    },
  },
  mounted() {
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    this.selectedMes = date.getMonth();
  },
};
</script>
<style lang=""></style>