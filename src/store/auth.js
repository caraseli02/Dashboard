import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const state = {
  user: null,
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
  async signUpAction(_, payload) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const actionCodeSettings = {
          url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
        };
        user.sendEmailVerification(actionCodeSettings);
        firebase
          .firestore()
          .collection("attendanceUsers")
          .doc(user.uid)
          .set({
            email: user.email,
          });
      });
  },
  async signInAction(_, payload) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        window.localStorage.setItem("uid", res.user.uid);
        window.localStorage.setItem("displayName", res.user.displayName);
        window.localStorage.setItem("email", res.user.email);
        window.localStorage.setItem("picture", res.user.photoURL);
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
