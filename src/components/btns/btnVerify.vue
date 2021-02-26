<template>
  <div class="flex flex-col justify-center items-center">
    <span class="text-primary m-1 w-full flex justify-center"
      >Desliza a la Derecha</span
    >
    <drag-verify
      v-on:passcallback="punchIn()"
      class="border-2 border-green-300 shadow-lg"
      :width="swiper.width"
      :height="swiper.height"
      :text="this.text"
      :success-text="swiper.successText"
      :background="swiper.background"
      :progress-bar-bg="swiper.progressBarBg"
      :completed-bg="swiper.completedBg"
      :handler-bg="swiper.handlerBg"
      :handler-icon="swiper.handlerIcon"
      :text-size="swiper.textSize"
      :color="swiper.color"
      :success-icon="swiper.successIcon"
      :circle="swiper.isCircle"
    >
    </drag-verify>
  </div>
</template>
<script>
import dragVerify from "vue-drag-verify";
import { mapActions } from "vuex";
import utils from "@/mixins/utils";
export default {
  mixins: [utils],
  props: {
    text: {
      type: String,
      default: "Desliza Para Confirmar",
      required: true,
    },
    temperature: {
      type: Number,
      default: 36.6,
      required: true,
    },
    gpsData: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
    },
    enterFunc: {
      type: Boolean,
      required: false,
    },
    leaveFunc: {
      type: Boolean,
      required: false,
    },
  },
  name: "btnVerify",
  data() {
    return {
      swiper: {
        width: 300,
        color: "#1D4ED8",
        background: "#ffffff50",
        handlerIcon: "gg-chevron-double-right",
        successIcon: "gg-check",
        progressBarBg: "#FFFF99",
        completedBg: "#66cc66",
        handlerBg: "#fff",
        successText: "success",
        height: 50,
        textSize: "20px",
        isCircle: true,
      },
    };
  },
  components: {
    dragVerify,
  },

  methods: {
    ...mapActions([
      "setAttendance",
      "changeAttendance",
      "currentLocation",
      "clearLocation",
    ]),
    async punchIn() {
      await this.clearLocation();
      await this.currentLocation();
      this.$fire({
        title: `<ul>
                  <li style="font-size:20px">¿Quedará registrada al fichar la hora y ubicación?</li>
                  <li style="font-size:16px">📍 ${this.gpsData.Label}</li>
                </ul>`,
        footer: "Recarga la pagina si no es correcto!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          /* Read more about isConfirmed, isDenied below */
          if (this.enterFunc) {
            this.setAttendance({
              email: localStorage.getItem("email"),
              uid: localStorage.getItem("uid"),
              gpsLoc: this.$store.state.geolocation,
              dttm: new Date(),
              enterTime: this.getRoundedDate(1),
              temperature: this.temperature,
            });
          }
          if (this.leaveFunc) {
            console.log(this.value);
            if (this.deepEqual(this.value.data.gpsLoc, this.$store.state.geolocation)) {
              this.value["data"]["gpsLocLeave"] = this.$store.state.geolocation;
            }
            this.value["activeSession"] = false;
            this.value["data"]["leaveTime"] = this.getRoundedDate(1);
            this.changeAttendance(this.value);
          }
        }
      });
      // this.enterModal = false;
      // this.$router.replace("calendar");
    },
  },
};
</script>
<style lang="">
</style>