import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import Home from "@/pages/Home";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import Error404 from "@/components/Error404";
import Dashboard from "@/pages/Dashboard";
import Calendar from "@/pages/Calendar";
import Datos from "@/pages/Datos";
import ForgotPassword from "@/components/ForgotPassword";

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
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
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
