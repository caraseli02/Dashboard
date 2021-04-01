<template>
  <GmapMap
    :center="markers ? markers[0] : center"
    :zoom="16"
    map-type-id="terrain"
    style="width: 100%; height: 220px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m"
    />
  </GmapMap>
</template>
<script>
export default {
  props: {
    center: {
      type: Object,
      required: false,
      default: function () {
        return { lat: 10, lng: 10 };
      },
    },
    markers: {
      type: Array,
      required: false,
    },
  },
};
</script>
<style lang="">
</style>