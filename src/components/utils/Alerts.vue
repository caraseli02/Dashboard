<template>
  <transition name="fade">
    <div @click="clearNotification" v-if="showNotification"
      class="top-0 mt-20 flex flex-col justify-around items-center h-64 w-full bg-gray-700 setSuperZindex"
      :class="[`glass-${notificationType}`]">
      <span class="w-2/3 h-20 mx-auto text-gray-100 text-lg text-center">
        {{ notificationMessage }}</span>
      <!-- <a
      class="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
    "
      href="https://support.google.com/accounts/answer/3467281?hl=es-419"
    >
      Como administrar tu ubicación</a
    > -->
      <button class="my-3 mx-auto w-full">
        <span v-if="notificationType === 'error' "
          class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
          @click="pageReload">Recargar</span>
        <span v-else
          class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded">Cerrar</span>

      </button>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions, mapState } from "vuex";
  export default {
    name: "Alert",
    // watch: {
    //   notificationMessage(newValue, oldValue) {
    //     console.log(`Updating from ${oldValue} to ${newValue}`);
    //   },
    // },
    methods: {
      ...mapActions("notifi", ["clearNotification"]),
      pageReload() {
        this.$router.go(this.$router.path)
      }
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

<style scoped>
  .setSuperZindex {
    z-index: 99999;
    position: absolute
  }
</style>