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
import "@/assets/css/main.css";

// Firebase config - this is provided when you create your app
// Swap out these settings for your project settings
var firebaseConfig = {
  apiKey: "AIzaSyAdhtu6PnQs80oem0zmBxNxMwYDQW_hl8Y",
  authDomain: "apimosa-930ed.firebaseapp.com",
  databaseURL: "https://apimosa-930ed.firebaseio.com",
  projectId: "apimosa-930ed",
  storageBucket: "apimosa-930ed.appspot.com",
  messagingSenderId: "534638874660",
  appId: "1:534638874660:web:8656465847f9b575c7c8b1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true });

// Set-up and use the Vue Router
// Pass in your routes and then
// Set the mode to use history
// removes # from the URL
Vue.use(VueRouter);

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
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    el: "#app",
    store: store,
    router: router,
    render: h => h(App),
  });
});
