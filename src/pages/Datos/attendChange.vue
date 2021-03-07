<template>
  <div :class="
      `mx-auto w-full max-w-sm z-10 transform glass-${theme} p-2 self-center my-10 absolute top-0 mt-64`
    ">
    <form class="mx-10" @submit.prevent>
      <div>
        <label for="email" class="block text-sm font-medium leading-5 text-primary">
          Entrada
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <datetime type="datetime" value-zone="local" zone="local" placeholder="Pulsa para seleccionar" v-model="enter"
            input-class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          </datetime>
        </div>
      </div>

      <div class="mt-6">
        <label for="password" class="block text-sm font-medium leading-5 text-primary">
          Salida
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <datetime type="datetime" value-zone="local" zone="local" placeholder="Pulsa para seleccionar" v-model="leave"
            input-class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          </datetime>
        </div>
      </div>
      <div class="mt-6">
        <span class="block w-full rounded-md shadow-sm">
          <button
            class="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-secondary hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            @click="dataChange(dataToChange)">
            OK
          </button>
        </span>
      </div>
    </form>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import { Datetime } from "vue-datetime";

  export default {
    data() {
      return {
        enter: null,
        leave: null,
      };
    },
    name: "attendChange",
    props: {
      dataToChange: Object,
      gpsData: Object,
    },
    computed: {
      ...mapGetters({ theme: "theme/getTheme" }),
    },
    methods: {
      ...mapActions(["changeAttendance"]),
      dataChange(value) {
        value.data.enterTime = this.enter.slice(0, 16);
        if (this.leave) {
          value.data.leaveTime = this.leave.slice(0, 16);
          value.activeSession = false;
        }
        value.data.gpsData = this.gpsData;
        this.changeAttendance(value);
        this.$emit("dataChanged");
      },
    },
    components: { datetime: Datetime },

    mounted() {
      this.enter = this.dataToChange.data.enterTime.slice(0, 16);
      if (this.dataToChange.data.leaveTime !== undefined) {
        this.leave = this.dataToChange.data.leaveTime.slice(0, 16);
      }
    },
  };
</script>
<style></style>