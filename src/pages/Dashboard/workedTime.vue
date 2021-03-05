<template>
  <ul
    v-if="workedTime && actualMonthCheck"
    :class="
      `glass-${theme} w-screen mx-auto h-24 
              flex justify-center items-center`
    "
  >
    <li
      class="mx-auto flex justify-around text-lg items-center p-4 text-secondary w-56"
    >
      <i class="gg-time mb-2 text-green-800 dark:text-green-500"></i>
      <div class="flex flex-col justify-around">
        Has trabajado
        <slot v-if="!checkCalendarToday && showCounter"></slot>
        <span v-else class="text-2xl text-green-800 dark:text-green-500">
          {{ workedTime }}</span
        >
      </div>
    </li>
    <!-- <li
      class="w-full text-secondary mx-auto flex justify-around text-lg items-center p-4"
      v-if="extraHors"
    >
      <i class="gg-insert-after text-red-800 dark:text-red-500 mb-2 "></i>
      <div class="flex flex-col justify-around">
        Horas Extra
        <span class="text-2xl text-red-800 dark:text-red-500"
          >{{ extraHors }}
        </span>
      </div>
    </li> -->
  </ul>
</template>
<script>
export default {
  name: "workedTime",
  props: {
    workedTime: {
      type: String,
      default: "0h",
    },
    actualMonthCheck: {
      type: Boolean,
      required: true,
    },
    checkCalendarToday: {
      type: [Boolean, Number],
      required: true,
    },
    theme: {
      type: String,
      default: "Light",
    },
    showCounter: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
