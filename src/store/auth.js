import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import { data } from "./firebase-errors.json";

const state = {
  user: null,
  Errors: data,
};

const mutations = {
  setError(state, payload) {
    state.error = payload.error;
  },
  SET_USER: state => {
    state.user = firebase.auth().currentUser;
  },
};

const actions = {
  setUser: context => {
    context.commit("SET_USER");
  },
  async signUpAction({ dispatch }, payload) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const actionCodeSettings = {
          url: `${process.env.VUE_APP_HOST_NAME}sign-in/?email=${user.email}`,
        };
        user.updateProfile({
          displayName: payload.name,
        });
        user.sendEmailVerification(actionCodeSettings);
        firebase
          .firestore()
          .collection("attendanceUsers")
          .doc(user.uid)
          .set({
            email: user.email,
            name: payload.name,
            dni: payload.dni,
            enable: false,
          });
      })
      .catch(error => {
        console.log(error);
        dispatch(
          "notifi/showNotification",
          {
            notificationMessage: data[error.code],
            notificationType: "warning",
          },
          { root: true }
        );
      });
  },
  async signInAction({ dispatch }, payload) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        window.localStorage.setItem("uid", res.user.uid);
        window.localStorage.setItem("displayName", res.user.displayName);
        window.localStorage.setItem("email", res.user.email);
        window.localStorage.setItem("picture", res.user.photoURL);
      })
      .catch(error => {
        dispatch(
          "notifi/showNotification",
          {
            notificationMessage: data[error.code],
            notificationType: "warning",
          },
          { root: true }
        );
      });
  },
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.removeItem("uid");
        window.localStorage.removeItem("displayName");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("picture");
      });
  },
};

const getters = {
  getUser: state => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
