export default {
  namespaced: true,
  state: {
    // initial state
    newsSeen: false
  },
  getters: {
    hasSeenWarning: state => state.newsSeen
  },
  mutations: {
    COMMIT_SEEN (state) {
      state.newsSeen = !state.newsSeen
    }
  },
  actions: {
    markAsSeen ({ commit }) {
      commit('COMMIT_SEEN')
    }
  }
}
