<template>
  <section @click="$emit('closeTimer', false)" :class="
      `glass-${theme} z-30 h-screen w-screen fixed top-0 flex justify-center items-start p-24`
    ">
    <button class="bg-red-600 text-primary shadow-lg rounded-lg w-full mt-3 p-3 text-lg">
      Cerrar
    </button>
    <paitLoader>
      <slot></slot>
    </paitLoader>
  </section>
</template>

<script>
  import paitLoader from "@/components/utils/paitLoader.vue";
  export default {
    name: "timeCounterAnimation",
    props: {
      theme: {
        type: String,
        default: "Light",
      },
    },
    components: { paitLoader },
  };
</script>