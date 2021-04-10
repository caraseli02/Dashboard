export default {
  data() {
    return {
      platform: null,
      gpsData: [],
    };
  },

  created() {},

  methods: {
    getInfoFromGps(geocoder, data) {
      let gpsData = [];
      data.forEach(element => {
        let reverseGeocodingParameters = {
          prox: `${element.lat},${element.lng}`,
          mode: "retrieveAddresses",
          maxresults: 1,
        };

        geocoder.reverseGeocode(
          reverseGeocodingParameters,
          res => {
            let results = res.Response.View;
            if (results.length === 0) {
              console.log("No match.");
            } else {
              gpsData.push(results[0].Result[0].Location.Address);
            }
          },
          e => console.log(e)
        );
      });
      this.gpsData = gpsData;
    },
  },
};
