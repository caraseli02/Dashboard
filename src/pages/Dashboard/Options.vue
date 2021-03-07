<template>
  <ul class="w-screen flex justify-around items-center mb-4 flex-wrap text-primary">
    <!-- <li class="glass-light h-40 w-2/5 text-center p-2 text-lg">
          <div class="flex justify-center items-center w-full p-2 text-red-600 mb-2"> <i class="gg-alarm"></i></div>
          ¿Llegaste Tarde?
          <button class="bg-gray-200 shadow-lg rounded-lg w-full mt-3 p-3 text-base">
            Escríbeme
          </button>
        </li>
        <li class="glass-light h-40 w-2/5 text-center p-2 text-lg">
          <div class="flex justify-center items-center w-full p-2 text-blue-600 mb-2"> <i class="gg-calendar-today"></i></div>
          Apuntar pausa
          <button class="bg-gray-200 shadow-lg rounded-lg w-full mt-3 p-3 text-base">
            Apuntar
          </button>
        </li>
        <li class="glass-light h-40 w-2/5 text-center p-2 text-lg mt-4">
          <div class="flex justify-center items-center w-full p-2 text-blue-600 mb-2"> <i class="gg-calendar-today"></i></div>
          ¿Tienes una cita?
          <button class="bg-gray-200 shadow-lg rounded-lg w-full mt-3 p-3 text-base">
            Avisar
          </button>
        </li>
        <li class="glass-light h-40 w-2/5 text-center p-2 text-lg mt-4">
          <div class="flex justify-center items-center w-full p-2 text-blue-600 mb-2"> <i class="gg-calendar-today"></i></div>
          ¿Otros motivos?
          <button class="bg-gray-200 shadow-lg rounded-lg w-full mt-3 p-3 text-base">
            Seleccionar
          </button>
        </li> -->
    <li
      v-for="option in options"
      :key="option.icon"
      :class="`glass-${theme} h-40 w-2/5 text-center p-2 text-base mt-4`"
    >
      <div class="flex justify-center items-center w-full p-2 mb-2">
        <i :class="option.icon"></i>
      </div>
      {{ option.text }}
      <button
        v-if="option.funcMsg"
        @click="setMsg(attendList[0])"
        class="bg-primary text-primary shadow-lg rounded-lg w-full mt-3 p-3 text-lg"
      >
        {{ option.btnText }}
      </button>
      <button
        v-else
        class="bg-primary text-primary shadow-lg rounded-lg w-full mt-3 p-3 text-lg"
      >
        {{ option.btnText }}
      </button>
    </li>
  </ul>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  watch: {},
  props: {
    theme: {
      type: String,
      default: "Light",
    },
  },
  name: "Options",
  data() {
    return {
      options: [
        {
          text: "¿Dejar una Nota?",
          icon: "gg-danger",
          btnText: "Apuntar",
          funcMsg: true,
        },
        // {
        //   text: "¿Horario partido?",
        //   icon: "gg-timer",
        //   btnText: "Apuntar",
        // },
        // {
        //   text: "¿Tienes una cita?",
        //   icon: "gg-calendar-today",
        //   btnText: "Avisar",
        // },
        // {
        //   text: "¿Otros motivos?",
        //   icon: "gg-danger",
        //   btnText: "Seleccionar",
        // },
      ],
    };
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: (state) => state.attendance,
      checkDay: (state) => state.checkDay,
    }),
    ...mapGetters(["checkCalendarToday"]),
  },
  methods: {
    ...mapActions(["changeAttendance"]),
    setMsg(attend) {
      this.$prompt("Escríbeme un mensaje").then((text) => {
        attend["data"]["msg"] = text;
        this.changeAttendance(attend);
      });
    },
  },
};
</script>
