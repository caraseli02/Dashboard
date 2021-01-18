import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";
import "@firebase/auth";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { v4 as uuidv4 } from "uuid";

import auth from "./auth";
import notifi from "./notifi";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    showMap: false,
    attendance: [],
    checkDay: null,
    weekAttned: null,
    loadingMap: false,
    geolocation: {},
    d: new Date(),
  },

  getters: {
    checkCalendarToday: state => {
      if (state.attendance[0]) {
        return (
          new Date(state.attendance[0].curentTime).toLocaleDateString() !==
            state.d.toLocaleDateString() &&
          new Date(state.attendance[0].curentTime).getMonth() ===
            state.d.getMonth()
        );
      }
      return state.d.getMonth();
    },
  },

  mutations: {
    ...vuexfireMutations,
    TOGGLE_LOADING(state, payload) {
      state.loadingMap = !!payload;
    },
    CHANGE_GEOLOCATION(state, payload) {
      state.geolocation = payload;
    },
    SHOW_MAP(state) {
      state.showMap = !state.showMap;
    },
    async SET_ATTENDANCE(state, { userData }) {
      const id = uuidv4();
      const docRef = db.collection("attendance").doc(id);
      return await docRef
        .set({
          createdAt: state.d,
          curentTime: new Date(userData.enterTime).getTime(),
          data: userData,
          author: state.auth.user.uid,
          delete_flag: "N",
          updatedAt: state.d,
          id: id,
        })
        .then(() => {
          console.log("Enviado");
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    async CHANGE_ATTENDANCE(state, { userData }) {
      const docRef = db.collection("attendance").doc(userData.id);
      return await docRef
        .update({
          data: userData.data,
          updatedAt: state.d,
        })
        .then(() => {
          console.log("user updated");
        })
        .catch(error => {
          this.error = error.message;
        });
    },
  },

  actions: {
    currentLocation({ commit }) {
      const { geolocation } = navigator;
      commit("TOGGLE_LOADING", true);

      return new Promise((resolve, reject) => {
        if (geolocation) {
          geolocation.getCurrentPosition(
            ({ coords }) => {
              const currentPosition = {
                lng: coords.longitude,
                lat: coords.latitude,
              };

              commit("CHANGE_GEOLOCATION", currentPosition);
              commit("TOGGLE_LOADING", false);
              resolve(currentPosition);
            },
            err => {
              commit("TOGGLE_LOADING", false);
              commit("notifi/SET_NOTIFICATION", {
                notificationMessage: "Tu ubicación no esta disponible",
                notificationType: "error",
              });
              reject(err);
            }
          );
        } else {
          console.info("Geolocation is not supported by this browser.");
          commit("TOGGLE_LOADING", false);
          reject();
        }
      });
    },
    showMapAction(context) {
      context.commit("SHOW_MAP");
    },
    // bindAsist: firestoreAction(({ bindFirestoreRef }) => {
    //   // return the promise returned by `bindFirestoreRef`
    //   return bindFirestoreRef("attendance", db.collection("attendance"));
    // }),
    bindAsist: firestoreAction(({ state, bindFirestoreRef }, time) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "attendance",
        db
          .collection("attendance")
          .where("delete_flag", "==", "N")
          .where("author", "==", state.auth.user.uid)
          .where("curentTime", ">=", time.start)
          .where("curentTime", "<=", time.end - 1)
          .orderBy("curentTime", "desc")
          .limit(3)
      );
    }),
    bindLastAsist: firestoreAction(({ state, bindFirestoreRef }, time) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "checkDay",
        db
          .collection("attendance")
          .where("delete_flag", "==", "N")
          .where("author", "==", state.auth.user.uid)
          .where("curentTime", ">=", time)
          .where("curentTime", "<=", time + 86399400)
          .limit(1)
      );
    }),
    deleteAsist: firestoreAction((context, asistId) => {
      db.collection("attendance")
        .doc(asistId)
        .delete();
    }),
    setAttendance(context, userData) {
      context.commit("SET_ATTENDANCE", { userData });
    },
    changeAttendance(context, userData) {
      context.commit("CHANGE_ATTENDANCE", { userData });
    },
  },

  modules: {
    auth,
    notifi,
  },
});
