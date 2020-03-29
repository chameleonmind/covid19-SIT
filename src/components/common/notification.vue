<template>
  <transition name="slide" mode="out-in">
    <div class="notification" :class="notificationType" v-if="visible">
      <div class="content">
        <div class="icon">
          <i class="icon-alert-triangle" v-if="notificationType === 'warning'"></i>
          <i class="icon-alert-octagon" v-else-if="notificationType === 'danger'"></i>
          <i class="icon-check" v-else-if="notificationType === 'success'"></i>
          <i class="icon-info" v-else></i>
        </div>
        <div class="text">
          {{text}}
        </div>
        <button class="close-btn" @click.prevent="hideNotification">
          <i class="icon-x"></i>
        </button>
      </div>
      <div class="progress" v-if="false">
        <div class="bar" :style="{transitionDuration : duration}"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import notification from '../../plugins/notification'

export default {
  name: 'notification',
  data () {
    return {
      // variable that shows/hides modal
      visible: false,
      notificationType: 'info',
      text: '',
      duration: 2000,
      onConfirm: {},
      timeout: null
    }
  },
  methods: {
    hideNotification () {
      // method for closing modal
      this.visible = false
      clearTimeout(this.timeout)
    },
    confirmAction () {
      // we must check if this.onConfirm is function
      if (typeof this.onConfirm === 'function') {
        // run passed function and then close the modal
        this.onConfirm()
        this.hide()
      } else {
        // we only close the modal
        this.hide()
      }
    },
    showNotification (params) {
      // making modal visible
      this.visible = true
      // setting title and text
      this.text = params.text || ''
      this.notificationType = params.type || 'info'
      this.duration = params.duration || 2000
      // setting callback function
      this.onConfirm = params.onConfirm

      if (Number.isInteger(this.duration)) {
        this.timeout = setTimeout(() => {
          this.hideNotification()
        }, this.duration)
      }
    }
  },
  beforeMount () {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    notification.EventBus.$on('show', (params) => {
      this.showNotification(params)
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    box-shadow: $shadow-sm;
    border-radius: .25rem;
    border: 1px solid $border;
    z-index: map_get($z-index, popup);
    background: $base-alt;
    color: $text-alt;
    overflow: hidden;
    max-width: 80%;
    display: flex;
    flex-direction: column;

    &.success {
      background: $success;
      color: $text-button;
      border: none;
    }

    &.danger {
      background: $danger;
      color: $text-button;
      border: none;
    }

    &.warning {
      background: $warning;
      color: $text-button;
      border: none;
    }

    .content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 1rem 1rem .5rem;

      .icon {
        font-size: 1.75rem;
      }

      .text {
        flex: 1 1 auto;
        padding: 0 1rem;
      }

      .close-btn {
        appearance: none;
        border: none;
        outline: none;
        background: transparent;
        color: inherit;
        padding: .25rem;
        cursor: pointer;
        margin-top: -.75rem;
        margin-right: -.75rem;
        align-self: flex-start;
      }
    }

    .progress {
      height: .5rem;
      position: relative;

      .bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: -0;
        right: 0;
        width: 100%;
        height: 100%;
        background: $success;
        transform: scaleX(0.8);
        transform-origin: left;
        transition-property: transform;
      }
    }

  }
</style>
