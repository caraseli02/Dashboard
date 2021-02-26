<template>
  <div class="relative inline-block text-left text-gray-800">
    <div>
      <span class="rounded-md shadow-sm">
        <button
          @click="isMenuOpen = !isMenuOpen"
          type="button"
          class="inline-flex items-center justify-between w-full rounded-md border border-gray-300 h-10 px-4 py-4 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus ml-2"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span class="text-primary"> Legal </span>
          <img
            src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
            class="-mr-1 ml-2 h-5 w-5"
          />
        </button>
      </span>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="isMenuOpen"
        class="absolute right-0 w-56 rounded-md shadow-lg text-sm overflow-hidden border z-20"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <legalLinks />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import legalLinks from "@/pages/Legal/legalLinks";
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  components: {
    legalLinks,
  },
};
</script>
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
