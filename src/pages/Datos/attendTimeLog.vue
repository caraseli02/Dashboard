<template>
  <section class="mt-8">
    <div :class="`flex items-center p-2 glass-${theme} shadow rounded-lg`">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div>
        <span :key="workedDays" class="block text-3xl text-primary font-bold">{{
          workedDays
        }}</span>
        <span class="block text-xl text-secondary">Días de trabajo</span>
      </div>
    </div>
    <div :class="`flex items-center p-2 glass-${theme} shadow rounded-lg my-4`">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
      >
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-10 w-10 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div>
        <span :key="workedTime" class="block text-3xl font-bold text-primary">{{
          workedTime
        }}</span>
        <span class="block text-xl text-secondary">Horas de servicio</span>
      </div>
    </div>
    <!-- <div :class="`flex items-center p-2 glass-${theme} shadow rounded-lg`">
          <div
            class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-yellow-100 dark:bg-gray-300 rounded-full mr-6"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C12.5523 4 13 4.44772 13 5V8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H13V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V10H8C7.44772 10 7 9.55228 7 9C7 8.44772 7.44772 8 8 8H11V5C11 4.44772 11.4477 4 12 4Z"
                fill="currentColor"
              />
              <path
                d="M3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <span
              :key="extraHors"
              class="block text-3xl font-bold text-primary"
              >{{ extraHors }}</span
            >
            <span class="block text-xl text-secondary"
              >Horas extraordinarias</span
            >
          </div>
        </div> -->
  </section>
</template>
<script>
export default {
  name: "attendTimeLog",
  props: {
    theme: {
      type: String,
      required: true,
      default: "Light",
    },
    workedDays: {
      type: Number,
      required: true,
      default: 0,
    },
    workedTime: {
      type: String,
      required: true,
      default: "0h",
    },
  },
};
</script>
<style lang=""></style>
