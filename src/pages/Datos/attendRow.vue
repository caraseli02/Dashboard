<template lang="">
  <ul :class="`w-24 grid grid-flow-row grid-rows-5 glass-${theme}`">
    <li
      v-if="attend.data"
      class="w-20 h-16 row-span-1 mx-auto flex flex-col justify-center items-center text-2xl border-none bg-gray-200 dark:bg-gray-500 rounded-lg text-primary"
      @click="deleteAttendData(attend.id)"
    >
      <span
        class="text-secondary rounded-t-lg text-base bg-primary w-full h-full text-center"
        >{{ getDayName(attend.data.enterTime).slice(0, 3) }}</span
      >
      {{ attend.data.enterTime.slice(8, 10) }}
    </li>
    <li
      class="mx-auto h-full flex justify-center items-center p-1 text-green-800 dark:text-green-500"
    >
      <span class="text-2xl mr-1"> &#8595; </span>
      <span class="text-xl">
        {{ roundTime(attend.data.enterTime.slice(11, 16), 1) }}</span
      >
    </li>
    <li
      class="mx-auto h-full flex justify-center items-center p-1 border-t-2 border-gray-600 text-red-700 dark:text-red-500"
    >
      <span v-if="attend.data.leaveTime" class="text-xl">
        {{ roundTime(attend.data.leaveTime.slice(11, 16), 1) }}</span
      >
      <button v-else class="text-xl">--:--</button>
      <span class="text-2xl">&#8593;</span>
    </li>
    <li
      class="mx-auto h-18 w-full flex justify-around items-center p-1 border-gray-600"
    >
      <div class=" flex flex-col justify-center items-center">
        <i class="gg-time mb-2 text-green-800 dark:text-green-500"></i>
        <span class="text-gray-700 dark:text-gray-300 mr-1 text-center">{{
          workedTime
        }}</span>
      </div>
      <!-- <div class=" flex flex-col justify-center items-center" v-if="extraHors">
        <i class="gg-insert-after text-red-800 dark:text-red-500 mb-2 "></i>
        <span class="text-pink-700 dark:text-pink-300 text-center">{{
          extraHors
        }}</span>
      </div> -->
    </li>

    <li class="flex justify-center items-center text-secondary">
      <icon-base>
        <icon-temp />
      </icon-base>
      {{ attend.data.temperature }}
    </li>
    <!-- Attendence Messages -->
    <li
      @click="sendMarkers()"
      v-if="users.length > 1"
      class="h-10 flex flex-col justify-center items-center text-purple-400 my-2"
    >
      <i class="gg-track"></i>
      <span>GPS INFO</span>
    </li>
    <li
      @click="showInfoMsg(attend.data.msg)"
      class="h-10 flex justify-center items-center text-purple-800 my-2"
    >
      <icon-base
        v-if="attend.data.msg"
        class="mx-4 self-center shadow-lg text-green-700 dark:text-green-400 rounded-lg w-full p-1 h-8"
      >
        <icon-contact />
      </icon-base>
      <span class="text-xs mx-4 text-center text-secondary" v-else
        >No tiene Mensajes</span
      >
    </li>

    <li v-if="users.length > 1" class="w-full">
      <button
        class="bg-blue-500 hover:bg-blue-400 text-sm text-white py-2 px-4 w-full rounded-b-lg"
        v-on:click="$emit('passRowToChange', { attend, gpsData: gpsData[0] })"
      >
        Cambiar<br />
      </button>
    </li>
  </ul>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import IconBase from "@/components/IconBase.vue";
import IconContact from "@/components/icons/IconContact.vue";
import IconTemp from "@/components/icons/IconTemp.vue";
import utils from "@/mixins/utils";
import hereMap from "@/mixins/hereMap";

export default {
  name: "attendRow",
  mixins: [utils, hereMap],
  data() {
    return {
      coords: this.attend.data.gpsLocLeave
        ? [this.attend.data.gpsLoc, this.attend.data.gpsLocLeave]
        : [this.attend.data.gpsLoc],
    };
  },
  props: {
    attend: Object,
    users: Array,
  },
  components: {
    IconBase,
    IconTemp,
    IconContact,
    // Alerts,
  },
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    ...mapActions(["deleteAsist"]),
    sendMarkers() {
      this.$emit("markersToDisplay", this.coords);
    },
    deleteAttendData(val) {
      this.$confirm("Borar assistencia?").then(() => {
        this.deleteAsist(val);
      });
    },
    showInfoMsg(msg) {
      this.$alert(msg);
    },
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
  },
  async mounted() {
    const platform = await new window.H.service.Platform({
      apikey: process.env.VUE_APP_HERE_MAP_API_KEY,
    });
    this.platform = platform;
    const geocoder = platform.getGeocodingService();

    this.getInfoFromGps(geocoder, this.coords);
    if (this.attend.data.leaveTime) {
      const userData = this.users.find(
        ({ email }) => email === this.attend.data.email
      );
      this.extraHors = 0;
      this.workedTime = 0;
      var minutes = 0;

      let enter = new Date(String(this.attend.data.enterTime).slice(0, 16));
      let leave = new Date(String(this.attend.data.leaveTime).slice(0, 16));
      let workedMin = (leave.getTime() - enter.getTime()) / 60000;

      const isWeekends = enter.getDay() === 0 || enter.getDay() === 6;

      const isCurentMonth = enter.getMonth() === new Date().getMonth();

      if (
        userData !== undefined &&
        "eatHour" in userData &&
        userData.eatHour == true &&
        workedMin > 540
      ) {
        workedMin -= 60;
      }
      const minDiff = this.diff_minutes(enter, leave);
      if (
        userData !== undefined &&
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

      this.extraHors = this.timeConvert(this.extraHors + 1);
      this.workedTime = this.timeConvert(this.workedTime + 1);
    }
  },
};
</script>
<style lang="" scoped></style>
