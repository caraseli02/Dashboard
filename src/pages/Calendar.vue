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
        @click="(enterModal = true), (leaveTime = null)"
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
                leaveTime
                  ? 'mb-4 mx-auto p-2 rounded-l-lg text-green-500 font-bold text-center text-lg shadow-xl'
                  : 'mb-4 mx-auto p-2 rounded-lg text-green-500 font-bold text-center text-lg  animate-bounce'
              "
              placeholder="Pulsa para seleccionar"
              v-model="leaveTime"
              :min-datetime="userData.enterTime"
              :max-datetime="setMaxDateTime"
            ></datetime>
            <span
              v-if="leaveTime"
              @click="leaveTime = null"
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
        <!-- Salida a las: {{ dateExist[0]["data"]["leaveTime"].slice(11, 16) }} -->
        <!-- <button @click="deleteAttendData"
          class="block text-gray-900 font-bold my-3 mx-auto py-2 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg">
          Borrar
        </button> -->
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
                    dateExist[0]['data']['enterTime'].slice(11, 16)
                "
                class="bg-blue-500 hover:bg-blue-400 text-sm text-white py-2 px-4 w-full rounded-b-lg"
                @click="changeEnterTime(dateExist)"
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
              {{ leaveTime ? leaveTime.slice(11, 16) : "-- / --" }}
            </li>
            <li class="w-full">
              <button
                class="bg-green-500 hover:bg-green-400 text-sm text-white py-2 px-4 rounded-b-lg w-full"
                v-if="enterModal"
                @click="enterModal = false"
              >
                Apuntar
              </button>
            </li>
          </ul>
        </div>
        <div class="flex justify-around items-center mt-2">
          <button class="my-3" v-if="leaveTime" @click="enterModal = false">
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
      <h1 class="text-red-600 text-2xl text-center m-4">
        Tu ubicación no esta disponible<br />
        <span class="text-gray-700 text-lg px-4 mt-2"
          >Por favor habilita servicio de ubicación y recarga la pagina</span
        >
      </h1>
      <a
        class="flex justify-center bg-gray-500 text-gray-700 text-lg rounded p-2 w-2/3 mt-8 mx-auto text-center"
        href="https://support.google.com/accounts/answer/3467281?hl=es-419"
      >
        Como administrar tu ubicación
      </a>
      <span class="block mt-2 text-sm text-center"
        >( Ayuda de Cuenta de Google )</span
      >
    </div>
  </section>
</template>

<script>
// import IconBase from "@/components/IconBase.vue";
// import IconMaps from "@/components/icons/IconMaps.vue";
import Alerts from "@/components/utils/Alerts.vue";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import dragVerify from "vue-drag-verify";

export default {
  name: "calendar",
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
        gpsLoc: {},
        dttm: new Date().toLocaleString(),
        enterTime: null,
        temperature: 36.6,
      },
      leaveTime: null,
      workedHors: null,
      extraHors: null,
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
    leaveTime: function (val) {
      if (val) {
        this.extraHors = 0;
        let enter = null;
        if (this.dateExist[0]) {
          enter = this.dateExist[0].data.enterTime.replace('Z', '')
          enter = new Date(enter);
          console.log(enter);
        } else {
          enter = new Date(this.userData.enterTime);
          console.log(enter);
        }
        const leave = new Date(val);

        this.workedHors =
          (new Date(leave).getTime() - new Date(enter).getTime()) / 60000;
        if (this.workedHors > 500) {
          this.extraHors = this.timeConvert(
            this.diff_minutes(enter, leave) - 480
          );
          this.userData["extraHors"] = this.extraHors;
        }
        if (Math.sign(this.workedHors)) {
          this.workedHors = this.timeConvert(this.workedHors);
          this.userData["workedHors"] = this.workedHors;
        }
        this.userData["leaveTime"] = this.leaveTime;
      }
    },
  },
  components: { datetime: Datetime, dragVerify, Alerts },
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
    ]),

    swipeHandler() {
      // console.log(direction);  May be left / right / top / bottom
      this.setAttendance(this.userData);
      // this.enterModal = false;
      // this.$router.replace("calendar");
    },
    changeEnterTime(value) {
      console.log(value);
      if (value[0]["data"]["enterTime"]) {
        this.$prompt(
          `Motivo del cambio?
             La nueva hora: ${this.userData.enterTime.slice(11, 16)}`
        ).then((text) => {
          value[0]["data"]["enterChange"] = {
            oldValue: value[0]["data"]["enterTime"].slice(11, 16),
            newValue: this.userData.enterTime.slice(11, 16),
            msg: text,
            changeTime: new Date().toLocaleString(),
          };
          value[0]["data"]["enterTime"] = this.userData.enterTime;
          this.changeAttendance(value[0]);
        });
      }
    },
    saveLeaveTime(value) {
      if (value[0]) {
        value[0]["data"]["leaveTime"] = this.leaveTime;
        value[0]["data"]["extraHors"] = this.extraHors;
        value[0]["data"]["workedHors"] = this.workedHors;
        this.changeAttendance(value[0]);
      }
    },
    deleteAttendData() {
      this.$confirm("Borar assistencia?").then(() => {
        (this.leaveTime = null),
          (this.userData.enterTime = null),
          (this.enterModal = true),
          this.deleteAsist(this.dateExist[0].id);
      });
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
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
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
    // async markAsist() {
    //   await firebase
    //     .firestore()
    //     .collection("attendance")
    //     .add({
    //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //       data: this.userData,
    //     })
    //     .then(() => {
    //       console.log("Enviado");
    //     })
    //     .catch((error) => {
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
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    // get position
    await navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.userData.gpsLoc.lat = pos.coords.latitude;
        this.userData.gpsLoc.lng = pos.coords.longitude;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
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
