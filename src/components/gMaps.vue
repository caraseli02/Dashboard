<template>
  <GmapMap
    :center="markers ? markers[0] : center"
    :zoom="15"
    map-type-id="terrain"
    :style="`width: ${width}%; height: ${height}px;`"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUI: false,
    }"
  >
    <GmapMarker :key="index" v-for="(m, index) in markers" :position="m" />
  </GmapMap>
</template>
<script>
export default {
  name:"Gmaps",
  props: {
    center: {
      type: Object,
      required: false,
      default: function() {
        return { lat: 10, lng: 10 };
      },
    },
    markers: {
      type: Array,
      required: false,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "220",
    },
  },
};
</script>
<style lang=""></style>
