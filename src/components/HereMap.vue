<template>
  <div class="flex flex-col justify-around items-center" id="map">
    <!--In the following div the HERE Map will render-->
    <div id="mapContainer" class="h-64 w-full rounded-lg" ref="hereMap"></div>
    <!-- <button class="my-3 mx-auto w-full">
      <span
        class="bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
        @click="showMapAction"
        >Cerrar</span
      >
    </button> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import hereMap from "@/mixins/hereMap";
export default {
  name: "HereMap",
  mixins: [hereMap],
  props: {
    center: Object,
    attendance: Array,
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      ui: null,
      map: null,
      // You can get the API KEY from developer.here.com
    };
  },
  watch: {
    attendance: function() {
      this.addInfoBubble(this.map);
      // watch it
    },
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
    addMarkerToGroup(group, coordinate, html) {
      const H = window.H;
      var marker = new H.map.Marker(coordinate);
      // add custom data to the marker
      marker.setData(html);
      group.addObject(marker);
    },
    async addInfoBubble(map) {
      const H = window.H;
      var group = new H.map.Group();
      var self = this;

      map.getObjects().forEach(bub => map.removeObject(bub));
      map.addObject(group);

      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener(
        "tap",
        function(evt) {
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData(),
          });
          // show info bubble
          self.ui.addBubble(bubble);
        },
        false
      );
      if (this.attendance) {
        this.attendance.forEach(({ data }) => {
          if (data.gpsLoc) {
            this.addMarkerToGroup(
              group,
              { lat: data.gpsLoc.lat, lng: data.gpsLoc.lng },
              `<div > 
              Entrada
              <br>${data.enterTime.slice(5, 10)}
              <br>${data.enterTime.slice(11, 16)}<br>
              </div>`
            );
          }
          if (data.gpsLocLeave) {
            this.addMarkerToGroup(
              group,
              { lat: data.gpsLocLeave.lat, lng: data.gpsLocLeave.lng },
              `<div >
              Salida 
              <br>${data.leaveTime.slice(5, 10)}
              <br>${data.leaveTime.slice(11, 16)}<br>
              </div>`
            );
          }
        });
      }
    },
    removeInfoBubble() {
      this.ui.getBubbles().forEach(bub => this.ui.removeBubble(bub));
    },
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });
      this.map = map;
      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      this.ui = H.ui.UI.createDefault(map, maptypes, "es-ES");
      // End rendering the initial map
    },
  },
};
</script>

<style scoped>
#map {
  height: 50vh;
  width: 100vw;
  margin: 0 auto;
  min-width: 360px;
  text-align: center;
}
</style>
