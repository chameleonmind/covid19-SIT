export default {
  namespaced: true,
  state: {
    // initial state
    lang: 'en'
  },
  getters: {
    getAppLanguage: state => state.lang
  },
  mutations: {
    SWITCH_LANGUAGE (state, payload) {
      state.lang = payload
    }
  },
  actions: {
    switchAppLanguage ({ commit }, payload) {
      commit('SWITCH_LANGUAGE', payload)
    }
  }
}
