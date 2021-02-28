<template>
  <ul
    v-if="checkCalendarToday === true || checkCalendarToday === selectedMes"
    :class="`glass-${theme} w-screen h-56 flex flex-col justify-center items-center my-4 rounded-none`"
  >
    <li
      class="rounded-lg col-span-2 text-primary w-full mx-auto flex justify-around items-center text-lg mt-2"
    >
      {{ getDayName(today) }} {{ today.slice(0, 10) }}
      <span class="text-xl text-primary font-bold">Hoy</span>
    </li>
    <li class="flex justify-center items-center mb-2">
      <label class="text-xl mb-2 text-primary" for="vol">Temperatura :</label>
      <select
        :value="value"
        id="vol"
        name="vol"
        required
        class="appearance-none block w-20 ml-2 my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus"
        @change="select"
      >
        <option v-for="temp in tempList" :value="temp" :key="temp">
          {{ temp }}
        </option>
      </select>
    </li>
    <li
      class="mx-auto relative text-lg flex flex-col justify-center items-center p-2"
    >
      <slot> </slot>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      tempList: [],
    };
  },
  props: {
    value: {
      type: String,
      default: "36.6",
    },
    checkCalendarToday: {
      type: [Number, Boolean],
      required: true,
    },
    selectedMes: {
      type: Number,
      required: true,
      default: 0,
    },
    theme: {
      type: String,
      required: true,
    },
    today: {
      type: String,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDayName(dateString) {
      var d = new Date(dateString);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
    select(evt) {
      this.$emit("input", evt.target.value);
    },
  },
  mounted() {
    for (var temp = 365; temp <= 375; temp++) {
      this.tempList.push(temp / 10);
    }
  },
};
</script>
<style lang="">
</style>