import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { v4 as uuidv4 } from "uuid";
//ALERTS
import VueSimpleAlert from "vue-simple-alert";

import auth from "./auth";
import notifi from "./notifi";
import workTime from "./workTime";

Vue.use(Vuex);
Vue.use(VueSimpleAlert);

export const store = new Vuex.Store({
  state: {
    showMap: false,
    showSidebar: false,
    attendance: [],
    checkDay: null,
    weekAttned: null,
    loadingMap: false,
    geolocation: {},
    d: new Date(),
    users: null,
    selectedMonth: null,
    selectedTime: null,
    userData: null,
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
    SET_MONTH(state, payload) {
      state.selectedMonth = payload;
    },
    SET_MONTH_LIMITES(state, payload) {
      state.selectedTime = payload;
    },
    TOGGLE_SIDEBAR(state) {
      state.showSidebar = !state.showSidebar;
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
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          curentTime: new Date(userData.enterTime).getTime(),
          data: userData,
          author: state.auth.user.uid,
          delete_flag: "N",
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          id: id,
          activeSession: true,
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
      if (userData.msgLeave) {
        return await docRef.update({
          msgLeave: userData.msgLeave,
          activeSession: userData.activeSession,
          closedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        return await docRef.update({
          data: userData.data,
          activeSession: userData.activeSession,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    },
    async CHANGE_USER_DATA(state, { userData }) {
      console.log(userData);
      const docRef = db.collection("attendanceUsers").doc(userData.id);
      return await docRef.update({
        surname: userData.surname,
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
    clearLocation({ commit }) {
      commit("CHANGE_GEOLOCATION", {});
    },
    showMapAction(context) {
      context.commit("SHOW_MAP");
    },
    toggleSidebar(context) {
      context.commit("TOGGLE_SIDEBAR");
    },
    // bindAsist: firestoreAction(({ bindFirestoreRef }) => {
    //   // return the promise returned by `bindFirestoreRef`
    //   return bindFirestoreRef("attendance", db.collection("attendance"));
    // }),
    bindAsist: firestoreAction(({ state, bindFirestoreRef }, time) => {
      // action to display attendance where leaveTime dosn´t exist
      // only for pass Month
      if (new Date(time.end).getMonth() < state.d.getMonth()) {
        return bindFirestoreRef(
          "attendance",
          db
            .collection("attendance")
            .where("delete_flag", "==", "N")
            .where("activeSession", "==", true)
            .where("author", "==", state.auth.user.uid)
            .where("curentTime", ">=", time.start)
            .where("curentTime", "<=", time.end - 1)
            .orderBy("curentTime", "desc")
            .limit(1)
        );
      }
      // action to get data of actual Month
      else {
        return bindFirestoreRef(
          "attendance",
          db
            .collection("attendance")
            .where("delete_flag", "==", "N")
            .where("author", "==", state.auth.user.uid)
            .where("curentTime", ">=", time.start)
            .where("curentTime", "<=", time.end - 1)
            .orderBy("curentTime", "desc")
            .limit(1)
        );
      }
    }),
    getAsist: firestoreAction(({ state, bindFirestoreRef }, data) => {
      // return the promise returned by `bindFirestoreRef`
      if (data.user === state.auth.user.email) {
        return bindFirestoreRef(
          "attendance",
          db
            .collection("attendance")
            .where("delete_flag", "==", "N")
            .where("author", "==", state.auth.user.uid)
            .where("curentTime", ">=", data.time.start)
            .where("curentTime", "<=", data.time.end - 1)
            .orderBy("curentTime", "desc")
        );
      } else {
        return bindFirestoreRef(
          "attendance",
          db
            .collection("attendance")
            .where("delete_flag", "==", "N")
            .where("data.email", "==", data.user)
            .where("curentTime", ">=", data.time.start)
            .where("curentTime", "<=", data.time.end - 1)
            .orderBy("curentTime", "desc")
        );
      }
    }),
    getUserData: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "userData",
        db
          .collection("attendanceUsers")
          .where("author", "==", state.auth.user.uid)
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
    getUsers: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("users", db.collection("attendanceUsers"));
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
    changeUserData(context, userData) {
      context.commit("CHANGE_USER_DATA", { userData });
    },
    selectMonth(context, userData) {
      context.commit("SET_MONTH", userData);
    },
    selectMonthLimites(context, userData) {
      context.commit("SET_MONTH_LIMITES", userData);
    },
  },

  modules: {
    auth,
    notifi,
    workTime,
  },
});
