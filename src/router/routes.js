import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import Home from "@/pages/Home.vue";
import SignIn from "@/components/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";
import Error404 from "@/components/Error404.vue";
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import Calendar from "@/pages/Calendar.vue";
import Datos from "@/pages/Datos/Datos.vue";
// import ForgotPassword from "@/components/ForgotPassword.vue";
// LEGAL
import avisoLegal from "@/pages/Legal/avisoLegal.vue";
import pPrivacidad from "@/pages/Legal/pPrivacidad.vue";
import pCookies from "@/pages/Legal/pCookies.vue";
import terCondiciones from "@/pages/Legal/terCondiciones.vue";

// This is where you add all your site routes
// Each route is set as an object in the array
// For a the most basic route just set
// the path & component to load

export const routes = [
  {
    path: "",
    name: "home",
    component: Home,
  },
  {
    path: "/aviso-legal",
    name: "aviso-legal",
    component: avisoLegal,
  },
  {
    path: "/politica-privacidad",
    name: "pPrivacidad",
    component: pPrivacidad,
  },
  {
    path: "/politica-de-cookies",
    name: "pCookies",
    component: pCookies,
  },
  {
    path: "/terminos-y-condiciones",
    name: "terCondiciones",
    component: terCondiciones,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
    beforeEnter(to, from, next) {
      const user = firebase.auth().currentUser;
      if (user) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      const user = firebase.auth().currentUser;
      if (user) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    },
  },
  // {
  //   path: "/forgot-password",
  //   name: "forgotPassword",
  //   component: ForgotPassword,
  //   beforeEnter(to, from, next) {
  //     const user = firebase.auth().currentUser;
  //     if (user) {
  //       next({ name: "dashboard" });
  //     } else {
  //       next();
  //     }
  //   },
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/datos",
    name: "datos",
    component: Datos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: Error404,
  },
  {
    path: "*",
    redirect: "/404",
  },
];
