import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sidebar
  },
  plugins: [
    createPersistedState({
      paths: ['sidebar.sidebarToggled']
    })
  ]
})
