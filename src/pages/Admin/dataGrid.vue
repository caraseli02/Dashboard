<template>
  <section class="sm:mr-8 sm:ml-10 pb-10">
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
    <div :class="`glass-${theme} h-full overflow-scroll p-2`">
      <table
        :style="tableStyle"
        class="w-full text-sm sm:text-base"
        id="table"
        ref="table"
      >
        <thead
          :style="tHeadStyle"
          class="bg-secondary text-secondary text-center"
        >
          <tr class="">
            <td style="min-width: 50px">Dia:</td>
            <td
              style="min-width: 50px"
              class=""
              v-for="(day, index) in daysNumber"
              :key="`0${index}`"
            >
              {{ getDayName(day).slice(0, 3) }}
            </td>
          </tr>
          <tr class="">
            <th
              style="min-width: 50px; z-index: 10"
              class="bg-secondary text-secondary z-10"
            >
              Fecha:
            </th>
            <th
              style="min-width: 50px; z-index: 10"
              class="border-2 border-yellow-600 bg-secondary text-secondary"
              v-for="(day, index) in daysNumber"
              :key="index"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody
          :style="tBodyStyle"
          class="bg-primary text-primary text-center z-0"
        >
          <tr v-for="user in users" :key="user.author" class="">
            <td
              class="fixUserName bg-primary text-primary border-b-2 border-yellow-600 capitalize"
              style="min-width: 120px"
            >
              {{ nameTransform(user.name) }} {{ speakerInitials(user.surname) }}
            </td>
            <td
              class="border-2 border-yellow-600"
              v-for="(day, index) in daysNumber"
              :key="index + selectedMonth"
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
import { saveAs } from "file-saver";
import XLSX from "xlsx";
//Excel
export default {
  name: "Table",
  mixins: [utils],
  data() {
    return {
      daysNumber: null,
      year: new Date().getFullYear(),
      tableStyle: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        textAlign: "center",
      },
      tHeadStyle: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        textAlign: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      },
      tBodyStyle: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        textAlign: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      },
    };
  },
  props: {
    users: {
      type: Array,
    },
    attends: {
      type: Array,
    },
    workplace: {
      type: String,
      default: "data",
    },
    selectedMonth: {
      type: Number,
    },
  },
  components: {},
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    nameTransform(string) {
      const name = string.split(" ");
      if (name[1] && name[0].length < name[1].length) {
        return name[1].toLowerCase();
      } else {
        return name[0].toLowerCase();
      }
    },
    speakerInitials(speaker) {
      const name = speaker.split(" ");
      return `${name[0].charAt(0)}${
        name[1] ? name[1].charAt(0).toUpperCase() : ""
      }`;
    },
    getDayName(dateString) {
      var d = new Date(`${this.year}-${this.selectedMonth + 1}-${dateString}`);
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
      const dayTime = new Date(
        new Date(this.year, this.selectedMonth, date).setHours(2, 0, 0, 0)
      ).getTime();
      let attend = this.attends.filter(
        ({ author, curentTime }) => author === uid && curentTime === dayTime
      );
      let userData = this.users.find(({ author }) => author === uid);
      attend = attend[0];
      if (typeof attend !== "undefined") {
        return this.getEnterLeaveTotal(
          attend.data.enterTime,
          attend.data.leaveTime,
          userData.eatHour
        );
      }
      return attend;
    },
    exportExcel() {
      let vb = XLSX.utils.table_to_book(document.getElementById("table"), {
        raw: true,
      });
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
          `${this.workplace}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, vbout);
      }
      return vbout;
    },
  },
  async mounted() {
    this.daysNumber = new Date(this.year, this.selectedMonth, 0).getDate();
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
  width: 10%;
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