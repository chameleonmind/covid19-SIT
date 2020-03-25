import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store/index'

Vue.use(VueI18n)

const messages = {}

const i18n = new VueI18n({
  locale: store.getters['language/uiLang'] || 'rs', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
