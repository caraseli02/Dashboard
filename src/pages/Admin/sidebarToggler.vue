<template>
  <div
    :class="`glass-${theme} lg:hidden rounded-xl flex justify-around w-32 mx-auto shadow-lg border-none`"
  >
    <svg
      width="42px"
      height="42px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="rounded-lg w-16 p-2 text-primary"
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
      class="rounded-lg w-16 p-2 text-primary"
      :class="showSidebar ? 'bg-blue-800' : ''"
    >
      <path
        fill-rule="evenodd"
        d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zm14 2L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "sidebarToggler",
  props: {
    showSidebar: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "Light",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>