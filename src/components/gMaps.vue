<template>
  <GmapMap
    :center="markers ? markers[0]['gps'] : center"
    :zoom="11"
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
    <GmapMarker
      :clickable="true"
      @click="openInfoWindowTemplate(m)"
      :key="index"
      v-for="(m, index) in markers"
      :position="m['gps']"
    />
    <gmap-info-window
      :options="{
        maxWidth: 300,
        pixelOffset: { width: 0, height: -35 },
      }"
      :position="infoWindow.position"
      :opened="infoWindow.open"
      @closeclick="infoWindow.open = false"
    >
      <div v-html="infoWindow.template"></div>
    </gmap-info-window>
  </GmapMap>
</template>
<script>
export default {
  name: "Gmaps",
  data() {
    return {
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "",
      },
    };
  },
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
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "220",
    },
  },
  methods: {
    openInfoWindowTemplate(index) {
      const { gps, time, author } = index;
      this.infoWindow.position = gps;
      this.infoWindow.template = `<b>${author.name}</b><br>${author.surname}<br>${time}<br>`;
      this.infoWindow.open = true;
    },
  },
};
</script>
<style lang=""></style>
