import messageComp from '../components/common/message'

const Message = {
  install (Vue, options) {
    this.EventBus = new Vue()
    Vue.component('message', messageComp)
    Vue.prototype.$message = {
      show (params) {
        Message.EventBus.$emit('show', params)
      }
    }
  }
}

export default Message
