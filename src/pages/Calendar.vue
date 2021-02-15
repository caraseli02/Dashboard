<template>
  <article
    v-if="geolocation.lat && geolocation.lng"
    class="min-h-screen mx-4 py-4 relative flex justify-start items-center flex-col mt-4"
  >
    <!-- Show Map Buttons -->
    <!-- Enter/Leave Buttons -->
    <div class="mb-8 flex justify-between items-center w-full text-lg">
      <button
        class="glass-gray"
        :class="enterModal ? 'shadow-lg bg-gray-300' : ''"
        @click="(enterModal = true), (userData.leaveTime = null)"
      >
        Entrada
      </button>
      <button
        v-if="userData.enterTime"
        class="glass-gray"
        :class="!enterModal ? 'shadow-lg bg-gray-300' : ''"
        @click="enterModal = false"
      >
        Salida
      </button>
    </div>
    <!-- Day and Time Selector -->
    <div class="w-full p-2 mx-auto glass-light z-10">
      <!-- Asist Selector -->
      <div class="grid grid-cols-1 gap-2 p-2 content-center">
        <div class="flex justify-between"></div>
        <!-- EnterHours and Temperature Modal -->
        <div
          v-if="enterModal"
          class="flex justify-between flex-col items-center"
        >
          <div class="flex justify-center items-center">
            <datetime
              :input-class="
                userData.enterTime
                  ? 'mb-4 mx-auto p-2 rounded-l-lg text-green-500 font-bold text-center text-lg shadow-xl'
                  : 'mb-4 mx-auto p-2 rounded-lg text-green-500 font-bold text-center text-lg  animate-bounce'
              "
              type="datetime"
              v-model="userData.enterTime"
              value-zone="local"
              zone="local"
              placeholder="Seleccionar la fecha"
              :max-datetime="d.toISOString()"
            ></datetime>
            <span
              v-if="userData.enterTime"
              @click="userData.enterTime = null"
              class="mb-4 text-center text-gray-900 bg-gradient-to-r from-red-400 via-pink-500 to-red-500 font-bold p-2 rounded-r-lg px-4 text-lg"
            >
              x
            </span>
          </div>

          <p class="flex justify-center items-center mb-2">
            <label class="text-xl mb-2" for="vol">Temperatura</label>
            <select
              v-model="userData.temperature"
              id="vol"
              name="vol"
              required
              class="appearance-none block w-20 ml-2 my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus text-2xl"
            >
              <option v-for="temp in tempList" :key="temp" :value="temp">
                {{ temp }}
              </option>
            </select>
          </p>
        </div>
        <!-- leaveHours  Modal -->
        <div
          v-if="userData.enterTime && !enterModal"
          class="flex justify-between flex-col items-center"
        >
          <div class="flex justify-center items-center">
            <datetime
              type="datetime"
              value-zone="local"
              zone="local"
              :input-class="
                userData.leaveTime
                  ? 'mb-4 mx-auto p-2 rounded-l-lg text-green-500 font-bold text-center text-lg shadow-xl'
                  : 'mb-4 mx-auto p-2 rounded-lg text-green-500 font-bold text-center text-lg  animate-bounce'
              "
              placeholder="Pulsa para seleccionar"
              v-model="userData.leaveTime"
              :min-datetime="userData.enterTime"
              :max-datetime="setMaxDateTime"
            ></datetime>
            <span
              v-if="userData.leaveTime"
              @click="userData.leaveTime = null"
              class="mb-4 text-center text-gray-900 bg-gradient-to-r from-red-400 via-pink-500 to-red-500 font-bold p-2 rounded-r-lg px-4 text-lg"
            >
              X
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Assist Confirm and DateCheck -->
    <section
      v-if="userData.enterTime"
      class="w-full mt-4 text-center flex relative z-0"
    >
      <drag-verify
        v-if="!dateExist[0]"
        v-on:passcallback="swipeHandler()"
        class="mt-8"
        :width="swiper.width"
        :height="swiper.height"
        :text="swiper.text"
        :success-text="geolocation.lat ? swiper.successText : 'error'"
        :background="swiper.background"
        :progress-bar-bg="swiper.progressBarBg"
        :completed-bg="geolocation.lat ? swiper.completedBg : 'red'"
        :handler-bg="swiper.handlerBg"
        :handler-icon="swiper.handlerIcon"
        :text-size="swiper.textSize"
        :success-icon="geolocation.lat ? swiper.successIcon : 'x'"
        :circle="swiper.isCircle"
      >
      </drag-verify>
      <div
        class="w-full text-xl text-gray-100 text-left font-bold glass-light"
        v-else-if="dateExist[0]['data']['leaveTime']"
      >
        <span class="p-2 block text-gray-900"> Info sobre la fecha</span>
        <div class="flex justify-around item">
          <ul
            class="flex flex-col justify-around items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 h-32 glass-light"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block enterTime w-10 h-10"></span>
              <span class="text-lg font-light mb-2">Entrada</span>
              {{ dateExist[0]["data"]["enterTime"].slice(11, 16) }}
            </li>
            <li></li>
          </ul>
          <ul
            class="flex flex-col justify-around items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 glass-light h-32"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block enterTime w-10 h-10"></span>
              <span class="text-lg font-light mb-2">Salida</span>
              {{ dateExist[0]["data"]["leaveTime"].slice(11, 16) }}
            </li>
          </ul>
        </div>
      </div>
      <div
        class="w-full mx-auto text-left mt-4 rounded-xl p-2 glass-light"
        v-else
      >
        <span class="text-md text-gray-800 mb-4"
          >Info sobre la fecha seleccionada:</span
        >
        <div class="flex justify-around item">
          <ul
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 pt-4 mx-auto text-gray-900 bg-gray-100 rounded-lg h-40"
          >
            <li class="flex flex-col justify-center items-center mb-2">
              <span class="block enterTime w-8 h-8 mb-2"></span>
              <span class="text-lg font-light mb-1">Entrada</span>
              {{ dateExist[0]["data"]["enterTime"].slice(11, 16) }}
            </li>
            <li class="w-full">
              <button
                v-if="
                  enterModal &&
                  userData.enterTime.slice(11, 16) !==
                    dateExist[0]['data']['enterTime'].slice(11, 16) &&
                  !dateExist[0].data.leaveTime
                "
                class="bg-blue-500 hover:bg-blue-400 text-sm text-white py-2 px-4 w-full rounded-b-lg"
                @click="changEnterTime(dateExist[0])"
              >
                Cambiar<br />
              </button>
            </li>
          </ul>
          <ul
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 pt-4 mx-auto text-gray-900 bg-gray-100 rounded-lg h-40"
          >
            <li class="flex flex-col justify-center items-center mb-2">
              <span class="block leaveTime w-8 h-8 mb-2"></span>
              <span class="text-lg font-light mb-1">Salida</span>
              {{
                userData.leaveTime
                  ? userData.leaveTime.slice(11, 16)
                  : "-- / --"
              }}
            </li>
            <li class="w-full">
              <button
                class="bg-green-500 hover:bg-green-400 text-sm text-white py-2 px-4 rounded-b-lg w-full"
                v-if="enterModal && !dateExist[0].data.leaveTime"
                @click="leaveConfirm(dateExist[0])"
              >
                Apuntar
              </button>
            </li>
          </ul>
        </div>
        <div class="flex justify-around items-center mt-2">
          <button
            class="my-3"
            v-if="userData.leaveTime"
            @click="enterModal = false"
          >
            <span
              class="bg-gradient-to-r from-teal-400 via-green-500 to-blue-500 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
              @click="saveLeaveTime(dateExist)"
              >Confirmar</span
            >
          </button>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
// import IconBase from "@/components/IconBase.vue";
// import IconMaps from "@/components/icons/IconMaps.vue";
// import Alerts from "@/components/utils/Alerts.vue";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import dragVerify from "vue-drag-verify";
import utils from "@/mixins/utils";

export default {
  name: "calendar",
  mixins: [utils],
  data() {
    return {
      swiper: {
        width: 350,
        text: "Desliza para confirmar",
        background: "#ccc",
        handlerIcon: "gg-chevron-double-right",
        successIcon: "gg-check",
        progressBarBg: "#FFFF99",
        completedBg: "#66cc66",
        handlerBg: "#fff",
        successText: "success",
        height: 60,
        textSize: "20px",
        isCircle: true,
      },
      enterModal: true,
      showMap: false,
      userData: {
        email: localStorage.getItem("email"),
        uid: localStorage.getItem("uid"),
        dttm: new Date(),
        enterTime: null,
        temperature: 36.6,
        leaveTime: null,
      },
      // emailSending: false,
      asistList: null,
      tempList: [],
    };
  },
  watch: {
    userData: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {
        if (newValue.enterTime) {
          let time =
            new Date(newValue.enterTime.slice(0, 10)).getTime() - 3600000;
          this.bindLastAsist(time);
        }
      },
    },
  },
  components: { datetime: Datetime, dragVerify /*,Alerts*/ },
  // components: { IconBase, IconMaps, datetime: Datetime },
  computed: {
    ...mapState({
      geolocation: (state) => state.geolocation,
      loadingMap: (state) => state.loadingMap,
      d: (state) => state.d,
    }),
    dateExist() {
      return this.$store.state.checkDay;
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    attendList() {
      return this.convertToAsist();
    },
    setMaxDateTime() {
      return new Date(
        new Date(this.userData.enterTime).getTime() + 60 * 60 * 24 * 1000
      ).toISOString();
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

    async swipeHandler() {
      await this.clearLocation();
      await this.currentLocation();
      if (this.geolocation.lat && this.geolocation.lng) {
        (this.userData.gpsLoc = this.geolocation),
          await this.setAttendance(this.userData).then(
            this.$alert("Apuntado.")
          );
      }

      // this.enterModal = false;
      // this.$router.replace("calendar");
    },
    async changEnterTime(value) {
      await this.clearLocation();
      await this.currentLocation();
      if (value["data"]["enterTime"]) {
        this.$prompt(
          `Motivo del cambio?
             La nueva hora: ${this.userData.enterTime.slice(11, 16)}`
        ).then((text) => {
          value["data"]["enterChange"] = {
            oldValue: value["data"]["enterTime"].slice(11, 16),
            newValue: this.userData.enterTime.slice(11, 16),
            msg: text,
            changeTime: new Date().toLocaleString(),
          };
          value["data"]["enterTime"] = this.userData.enterTime;
          if (this.geolocation.lat && this.geolocation.lng) {
            this.changeAttendance(value);
          }
        });
      }
    },
    async saveLeaveTime(value) {
      await this.clearLocation();
      await this.currentLocation();
      if (value) {
        value["data"]["leaveTime"] = this.userData.leaveTime
          ? this.userData.leaveTime
          : this.userData.enterTime;
        value["activeSession"] = false;
        // value[0]["data"]["extraHors"] = this.extraHors;
        // value[0]["data"]["workedHors"] = this.workedHors;
        if (this.geolocation.lat && this.geolocation.lng) {
          if (this.deepEqual(value.data.gpsLoc, this.geolocation)) {
            value["data"]["gpsLocLeave"] = this.geolocation;
          }
          value["activeSession"] = false;
          this.changeAttendance(value).then(() => {
            this.$alert("Apuntado.");
          });
        }
      }
    },
    leaveConfirm(value) {
      this.$confirm(
        `Apuntar Salida? A las ${this.userData.enterTime.slice(11, 16)}`
      ).then(() => {
        this.saveLeaveTime(value);
      });
    },
    deleteAttendData() {
      this.$confirm("Borar assistencia?").then(() => {
        (this.userData.leaveTime = null),
          (this.userData.enterTime = null),
          (this.enterModal = true),
          this.deleteAsist(this.dateExist[0].id);
      });
    },
    // sendVerifyEmail() {
    //   this.emailSending = true;
    //   const user = firebase.auth().currentUser;
    //   const actionCodeSettings = {
    //     url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
    //   };
    //   user
    //     .sendEmailVerification(actionCodeSettings)
    //     .then(() => {
    //       this.emailSending = false;
    //     })
    //     .catch((error) => {
    //       this.emailSending = false;
    //       this.error = error.message;
    //     });
    // },
    convertToAsist() {
      this.asistList = new Set();

      this.$store.state.attendance.forEach((element) => {
        let monthNr = new Date(
          element["createdAt"]["seconds"] * 1000
        ).getMonth();
        let dayNr = new Date(element["createdAt"]["seconds"] * 1000).getDate();
        let yearNr = new Date(
          element["createdAt"]["seconds"] * 1000
        ).getFullYear();
        this.asistList.add({ month: monthNr + 1, day: dayNr, year: yearNr });
      });

      return this.asistList;
    },
    // ...mapActions(["createAsist"]),
  },
  async created() {
    for (var i = 355; i <= 375; i++) {
      this.tempList.push(i / 10);
    }
  },
};
</script>

<style scoped>
.borderOnActive::before {
  content: "";
  width: 50%;
  height: 2px;
  background-color: aqua;
}

.swipAnimation {
  animation: slidein 5s infinite;
}

@keyframes slidein {
  0% {
    opacity: 0.25;
    left: 5%;
  }

  99% {
    opacity: 0.95;
    left: 85%;
  }
}

.input {
  display: block;
  position: relative;
  padding: 1rem 3.5rem 1rem 0.75rem;

  font-size: 1rem;
  font-family: monospace;

  border: 1px solid #8292a2;
  border-radius: 0.25rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  z-index: 2;
  overflow: hidden;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.4)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='22' viewBox='0 0 20 22'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23688EBB' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' transform='translate(1 1)'%3E%3Crect width='18' height='18' y='2' rx='2'/%3E%3Cpath d='M13 0L13 4M5 0L5 4M0 8L18 8'/%3E%3C/g%3E%3C/svg%3E")
    right 1rem center no-repeat;

  cursor: pointer;
}

input:focus {
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  z-index: 2;
  overflow: hidden;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

::-webkit-datetime-edit {
}

::-webkit-datetime-edit-fields-wrapper {
}

::-webkit-datetime-edit-month-field:hover,
::-webkit-datetime-edit-day-field:hover,
::-webkit-datetime-edit-year-field:hover {
  background: rgba(0, 120, 250, 0.1);
}

::-webkit-datetime-edit-text {
  opacity: 0;
}

::-webkit-clear-button,
::-webkit-inner-spin-button {
  display: none;
}

::-webkit-calendar-picker-indicator {
  position: absolute;
  width: 2.5rem;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;

  opacity: 0;
  cursor: pointer;

  color: rgba(0, 120, 250, 1);
  background: rgba(0, 120, 250, 1);
}

input:hover::-webkit-calendar-picker-indicator {
  opacity: 0.05;
}

input:hover::-webkit-calendar-picker-indicator:hover {
  opacity: 0.15;
}
</style>
