import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import news from './modules/news'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sidebar,
    news
  },
  plugins: [
    createPersistedState({
      paths: ['sidebar.sidebarToggled', 'news.newsSeen']
    })
  ]
})
