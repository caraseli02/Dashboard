<template>
  <div class="here-map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </div>
</template>`

<script>
  export default {
    name: "HereMap",
    data() {
      return {
        map: {},
        platform: {},
        router: {},
        geocoder: {},
        directions: [],
        ui: null
      }
    },
    props: {
      appId: String,
      appCode: String,
      lat: String,
      lng: String,
      width: String,
      height: String
    },
    created: function () {
      this.platform = new H.service.Platform({
        "app_id": this.appId,
        "app_code": this.appCode,
        'useHTTPS': true,
        'useCIT': true
      });
      this.router = this.platform.getRoutingService();
      this.geocoder = this.platform.getGeocodingService();
    },
    mounted: function () {
      // Initialize the platform object:           
      var pixelRatio = window.devicePixelRatio || 1;
      let defaultLayers = this.platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
      });
      this.map = new H.Map(
        this.$refs.map,
        defaultLayers.normal.map,
        { pixelRatio: pixelRatio, zoom: 5, center: { lat: 54.00366, lng: -2.547855 } });
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
      this.LoadMapLocations();
    },
    methods: {
      AddMarkerToGroup(group, location, icon) {
        console.log(location);
        var marker = new H.map.Marker({ lat: location.Latitude, lng: location.Longitude }, { icon: icon });
        marker.setData(location.Data);
        group.addObject(marker);
      },
      addMarkersToMap(locations, defaultIconUrl) {
        var scale = window.devicePixelRatio;
        var icon = new H.map.Icon(defaultIconUrl, { size: { w: 45 * scale, h: 50 * scale } });

        var group = new H.map.Group();
        this.map.addObject(group);
        var self = this;
        var position;
        group.addEventListener('tap', function (evt) {
          position = evt.target.getPosition();

          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
            // read custom data
            content: evt.target.getData()
          });
          // show info bubble                                       
          self.ui.addBubble(bubble);
        }, false);

        var addmarker = this.AddMarkerToGroup;
        locations.forEach(function (location) {

          addmarker(group, location, icon);
        });
      },
      LoadMapLocations() {
        let locations = [
          { Name: "Wolverhampton", Latitude: 52.5914143, Longitude: -2.1496674, Data: "wolverhampton meeting" },
          { Name: "London", Latitude: 51.5048147, Longitude: -0.121162, Data: "london meeting" },
          { Name: "Manchester", Latitude: 53.4757539, Longitude: -2.2791187, Data: "manchester meeting" }
        ];
        this.addMarkersToMap(locations, "https://image.flaticon.com/icons/png/512/33/33622.png");
      },
      ZoomToLocation(lat, long, zoom) {
        console.log("zoom to location ");
        this.map.setCenter({ lat: lat, lng: long });
        this.map.setZoom(zoom);
      }
    }
  };