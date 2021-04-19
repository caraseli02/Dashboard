<template>
  <div
    class="rounded-xl flex items-centerw-full mx-auto border-none mt-4 overflow-y-scroll"
    :class="workedDaysList.length > 5 ? 'justify-start' : 'justify-center'"
  >
    <div
      @click="$emit('sendDay', day)"
      v-for="(day, index) in workedDaysList"
      :key="index"
      :class="`w-12 h-16 rounded-full flex flex-col justify-center items-center ml-2 text-primary border-none  font-semibold text-xl glass-${theme}`"
    >
      <span
        class="rounded-full py-1 px-2 w-10 flex justify-center items-center"
        :class="
          filtredAttendsDay === day
            ? 'bg-blue-800 w-12 h-full text-3xl p-0'
            : ''
        "
        >{{ day.getDate() }}</span
      >
      <span
        v-if="filtredAttendsDay !== day"
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
    filtredAttendsDay: {
      type: Date,
      default: function () {
        return new Date(this.d.setHours(2, 0, 0, 0));
      },
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