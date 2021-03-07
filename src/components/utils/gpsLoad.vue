<template>
  <section class="fixed top-0 z-50 w-screen h-screen glass-dark rounded-none">
    <h1 class="text-3xl mx-auto font-bold flex justify-center text-blue-800 animate-pulse w-full mt-10">
      APIMOSA APP
    </h1>
    <gpsAnimation>
      <h1 class="text-3xl text-primary mt-6">Preparando...</h1>
    </gpsAnimation>
  </section>
</template>

<script>
  import gpsAnimation from "@/components/utils/gpsAnimation.vue";
  export default {
    name: "gpsLoad",
    components: {
      gpsAnimation,
    },
  };
</script>

<style scoped></style>