export default {
  namespaced: true,
  state: {
    // initial state
    appearance: 'dashboard'
  },
  getters: {
    getAppearance: state => state.appearance
  },
  mutations: {
    SWITCH_APPEARANCE (state, payload) {
      state.appearance = payload
    }
  },
  actions: {
    switchAppearance ({ commit }, payload) {
      commit('SWITCH_APPEARANCE', payload)
    }
  }
}
