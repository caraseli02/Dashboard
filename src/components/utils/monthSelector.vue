<template>
  <!-- Month selector  -->
  <section :class="`w-full glass-${theme} h-12 px-2 flex justify-between`">
    <button v-if="selectedMes > 0" @click="prevMonth()">
      <icon-base class="text-accent">
        <icon-arrow-left />
      </icon-base>
    </button>
    <button
      class="text-lg bg-secondary text-primary rounded-lg m-1 w-24"
      v-if="selectedMes > 0"
      @click="selectedMes = selectedMes - 1"
    >
      {{ meses[selectedMes - 1].slice(0, 3) }}
    </button>
    <button class="text-lg text-primary rounded-lg m-1 w-24">
      {{ meses[selectedMes] }}
    </button>
    <button
      class="text-lg bg-secondary text-primary rounded-lg m-1 w-24"
      v-if="selectedMes < 11"
      @click="selectedMes = selectedMes + 1"
    >
      {{ meses[selectedMes + 1].slice(0, 3) }}
    </button>
    <button v-if="selectedMes < 11" @click="nextMonth()">
      <icon-base class="text-accent">
        <icon-arrow-right />
      </icon-base>
    </button>
  </section>
</template>

<script>
// import Alerts from "@/components/utils/Alerts.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import IconBase from "@/components/IconBase.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";

export default {
  name: "monthSelector",
  components: {
    IconBase,
    IconArrowLeft,
    IconArrowRight,
    // Alerts,
  },
  data() {
    return {
      selectedMes: null,
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      today: null,
    };
  },
  props: {
    pasedUser: {
      type: String,
      default: null,
    },
    getAsistFunc: {
      type: Boolean,
      default: false,
    },
    bindAsistFunc: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      attendList: state => state.attendance,
      d: state => state.d,
      users: state => state.users,
      selectedTime: state => state.selectedTime,
    }),
    ...mapState("auth", ["user"]),
    ...mapGetters(["checkCalendarToday"]),
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    ...mapActions([
      "getAsist",
      "bindAsist",
      "selectMonth",
      "selectMonthLimites",
    ]),
    showInfoMsg(msg) {
      this.$alert(msg);
    },
    nextMonth() {
      if (this.selectedMes > 12) {
        this.selectedMes = 0;
      }
      this.selectedMes++;
    },
    prevMonth() {
      if (this.selectedMes < 0) {
        this.selectedMes = 12;
      }
      this.selectedMes--;
    },
  },
  watch: {
    selectedMes: function(newValue) {
      // GET CURRENT YEAR
      let time = new Object();
      time["year"] = new Date()
        .toISOString()
        .split("T")[0]
        .slice(0, 4);

      // Month Transform
      if (newValue < 10) {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() - 1;
      } else if (newValue === 11) {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() + 2.678e9;
      } else {
        time["start"] = new Date(
          `${time["year"]}-0${newValue + 1}-01T00:00:00.000+01:00`
        ).getTime();
        time["end"] =
          new Date(
            `${time["year"]}-0${newValue + 2}-01T00:00:00.000+01:00`
          ).getTime() - 1;
      }
      if (this.getAsistFunc) {
        const data = {
          user: this.pasedUser ? this.pasedUser : this.user.email,
          time,
          uid: this.user.uid,
        };
        this.getAsist(data);
      }
      if (time && this.bindAsistFunc) {
        this.bindAsist(time);
      }
      this.selectMonthLimites(time);
      this.selectMonth(newValue);
    },
  },
  async mounted() {
    var date = new Date(); // Or the date you'd like converted.
    this.today = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    this.selectedMes = date.getMonth();
  },
};
</script>

<style scoped>
.swipAnimation {
  animation: slidein 5s infinite;
}

@keyframes slidein {
  0% {
    opacity: 0.25;
    left: 0;
  }

  99% {
    opacity: 0.95;
    left: 80%;
  }
}
</style>
