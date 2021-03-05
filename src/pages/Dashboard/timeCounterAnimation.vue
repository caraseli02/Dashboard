<template>
  <section
    @click="$emit('closeTimer', false)"
    :class="
      `glass-${theme} z-30 h-screen w-screen fixed top-0 flex justify-center items-start`
    "
  >
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
