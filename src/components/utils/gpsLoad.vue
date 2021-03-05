<template>
  <section class="fixed top-0 z-50 w-screen h-screen glass-dark rounded-none">
    <h1
      class="text-3xl mx-auto font-bold flex justify-center text-blue-800 animate-pulse w-full mt-10"
    >
      APIMOSA APP
    </h1>
    <paitLoader>
      <h1 class="text-3xl text-primary mt-6">Preparando...</h1>
    </paitLoader>
  </section>
</template>

<script>
import paitLoader from "@/components/utils/paitLoader.vue";
export default {
  name: "gpsLoad",
  components: {
    paitLoader,
  },
};
</script>

<style scoped></style>
