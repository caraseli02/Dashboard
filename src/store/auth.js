import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const state = {};

const mutations = {
  setError(state, payload) {
    state.error = payload.error;
  },
};

const actions = {
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
      .then(() => {
        this.$router.replace("dashboard");
      })
      .catch(error => {
        this.error = error.message;
      });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
