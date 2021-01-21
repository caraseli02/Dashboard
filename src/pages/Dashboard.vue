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
    <button
      class="text-3xl rounded-full fixed bottom-0 right-0 mb-10 mr-10 hover:bg-green-400 text-green-400 font-semibold py-2 px-4 glass-dark w-16"
      @click="setAttendance(userData)"
    >
      +
    </button>
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
                  ? 'mb-4 mx-auto enterTime p-2 rounded-l-lg text-green-500 font-bold text-center text-lg shadow-xl'
                  : 'mb-4 mx-auto enterTime p-2 rounded-lg text-green-500 font-bold text-center text-lg  animate-bounce'
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

          <p class="flex flex-col justify-center items-center mb-2">
            <label class="text-xl mb-2" for="vol"
              >Temperatura : {{ userData.temperature }}</label
            >
            <input
              v-model="userData.temperature"
              type="range"
              id="vol"
              name="vol"
              min="35"
              max="40"
              step="0.1"
            />
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
                  ? 'mb-4 mx-auto enterTime p-2 rounded-l-lg text-green-500 font-bold text-center text-lg shadow-xl'
                  : 'mb-4 mx-auto enterTime p-2 rounded-lg text-green-500 font-bold text-center text-lg  animate-bounce'
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
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 bg-gradient-to-r from-blue-400 via-teal-500 to-blue-600 rounded-full h-32"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block enterTime w-10 h-10 mb-3"></span>
              {{ dateExist[0]["data"]["enterTime"].slice(11, 16) }}
            </li>
            <li></li>
          </ul>
          <ul
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 bg-gradient-to-r from-blue-400 via-teal-500 to-blue-600 rounded-full h-32"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block leaveTime w-8 h-8 mb-3"></span>
              {{ dateExist[0]["data"]["leaveTime"].slice(11, 16) }}
            </li>
          </ul>
        </div>
        <!-- Salida a las: {{ dateExist[0]["data"]["leaveTime"].slice(11, 16) }} -->
        <button
          @click="deleteAttendData"
          class="block text-gray-900 font-bold my-3 mx-auto py-2 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg"
        >
          Borar
        </button>
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
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 bg-gray-100 rounded-lg h-40"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block enterTime w-8 h-8 mb-3"></span>
              {{ dateExist[0]["data"]["enterTime"].slice(11, 16) }}
            </li>
            <li>
              <button
                v-if="
                  enterModal &&
                  userData.enterTime.slice(11, 16) !==
                    dateExist[0]['data']['enterTime'].slice(11, 16)
                "
                class="bg-blue-500 hover:bg-blue-400 text-sm text-white py-2 px-4 rounded"
                @click="changeEnterTime(dateExist)"
              >
                Cambiar<br />
              </button>
            </li>
          </ul>
          <ul
            class="flex flex-col justify-center items-center text-xl w-1/3 my-2 p-4 mx-auto text-gray-900 bg-gray-100 rounded-lg h-40"
          >
            <li class="flex flex-col justify-center items-center mb-3">
              <span class="block leaveTime w-8 h-8 mb-3"></span>
              {{ leaveTime ? leaveTime.slice(11, 16) : "-- / --" }}
            </li>
            <li>
              <button v-if="enterModal" @click="enterModal = false">
                <span
                  class="bg-green-500 hover:bg-green-400 text-sm text-white py-2 px-4 rounded"
                  v-if="enterModal"
                  >Apuntar</span
                >
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
// import IconBase from "@/components/IconBase.vue";
// import IconMaps from "@/components/icons/IconMaps.vue";
import Alerts from "@/components/utils/Alerts.vue";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import dragVerify from "vue-drag-verify";

export default {
  name: "dashboard",
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
        dttm: new Date(),
        enterTime: null,
        temperature: 36.6,
      },
      leaveTime: null,
      workedHors: null,
      extraHors: null,
      // emailSending: false,
      asistList: null,
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
          console.log(time);
          this.bindLastAsist(time);
        }
      },
    },
    // leaveTime: function(val) {
    //   if (val) {
    //     this.extraHors = 0;
    //     const enter = new Date(this.userData.enterTime);
    //     const leave = new Date(val);

    //     this.workedHors =
    //       (new Date(leave).getTime() - new Date(enter).getTime()) / 60000;
    //     if (this.workedHors > 480) {
    //       this.extraHors = this.timeConvert(
    //         this.diff_minutes(enter, leave) - 480
    //       );
    //       this.userData["extraHors"] = this.extraHors;
    //     }
    //     if (Math.sign(this.workedHors)) {
    //       this.workedHors = this.timeConvert(this.workedHors);
    //       this.userData["workedHors"] = this.workedHors;
    //     }
    //     this.userData["leaveTime"] = this.leaveTime;
    //   }
    // },
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
      if (value[0]["data"]["enterTime"]) {
        this.$confirm(
          `Confirmar cambio? ${this.userData.enterTime.slice(11, 16)}`
        ).then(() => {
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
      dt2 = new Date();
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
        console.log(this.asistList);
      });

      return this.asistList;
    },
    // ...mapActions(["createAsist"]),
  },
  async created() {
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

.enterTime {
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yMTguNjY3OTY5IDI0MGgtMjAyLjY2Nzk2OWMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OS0xNi0xNnM3LjE2Nzk2OS0xNiAxNi0xNmgyMDIuNjY3OTY5YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48cGF0aCBkPSJtMTM4LjY2Nzk2OSAzMjBjLTQuMDk3NjU3IDAtOC4xOTE0MDctMS41NTg1OTQtMTEuMzA4NTk0LTQuNjkxNDA2LTYuMjUtNi4yNTM5MDYtNi4yNS0xNi4zODY3MTkgMC0yMi42MzY3MTlsNjguNjk1MzEzLTY4LjY5MTQwNi02OC42OTUzMTMtNjguNjcxODc1Yy02LjI1LTYuMjUzOTA2LTYuMjUtMTYuMzg2NzE5IDAtMjIuNjM2NzE5czE2LjM4MjgxMy02LjI1IDIyLjYzNjcxOSAwbDgwIDgwYzYuMjUgNi4yNSA2LjI1IDE2LjM4MjgxMyAwIDIyLjYzNjcxOWwtODAgODBjLTMuMTM2NzE5IDMuMTMyODEyLTcuMjM0Mzc1IDQuNjkxNDA2LTExLjMyODEyNSA0LjY5MTQwNnptMCAwIi8+PHBhdGggZD0ibTM0MS4zMzIwMzEgNTEyYy0yMy41MzEyNSAwLTQyLjY2NDA2Mi0xOS4xMzY3MTktNDIuNjY0MDYyLTQyLjY2Nzk2OXYtMzg0YzAtMTguMjM4MjgxIDExLjYwNTQ2OS0zNC41MTU2MjUgMjguODgyODEyLTQwLjUxMTcxOWwxMjguMTcxODc1LTQyLjczMDQ2OGMyOC42NzE4NzUtOC43ODkwNjMgNTYuMjc3MzQ0IDEyLjQ4MDQ2OCA1Ni4yNzczNDQgNDAuNTc4MTI1djM4NGMwIDE4LjIxODc1LTExLjYwNTQ2OSAzNC40NzI2NTYtMjguODYzMjgxIDQwLjQ4ODI4MWwtMTI4LjIxNDg0NCA0Mi43NTM5MDZjLTQuNjcxODc1IDEuNDQ5MjE5LTkgMi4wODk4NDQtMTMuNTg5ODQ0IDIuMDg5ODQ0em0xMjgtNDgwYy0xLjM4NjcxOSAwLTIuNTU4NTkzLjE3MTg3NS0zLjgxNjQwNi41NTQ2ODhsLTEyNy42MzY3MTkgNDIuNTU4NTkzYy00LjE4MzU5NCAxLjQ1MzEyNS03LjIxMDkzNyA1LjY3NTc4MS03LjIxMDkzNyAxMC4yMTg3NXYzODRjMCA3LjI3NzM0NCA3Ljg5MDYyNSAxMi4xODM1OTQgMTQuNDg0Mzc1IDEwLjExMzI4MWwxMjcuNjM2NzE4LTQyLjU1ODU5M2M0LjE2MDE1Ny0xLjQ1MzEyNSA3LjIxMDkzOC01LjY3NTc4MSA3LjIxMDkzOC0xMC4yMTg3NXYtMzg0YzAtNS44NjcxODgtNC43NzczNDQtMTAuNjY3OTY5LTEwLjY2Nzk2OS0xMC42Njc5Njl6bTAgMCIvPjxwYXRoIGQ9Im0xODYuNjY3OTY5IDEwNi42Njc5NjljLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZ2LTMyYzAtMzIuMzYzMjgxIDI2LjMwMDc4MS01OC42Njc5NjkgNTguNjY0MDYyLTU4LjY2Nzk2OWgyNDBjOC44MzIwMzEgMCAxNiA3LjE2Nzk2OSAxNiAxNnMtNy4xNjc5NjkgMTYtMTYgMTZoLTI0MGMtMTQuNjk5MjE5IDAtMjYuNjY0MDYyIDExLjk2ODc1LTI2LjY2NDA2MiAyNi42Njc5Njl2MzJjMCA4LjgzMjAzMS03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTMxNC42Njc5NjkgNDQ4aC04NS4zMzU5MzhjLTMyLjM2MzI4MSAwLTU4LjY2NDA2Mi0yNi4zMDQ2ODgtNTguNjY0MDYyLTU4LjY2Nzk2OXYtMzJjMC04LjgzMjAzMSA3LjE2Nzk2OS0xNiAxNi0xNnMxNiA3LjE2Nzk2OSAxNiAxNnYzMmMwIDE0LjY5OTIxOSAxMS45NjQ4NDMgMjYuNjY3OTY5IDI2LjY2NDA2MiAyNi42Njc5NjloODUuMzM1OTM4YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48L3N2Zz4=");
  background-size: 20px;
}

.leaveTime {
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyLjAxNiA1MTIiIHdpZHRoPSI1MTJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDk2IDI0MC4wMDc4MTJoLTIwMi42Njc5NjljLTguODMyMDMxIDAtMTYtNy4xNjc5NjgtMTYtMTYgMC04LjgzMjAzMSA3LjE2Nzk2OS0xNiAxNi0xNmgyMDIuNjY3OTY5YzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTYgMCA4LjgzMjAzMi03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTQxNiAzMjAuMDA3ODEyYy00LjA5NzY1NiAwLTguMTkxNDA2LTEuNTU4NTkzLTExLjMwODU5NC00LjY5MTQwNi02LjI1LTYuMjUzOTA2LTYuMjUtMTYuMzg2NzE4IDAtMjIuNjM2NzE4bDY4LjY5NTMxMy02OC42OTE0MDctNjguNjk1MzEzLTY4LjY5NTMxMmMtNi4yNS02LjI1LTYuMjUtMTYuMzgyODEzIDAtMjIuNjMyODEzIDYuMjUzOTA2LTYuMjUzOTA2IDE2LjM4NjcxOS02LjI1MzkwNiAyMi42MzY3MTkgMGw4MCA4MGM2LjI1IDYuMjUgNi4yNSAxNi4zODI4MTMgMCAyMi42MzI4MTNsLTgwIDgwYy0zLjEzNjcxOSAzLjE1NjI1LTcuMjMwNDY5IDQuNzE0ODQzLTExLjMyODEyNSA0LjcxNDg0M3ptMCAwIi8+PHBhdGggZD0ibTE3MC42Njc5NjkgNTEyLjAwNzgxMmMtNC41NjY0MDcgMC04Ljg5ODQzOC0uNjQwNjI0LTEzLjIyNjU2My0xLjk4NDM3NGwtMTI4LjM4NjcxOC00Mi43NzM0MzhjLTE3LjQ2ODc1LTYuMTAxNTYyLTI5LjA1NDY4OC0yMi4zNzg5MDYtMjkuMDU0Njg4LTQwLjU3NDIxOXYtMzg0YzAtMjMuNTMxMjUgMTkuMTM2NzE5LTQyLjY2Nzk2ODUgNDIuNjY3OTY5LTQyLjY2Nzk2ODUgNC41NjI1IDAgOC44OTQ1MzEuNjQwNjI1NSAxMy4yMjY1NjIgMS45ODQzNzU1bDEyOC4zODI4MTMgNDIuNzczNDM3YzE3LjQ3MjY1NiA2LjEwMTU2MyAyOS4wNTQ2ODcgMjIuMzc4OTA2IDI5LjA1NDY4NyA0MC41NzQyMTl2Mzg0YzAgMjMuNTMxMjUtMTkuMTMyODEyIDQyLjY2Nzk2OC00Mi42NjQwNjIgNDIuNjY3OTY4em0tMTI4LTQ4MGMtNS44NjcxODggMC0xMC42Njc5NjkgNC44MDA3ODItMTAuNjY3OTY5IDEwLjY2Nzk2OXYzODRjMCA0LjU0Mjk2OSAzLjA1MDc4MSA4Ljc2NTYyNSA3LjQwMjM0NCAxMC4yODEyNWwxMjcuNzg1MTU2IDQyLjU4MjAzMWMuOTE3OTY5LjI5Njg3NiAyLjExMzI4MS40Njg3NSAzLjQ4MDQ2OS40Njg3NSA1Ljg2NzE4NyAwIDEwLjY2NDA2Mi00LjgwMDc4MSAxMC42NjQwNjItMTAuNjY3OTY4di0zODRjMC00LjU0Mjk2OS0zLjA1MDc4MS04Ljc2NTYyNS03LjQwMjM0My0xMC4yODEyNWwtMTI3Ljc4NTE1Ny00Mi41ODIwMzJjLS45MTc5NjktLjI5Njg3NC0yLjExMzI4MS0uNDY4NzUtMy40NzY1NjItLjQ2ODc1em0wIDAiLz48cGF0aCBkPSJtMzI1LjMzMjAzMSAxNzAuNjc1NzgxYy04LjgzMjAzMSAwLTE2LTcuMTY3OTY5LTE2LTE2di05NmMwLTE0LjY5OTIxOS0xMS45NjQ4NDMtMjYuNjY3OTY5LTI2LjY2NDA2Mi0yNi42Njc5NjloLTI0MGMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OC0xNi0xNiAwLTguODMyMDMxIDcuMTY3OTY5LTE1Ljk5OTk5OTUgMTYtMTUuOTk5OTk5NWgyNDBjMzIuMzYzMjgxIDAgNTguNjY0MDYyIDI2LjMwNDY4NzUgNTguNjY0MDYyIDU4LjY2Nzk2ODV2OTZjMCA4LjgzMjAzMS03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTI4Mi42Njc5NjkgNDQ4LjAwNzgxMmgtODUuMzM1OTM4Yy04LjgzMjAzMSAwLTE2LTcuMTY3OTY4LTE2LTE2IDAtOC44MzIwMzEgNy4xNjc5NjktMTYgMTYtMTZoODUuMzM1OTM4YzE0LjY5OTIxOSAwIDI2LjY2NDA2Mi0xMS45Njg3NSAyNi42NjQwNjItMjYuNjY3OTY4di05NmMwLTguODMyMDMyIDcuMTY3OTY5LTE2IDE2LTE2czE2IDcuMTY3OTY4IDE2IDE2djk2YzAgMzIuMzYzMjgxLTI2LjMwMDc4MSA1OC42Njc5NjgtNTguNjY0MDYyIDU4LjY2Nzk2OHptMCAwIi8+PC9zdmc+");
  background-size: 20px;
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