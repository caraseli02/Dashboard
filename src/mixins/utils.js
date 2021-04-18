export default {
  data() {
    return {
      // refresh variables
      workedTime: null,
      extraHors: null,
      days: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
        "domingo",
      ],
    };
  },

  created() {},

  methods: {
    timeConvert(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if (rminutes > 9 && rminutes <= 55) {
        return `${rhours}h ${Math.ceil(rminutes / 5) * 5}m`;
      }
      if (rminutes > 55) {
        return `${rhours + 1}h`;
      }
      return `${rhours}h`;
    },
    diff_minutes(dt2, dt1) {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    },
    deepEqual(object1, object2) {
      function isObject(object) {
        return object != null && typeof object === "object";
      }

      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return true;
      }

      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          (areObjects && !this.deepEqual(val1, val2)) ||
          (!areObjects && val1 !== val2)
        ) {
          return true;
        }
      }
      return false;
    },
    roundTime(time, minutesToRound) {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      // Convert hours and minutes to time in minutes
      time = hours * 60 + minutes;

      let rounded = Math.round(time / minutesToRound) * minutesToRound;
      let rHr = "" + Math.floor(rounded / 60);
      let rMin = "" + (rounded % 60);

      return rHr.padStart(2, "0") + ":" + rMin.padStart(2, "0");
    },
    getRoundedDate: (minutes, d = new Date()) => {
      let ms = 1000 * 60 * minutes; // convert minutes to ms
      let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);
      roundedDate = new Date(
        roundedDate.getTime() - roundedDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
      return roundedDate;
    },
    
  },
};
