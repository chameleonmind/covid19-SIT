<template>
  <transition name="fade" mode="out-in">
    <div class="confirmation" v-if="visible" @click="hideConfirmation">
      <div class="confirmation__container" @click.stop>
        <div class="confirmation__header">
          {{heading}}
        </div>
        <div class="confirmation__body">
          <p>{{text}}</p>
        </div>
        <div class="confirmation__actions">
          <basic-button :color="type === 'confirmation' ? 'text' : 'primary'"
                        class="mr-3"
                        modifier="stop" @click="hideConfirmation">
            {{type === 'confirmation' ? cancelText : okText}}
          </basic-button>
          <basic-button color="primary"
                        modifier="stop"
                        v-if="type === 'confirmation'"
                        @click="confirmAction">
            {{okText}}
          </basic-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BasicButton from './basicButton'
import messagePlugin from '../../plugins/message'

export default {
  name: 'message',
  data () {
    return {
      visible: false,
      text: '',
      heading: '',
      type: 'confirmation',
      okText: '',
      cancelText: '',
      onConfirm: {},
      onHidden: {}
    }
  },
  components: { BasicButton },
  methods: {
    hideConfirmation () {
      this.visible = false
      if (typeof this.onHidden === 'function') {
        this.onHidden()
      }
    },
    confirmAction () {
      // we must check if this.onConfirm is function
      if (typeof this.onConfirm === 'function') {
        // run passed function and then close the modal
        this.onConfirm()
        this.hideConfirmation()
      } else {
        // we only close the modal
        this.hideConfirmation()
      }
    },
    showMessage (params) {
      // making modal visible
      this.visible = true
      // setting title and text
      this.text = params.text || ''
      this.heading = params.heading || ''
      this.type = params.type || 'message'
      this.onConfirm = params.onConfirm
      this.okText = params.okText || 'OK'
      this.cancelText = params.cancelText || 'Cancel'
      this.onHidden = params.onHidden
    }
  },
  beforeMount () {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    messagePlugin.EventBus.$on('show', (params) => {
      this.showMessage(params)
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .confirmation {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.9);
    z-index: map_get($z-index, popup);

    &__container {
      border-radius: $default-radius;
      background: $base;
      padding: 1rem;
      width: 100%;
      max-width: 480px;
    }

    &__header {
      padding: 0 0 0.5rem;
      font-weight: bold;
      border-bottom: 1px solid $border-alt;
    }

    &__body {
      padding: 1rem 0.5rem;
    }

    &__actions {
      padding: 0.5rem 0 0;
      text-align: right;
      /*border-top: 1px solid $border-alt;*/
    }
  }
</style>
