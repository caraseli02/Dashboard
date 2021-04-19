<template lang="">
  <div
    :class="
      `glass-${theme} w-1/3 lg:w-1/5 shadow-lg rounded-xl flex flex-col lg:flex-row items-center px-3 py-5 lg:p-5 space-x-0 lg:space-x-5`
    "
  >
    <div class="p-2 rounded-lg text-blue-800 w-full lg:w-auto">
      <slot name="svg"></slot>
    </div>
    <div class="flex justify-center items-center flex-col">
      <slot name="name"></slot>
      <slot name="number"></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "infoCard",
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
};
</script>
<style lang=""></style>
