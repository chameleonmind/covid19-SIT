<template>
  <transition name="fade" mode="out-in">
    <div class="modal" :class="{'visible' : visibilityAnimation}" v-if="visible">
      <div class="modal__backdrop custom-scrollbar"
           :class="{'top-align': alignment === 'top'}"
           @click.prevent.stop="emitCloseEvent">
        <div class="modal__main" v-if="visible" @click.stop>
          <div class="modal__header">
            <h3>{{$props.modalTitle}}</h3>
            <i class="icon-x" @click.prevent.stop="emitCloseEvent"></i>
          </div>
          <div class="modal__body">
            <slot></slot>
          </div>
          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'basicModal',
  data () {
    return {
      visibilityAnimation: false,
      tempTimeout: null
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String,
      default: '',
      required: true
    },
    alignment: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    emitCloseEvent () {
      this.$emit('close-modal')
    }
  },
  watch: {
    visible (value) {
      this.tempTimeout = setTimeout(() => {
        this.visibilityAnimation = value
        clearTimeout(this.tempTimeout)
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .modal {
    position: relative;
    z-index: map_get($z-index, modal);

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-bottom: 1.5rem;
      background: $modal-background;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: auto;

      &.top-align {
        align-items: flex-start;
        padding-top: 1.5rem;
      }
    }

    &__main {
      background: $base;
      width: 100%;
      max-width: 720px;
      border-radius: $default-radius;
      transform: translateY(20%);
      transition: transform 0.3s ease;
    }

    &__header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $border-alt-2;

      h3 {
        margin: 0;
      }

      i {
        cursor: pointer;
      }
    }

    &__body {
      padding: 1rem;
    }

    &__footer {
      padding: 1rem;
      text-align: right;
      border-top: 1px solid $border-alt-2;
    }

    &.visible {
      .modal__main {
        transform: translateY(0);
        transition: transform 0.3s ease;
      }
    }
  }
</style>
