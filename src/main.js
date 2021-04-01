import Vue from "vue";
import App from "./App.vue";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

import VueRouter from "vue-router";
import { store } from "./store/store";
import { routes } from "./router/routes";

//axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// DatePicker
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";
import { Settings } from "luxon";
Settings.defaultLocale = "es";

// Drag Confirm Library
import dragVerify from "vue-drag-verify";

//ALERTS
import VueSimpleAlert from "vue-simple-alert";

import "./registerServiceWorker";

import "./tailwind.css";

//GOOGLE maps
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_APIKEY,
    //libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

export const db = firebase
  .initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
  })
  .firestore();

// firebase.analytics();
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };

// Set-up and use the Vue Router
// Pass in your routes and then
// Set the mode to use history
// removes # from the URL
Vue.use(VueRouter);
Vue.use(dragVerify);
Vue.use(Datetime);
Vue.use(VueSimpleAlert);

const router = new VueRouter({
  routes: routes,
  mode: "history",
});

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next("/sign-in");
  } else if (requiresAuth && user) {
    next();
  } else {
    next();
  }
});

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    user.getIdToken().then(function(idToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + idToken;
    });
  }
  new Vue({
    el: "#app",
    store: store,
    router: router,
    render: h => h(App),
  });
});
