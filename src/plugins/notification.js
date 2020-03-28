// we need our modal component
import notificationComp from '../components/common/notification'

const Notification = {
  install (Vue, options) {
    this.EventBus = new Vue()
    Vue.component('notification', notificationComp)
    Vue.prototype.$notification = {
      show (params) {
        Notification.EventBus.$emit('show', params)
      }
    }
  }
}

export default Notification
