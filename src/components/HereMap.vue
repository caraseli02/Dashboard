<template>
  <div
    class="flex flex-col justify-around items-center mt-10 glass-light"
    id="map"
  >
    <!--In the following div the HERE Map will render-->
    <div id="mapContainer" class="h-64 w-full rounded-lg" ref="hereMap"></div>
    <button class="my-3 mx-auto w-full">
      <span
        class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded
      "
        @click="showMapAction"
        >Cerrar</span
      >
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HereMap",
  props: {
    center: Object,
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "bjiwIP4HwZAUtZg_qn7-Ojf3dhBGxWaWNgCWFaYLeEY",
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
  },

  methods: {
    ...mapActions(["showMapAction"]),
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 19,
        center: this.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    },
  },
};
</script>

<style scoped>
#map {
  height: 60vh;
  width: 100vw;
  margin: 10vh auto;
  min-width: 360px;
  text-align: center;
}
</style>
