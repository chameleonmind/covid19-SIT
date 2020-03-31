import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import news from './modules/news'
import language from './modules/language'
import country from './modules/country'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sidebar,
    news,
    language,
    country
  },
  plugins: [
    createPersistedState({
      paths: ['sidebar.sidebarToggled', 'news.newsSeen', 'language.lang', 'country.country']
    })
  ]
})
