export default {
  namespaced: true,
  state: {
    // initial state
    sidebarToggled: true
  },
  getters: {
    isSidebarToggled: state => state.sidebarToggled
  },
  mutations: {
    TOGGLE_SIDEBAR (state) {
      state.sidebarToggled = !state.sidebarToggled
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
