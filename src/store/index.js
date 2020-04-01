import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import news from './modules/news'
import language from './modules/language'
import country from './modules/country'
import appearance from './modules/appearance'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sidebar,
    news,
    language,
    country,
    appearance
  },
  plugins: [
    createPersistedState({
      paths: ['sidebar.sidebarToggled', 'news.newsSeen', 'language.lang', 'country.country', 'appearance.appearance']
    })
  ]
})
