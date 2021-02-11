<template>
  <section class="fixed top-0 z-50 w-screen h-screen glass-dark rounded-none">
    <span
      class="flex justify-center items-center text-3xl uppercase text-bold text-gray-100 mt-16 animate-bounce"
      >preparando</span
    >
    <div class="relative flex justify-center items-center h-screen">
      <div
        class="inline-block animate-spin ease duration-300 w-5 h-5 bg-black mx-2"
      ></div>
      <div
        class="inline-block animate-ping ease duration-300 w-5 h-5 bg-black mx-2"
      ></div>
      <div
        class="inline-block animate-pulse ease duration-300 w-5 h-5 bg-black mx-2"
      ></div>
      <div
        class="inline-block animate-wiggle ease duration-300 w-5 h-5 bg-black mx-2"
      ></div>
    </div>
    <div class="shadow"></div>
  </section>
</template>

<script>
export default {
  name: "gpsLoad",
};
</script>
