import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/config/vue-axios'
import { VTooltip } from 'v-tooltip'
import i18n from '@/plugins/i18n'
import NotificationPlugin from './plugins/notification'
import MessagePlugin from './plugins/message'
import Meta from 'vue-meta'

require('./assets/css/main.scss')

Vue.directive('tooltip', VTooltip)

Vue.use(NotificationPlugin)
Vue.use(MessagePlugin)

Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
