<template>
  <div class="flex h-full">
    <div class="fixed lg:static bottom-0 w-full lg:w-24 lg:h-full z-10">
      <div class="w-full lg:fixed lg:w-24 h-full bg-blue-800 relative">
        <a
          href="#"
          class="hidden absolute top-10 left-1/2 transform -translate-x-1/2 lg:flex lg:justify-center lg:items-center w-14 h-14 rounded-xl hover:bg-white hover:bg-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-8 w-8 text-white"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
        </a>

        <MainNav />
      </div>
    </div>

    <div class="w-full px-4 lg:p-10">
      <!-- <Tools /> -->
      <!-- Sidebar Toggler -->
      <div
        @click="showSidebar = !showSidebar"
        :class="`glass-${theme} rounded-xl lg:hidden flex justify-around w-32 mx-auto shadow-lg border-none`"
      >
        <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
        <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
        <svg
          width="42px"
          height="42px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          color="#FFFFFF"
          class="rounded-lg w-16 p-2"
          :class="!showSidebar ? 'bg-blue-800' : ''"
        >
          <path
            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
          ></path>
        </svg>
        <svg
          width="42px"
          height="42px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          color="#FFFFFF"
          class="rounded-lg w-16 p-2"
          :class="showSidebar ? 'bg-blue-800' : ''"
        >
          <path
            fill-rule="evenodd"
            d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zm14 2L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>

      <div class="overflow-hidden lg:overflow-visible pb-24 lg:pb-0">
        <div
          class="transform lg:transform-none transition-all duration-300"
          :class="showSidebar ? '-translate-x-full' : ''"
        >
          <div class="flex mt-4 lg:mt-10 lg:space-x-10">
            <div
              class="w-full flex-shrink-0 lg:w-3/4 lg:flex-shrink rounded-xl"
            >
              <div class="flex space-x-4 lg:space-x-10">
                <infoCard :theme="theme">
                  <template v-slot:svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="text-secondary w-8 h-8 mx-auto"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Operarios</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >22</span
                    ></template
                  >
                </infoCard>
                <infoCard :theme="theme">
                  <template v-slot:svg>
                    <svg
                      width="32px"
                      height="32px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-green-500 mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Entradas</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >22</span
                    ></template
                  >
                </infoCard>
                <infoCard :theme="theme">
                  <template v-slot:svg>
                    <svg
                      width="32px"
                      height="32px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-red-500 mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </template>
                  <template v-slot:name
                    ><span
                      class="block uppercase text-sm tracking-wider text-secondary"
                      >Salidas</span
                    ></template
                  >
                  <template v-slot:number
                    ><span
                      class="text-2xl lg:text-2xl font-semibold text-primary"
                      >22</span
                    ></template
                  >
                </infoCard>
              </div>
              <section :class="`glass-${theme} mt-4 rounded-xl p-2`">
                <div class="text-primary" id="chart">
                  <apexchart
                    type="rangeBar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                    class="text-primary"
                  ></apexchart>
                </div>
              </section>
              <Blog />
            </div>
            <div
              class="w-full flex-shrink-0 lg:w-1/4 lg:flex-shrink bg-gray-300 rounded-xl h-52"
            >
              sidebar
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from "vuex";
// Page components
import infoCard from "@/pages/Admin/infoCard.vue";
import MainNav from "@/pages/Admin/MainNav.vue";
// import Tools from "@/pages/Admin/Tools.vue";
import Blog from "@/pages/Admin/Blog.vue";
// Load Charts library
import VueApexCharts from "vue-apexcharts";

var es = require("apexcharts/dist/locales/es.json");
export default {
  name: "Admin",
  components: {
    MainNav,
    // Tools,
    Blog,
    infoCard,
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      showSidebar: false,
      series: [
        {
          data: [
            {
              x: "Team A",
              y: [7, 15],
            },
            {
              x: "Team B",
              y: [7, 18],
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          legend: {
            fontSize: "32px",
          },
          foreColor: "#777",
          locales: [es],
          defaultLocale: "es",
          toolbar: {
            show: false,
          },
          height: 200,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          tickPlacement: "between",
          labels: {
            style: {
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            },
          },
        },
        yaxis: [
          {
            axisBorder: {
              show: true,
              color: "#EBEEF2",
              offsetX: 0,
            },

            labels: {
              show: true,
              align: "center",
              minWidth: 0,
              maxWidth: 160,
              style: {
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                color: "#8b9bae",
              },
            },
          },
        ],
        fill: {
          colors: ["#FF6A00", "#EEEEEE", "#9C27B0"],
          pattern: {
            style: "verticalLines",
            width: 6,
            height: 6,
            strokeWidth: 2,
          },
        },
        markers: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
          onClick: function (e) {
            // do something on marker click
            console.log(e);
          },
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0.15,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "darken",
              value: 0.35,
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="">
</style>