<template>
  <section class="mr-8">
    <button
      class="w-40 flex items-center justify-center rounded-md bg-secondary p-2 text-primary mb-2"
      @click="tableToExcel('table', 'Lorem Table')"
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
    <div :class="`glass-${theme} h-64 overflow-scroll `">
      <table ref="table">
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
export default {
  name: "Table",
  mixins: [utils],
  data() {
    return {
      daysNumber: null,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      uri: "data:application/vnd.ms-excel;base64,",
      template:
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64: function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format: function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      },
      // thead: {
      //   "background-color": "#17e9e1",
      //   color: "#6b7280",
      //   "text-align": "center",
      // },
      // theadTH: {
      //   "background-color": "#17e9e1",
      //   color: "#6b7280",
      //   "text-align": "center",
      // },
      //       .dark {
      //   --color-bg-primary: #17224d;
      //   --color-bg-secondary: #021e69;
      //   --color-text-primary: #cccccc;
      //   --color-text-secondary: #9ca3af;
      //   --color-text-accent: #475886;
      // }

      // .light {
      //   --color-bg-primary: #f5fafa;
      //   --color-bg-secondary: #17e9e1;
      //   --color-text-primary: #171718;
      //   --color-text-secondary: #6b7280;
      //   --color-text-accent: #1d4ed8;
      // }
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
tr.red th {
  background: red;
  color: white;
}
tr.green th {
  background: green;
  color: white;
}
tr.purple th {
  background: purple;
  color: white;
}
th {
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
}
.fixUserName {
  position: sticky;
  left: 0; /* Don't forget this, required for the stickiness */
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