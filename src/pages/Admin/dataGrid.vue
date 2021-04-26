<template>
  <section class="sm:mr-8 sm:ml-10">
    <button
      id="btnExportar"
      @click="exportExcel()"
      class="w-40 flex items-center justify-center rounded-md bg-secondary p-2 text-primary mb-2"
    >
      Descargar
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        class="ml-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
    </button>
    <div :class="`glass-${theme} h-64 sm:h-full overflow-scroll `">
      <table class="w-full" id="table" ref="table">
        <thead class="bg-secondary text-secondary text-center">
          <tr class="">
            <td class="">Dia:</td>
            <td class="" v-for="(day, index) in daysNumber" :key="`0${index}`">
              {{ getDayName(day).slice(0, 3) }}
            </td>
          </tr>
          <tr class="">
            <th class="bg-secondary text-secondary">Fecha:</th>
            <th
              class="border-2 border-yellow-600 bg-secondary text-secondary"
              v-for="(day, index) in daysNumber"
              :key="index"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-primary text-primary text-center">
          <tr v-for="user in users" :key="user.author" class="">
            <td
              class="fixUserName bg-primary text-primary border-b-2 border-yellow-600"
            >
              {{ user.name }}
            </td>
            <td
              class="border-2 border-yellow-600"
              v-for="(day, index) in daysNumber"
              :key="index"
            >
              {{ getUsersWorkedHours(day, user.author) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "@/mixins/utils";
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
//Excel
export default {
  name: "Table",
  mixins: [utils],
  data() {
    return {
      daysNumber: null,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  },
  props: {
    users: {
      type: Array,
    },
    attends: {
      type: Array,
    },
  },
  components: {},
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    getDayName(dateString) {
      var d = new Date(`${this.year}-${this.month + 1}-${dateString}`);
      var dayName = this.days[d.getDay()];
      return dayName;
    },
    tableToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table;
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      window.location.href =
        this.uri + this.base64(this.format(this.template, ctx));
    },
    getUsersWorkedHours(date, uid) {
      const dayTame = new Date(
        new Date(this.year, this.month, date).setHours(2, 0, 0, 0)
      ).getTime();
      let attend = this.attends.filter(
        ({ author, curentTime }) => author === uid && curentTime === dayTame
      );
      attend = attend[0];
      if (typeof attend !== "undefined") {
        return this.getEnterLeaveTotal(
          attend.data.enterTime,
          attend.data.leaveTime
        );
      }
      return attend;
    },
    exportExcel() {
      let vb = XLSX.utils.table_to_book(document.getElementById("table"));
      console.log(vb);
      let vbout = XLSX.write(vb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        saveAs(
          new Blob([vbout], {
            type: "application/octet-stream",
          }),
          "data.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, vbout);
      }
      return vbout;
    },
  },
  async mounted() {
    this.daysNumber = new Date(this.year, this.month, 0).getDate();
  },
};
</script>

<style>
table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
}

th,
td {
  padding: 0.25rem;
}

th {
  position: sticky;
  top: 0;
  /* Don't forget this, required for the stickiness */
}

.fixUserName {
  position: sticky;
  left: 0;
  /* Don't forget this, required for the stickiness */
}

tbody:hover td {
  color: transparent;
  text-shadow: 0 0 3px #aaa;
}

tbody:hover tr:hover td {
  color: rgb(254, 131, 0);
  text-shadow: 0 1px 0 rgb(254, 131, 0);
}

</style>