const state = {
  workedDays: 0,
  extraHors: null,
  workedTime: null,
};
const getters = {
  //   notificationMessage: state => state.notificationMessage,
  //   notificationType: state => state.notificationType,
};
const mutations = {
  COUNT_WORKED_TIME(state, newValue) {
    state.workedTime = newValue;
  },
  COUNT_EXTRA_TIME(state, newValue) {
    state.extraHors = newValue;
  },
  COUNT_WORKED_DAYS(state) {
    state.workedDays++;
  },
};
const actions = {
  count_worked_time({ commit }, payload) {
    commit("COUNT_WORKED_TIME", payload);
  },
  count_extra_time({ commit }, payload) {
    commit("COUNT_EXTRA_TIME", payload);
  },
  count_days({ commit }) {
    commit("COUNT_WORKED_DAYS");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
