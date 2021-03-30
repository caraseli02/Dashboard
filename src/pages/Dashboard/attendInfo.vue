<template>
  <transition name="slide-fade" mode="out-in">
    <ul :class="`glass-${theme} w-screen h-32 flex justify-center items-center`">
      <li v-if="attend.data"
        class="mx-auto flex flex-col justify-around text-2xl items-center p-2 text-primary capitalize rounded-lg m-2">
        <span class="text-lg text-primary w-full text-center rounded">{{
          getDayName(attend.data.enterTime)
          }}</span>
        {{ attend.data.enterTime.slice(8, 10) }}
      </li>
      <li class="mx-auto flex flex-col justify-around text-lg items-center p-4 text-primary">
        Entrada
        <span class="text-2xl text-green-800 dark:text-green-500">
          &#8595;{{ attend.data.enterTime.slice(11, 16) }}</span>
      </li>
      <li v-if="attend.data.leaveTime"
        class="mx-auto flex flex-col justify-around text-lg items-center p-4 text-primary">
        Salida
        <span class="text-2xl text-red-800 dark:text-red-500">
          &#8593;{{ attend.data.leaveTime.slice(11, 16) }}</span>
      </li>
      <li class="flex flex-col justify-center text-red-900 font-bold items-center h-full" v-if="'curentTime' in attend">
        <span v-if="actualMonthCheck && !attend.data.leaveTime && attendIsToday"
          class="block text-primary font-bold my-3 mx-auto py-2 px-4 bg-secondary dark:bg-black rounded-lg">
          -- / --
        </span>
        <div v-if="!attend.msgLeave && !attend.data.leaveTime && !attendIsToday" class="text-secondary text-center">
          <button class="block text-primary font-bold w-20 mx-auto p-3 bg-secondary rounded-lg text-center"
            placeholder="Avisar" @click="addMsg()">
            Dejar Nota
          </button>
        </div>
      </li>
      <li v-if="attend.msgLeave" class="flex flex-col justify-center text-red-900 font-bold items-center h-full"
        @click="showMsg(attend.msgLeave)">
        <icon-base class="mx-4 self-center bg-green-200 rounded-lg pl-1">
          <icon-contact />
        </icon-base>
      </li>
      <li v-if="attend.data.temperature"
        class="flex flex-col ml-2 justify-center items-center text-accent rounded-full my-4 mr-2 w-20 dark:text-secondary">
        {{ attend.data.temperature
        }}<icon-base>
          <icon-temp />
        </icon-base>
      </li>
    </ul>
  </transition>
</template>
<script>
  import IconBase from "@/components/IconBase.vue";
  import IconTemp from "@/components/icons/IconTemp.vue";
  import IconContact from "@/components/icons/IconContact.vue";
  import utils from "@/mixins/utils";
  export default {
    name: "attendInfo",
    mixins: [utils],
    props: {
      attend: {
        type: Object,
        required: true,
      },
      theme: {
        type: String,
        required: true,
      },
      actualMonthCheck: {
        type: Boolean,
        required: true,
      },
    },
    components: {
      IconBase,
      IconContact,
      IconTemp,
    },
    computed: {
      attendIsToday: {
        get() {
          return this.attend.curentTime;
        },
        set() {
          return (
            new Date(this.attend.curentTime).toISOString().slice(0, 10) ===
            this.today.slice(0, 10)
          );
        },
      },
    },
    methods: {
      addMsg() {
        this.$prompt("Mensaje").then(text => {
          let attend = this.attendList[0];
          attend["msgLeave"] = text;
          attend["activeSession"] = false;
          this.changeAttendance(attend);
        });
      },
      showMsg(msg) {
        this.$alert(msg);
      },
      getDayName(dateString) {
        var d = new Date(dateString);
        var dayName = this.days[d.getDay()];
        return dayName;
      },
    },
  };
</script>
<style lang=""></style>