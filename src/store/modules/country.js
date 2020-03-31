export default {
  namespaced: true,
  state: {
    // initial state
    country: 'Serbia'
  },
  getters: {
    getSelectedCountry: state => state.country
  },
  mutations: {
    SWITCH_COUNTRY (state, payload) {
      state.country = payload
    }
  },
  actions: {
    switchCountrySelection ({ commit }, payload) {
      commit('SWITCH_COUNTRY', payload)
    }
  }
}
