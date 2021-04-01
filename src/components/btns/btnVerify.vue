<template>
  <div class="flex flex-col justify-center items-center">
    <span class="text-secondary text-bold m-1 mb-3 w-full flex justify-center"
      >Desliza a la derecha para apuntar</span
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
      type: String,
      default: "36.6",
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
        color: "0000ff",
        background: "#ffffff60",
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
      await this.$fire({
        title: `<ul>
                    <li style="font-size:20px">¿Quedará registrada al fichar la hora y ubicación?</li>
                    <li style="font-size:16px">📍 ${this.gpsData.Label}</li>
                </ul>`,
        footer:
          "Si no es correcto pulse aquí <strong style='color: red; border-bottom: 2px solid red; margin-left: 10px' onclick='window.location.reload()'>  Recargar⟲ </strong",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        this.$emit("toggleLoading", true);
        if (result.value) {
          try {
            if (this.enterFunc) {
              this.setAttendance({
                email: localStorage.getItem("email"),
                uid: localStorage.getItem("uid"),
                gpsLoc: this.$store.state.geolocation,
                gpsData: this.gpsData,
                dttm: new Date(),
                enterTime: this.getRoundedDate(1),
                temperature: this.temperature,
              });
            }
            if (this.leaveFunc) {
              if (
                this.deepEqual(
                  this.value.data.gpsLoc,
                  this.$store.state.geolocation
                )
              ) {
                this.value["data"][
                  "gpsLocLeave"
                ] = this.$store.state.geolocation;
              }
              this.changeAttendance(this.value).then(
                this.$emit("togglePunchOut", false)
              );
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$router.go(this.$router.path);
        }
      });
    },
  },
};
</script>
<style lang="">
/* i {
    color:#0000ff
  } */
</style>