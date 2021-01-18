<template>
  <div
    @click="clearNotification"
    v-if="showNotification"
    class="fixed top-0 mt-20 flex flex-col justify-around items-center h-64 w-full glass-dark z-20"
    :class="[`glass-${notificationType}`]"
  >
    <span class="w-1/2 h-20 mx-auto text-gray-100 text-xl text-center">
      &#9906; {{ notificationMessage }}</span
    >
    <a
      class="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
    "
      href="https://support.google.com/accounts/answer/3467281?hl=es-419"
    >
      Como administrar tu ubicación</a
    >
    <button class="my-3 mx-auto w-full">
      <span
        class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
      "
        >Cerrar</span
      >
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions("notifi", ["clearNotification"]),
  },
  computed: {
    ...mapGetters("notifi", ["notificationMessage", "notificationType"]),
    ...mapState({
      geolocation: state => state.geolocation,
    }),
    showNotification() {
      return !!this.notificationType;
    },
  },
};
</script>

<style></style>
