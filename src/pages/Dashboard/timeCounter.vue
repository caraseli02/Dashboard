<template>
  <span class="text-3xl flex justify-center items-center mt-6">{{
    timer
  }}</span>
</template>

<script>
import { Timer } from "easytimer.js";
export default {
  name: "timeCounter",
  props: {
    seconds: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      default: "Light",
    },
  },
  data() {
    return {
      timer: "",
    };
  },
  created() {
    this.InitTimer();
  },
  methods: {
    InitTimer() {
      var aTimer = new Timer();
      aTimer.start({
        precision: "seconds",
        startValues: { seconds: this.seconds },
      });
      const _this = this;
      aTimer.addEventListener("secondsUpdated", function() {
        _this.timer = aTimer.getTimeValues().toString();
      });
    },
  },
};
</script>
