import Vue from "vue";
import Vuex from "vuex";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

import auth from "./auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    SET_USER: state => {
      state.user = firebase.auth().currentUser;
    },
  },
  actions: {
    setUser: context => {
      context.commit("SET_USER");
    },
  },
  modules: {
    auth,
  },
});
