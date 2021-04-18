<template>
  <div class="rounded-xl flex justify-center w-full mx-auto border-none mt-4">
    <div
      @click="(selectedDay = day), $emit('sendDay', day)"
      v-for="(day, index) in workedDaysList"
      :key="index"
      :class="`w-12 h-16 rounded-full flex flex-col justify-center items-center ml-2 text-primary border-none  font-semibold text-xl glass-${theme}`"
    >
      <span
        class="rounded-full py-1 px-2"
        :class="
          selectedDay === day
            ? 'bg-blue-800 w-full h-full flex justify-center items-center text-3xl p-0'
            : ''
        "
        >{{ day.getDate() }}</span
      >
      <span
        v-if="selectedDay !== day"
        class="text-secondary text-sm pb-1 rounded-full"
        >{{ getDayName(day).slice(0, 3) }}</span
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import utils from "@/mixins/utils";
export default {
  data() {
    return {
      selectedDay: this.workedDaysList[0],
    };
  },
  name: "attendDaySelector",
  mixins: [utils],
  props: {
    workedDaysList: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
  },
};
</script>
<style lang="">
</style>