<template>
  <ul
    v-if="workedTime && actualMonthCheck"
    :class="
      `glass-${theme} w-screen mx-auto h-24 
              flex justify-center items-center`
    "
  >
    <li
      class="mx-auto flex justify-around text-lg items-center p-4 text-secondary w-64"
    >
      <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
      <icon-base
        class="w-12 h-12 animate-pulse font-bold dark:text-gray-300 text-gray-700"
        name="iconTime"
      >
        <icon-time />
      </icon-base>
      <div
        v-if="!checkCalendarToday && showCurrentSession"
        class="flex flex-col justify-around w-40 ml-2"
      >
        <h3 class="text-xl font-bold">Sesión en curso</h3>
      </div>
      <div v-else class="flex flex-col justify-around">
        Tiempo aproximado:
        <span class="text-3xl text-center text-green-800 dark:text-green-500">
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
import iconBase from "@/components/IconBase";
import iconTime from "@/components/icons/IconTime";
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
    showCurrentSession: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    iconBase,
    iconTime,
  },
};
</script>
<style lang=""></style>
