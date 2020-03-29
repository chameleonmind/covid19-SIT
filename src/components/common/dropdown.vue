<template>
  <div class="basic-dropdown">
    <div ref="drop" class="drop-button" @click.prevent="openDropdown" @blur="closePopup">
      <slot class="default-slot"></slot>
      <i class="icon-chevron-down" :class="{'active': dropdownOpen}" v-if="chevronVisible"></i>
    </div>
    <transition name="slidetop" mode="out-in">
      <div class="drop-container"
           ref="dropPopup"
           v-show="dropdownOpen"
           @click="closePopup">
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from 'popper.js'

export default {
  name: 'basic-dropdown',
  data () {
    return {
      popperjs: null,
      dropdownOpen: false
    }
  },
  props: {
    chevronVisible: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentClick)
  },
  methods: {
    openDropdown () {
      if (!this.dropdownOpen) {
        this.popperjs = new Popper(this.$refs.drop, this.$refs.dropPopup, {
          placement: 'bottom-end',
          modifiers: {
            flip: {
              behavior: ['bottom-end', 'top-start', 'top-end']
            }
          }
        })
        this.popperjs.scheduleUpdate()
        this.dropdownOpen = true
      } else {
        this.dropdownOpen = false
      }
    },
    closePopup () {
      this.dropdownOpen = false
      this.popperjs = null
    },
    handleDocumentClick (e) {
      if (e.target !== this.$refs.drop) {
        this.closePopup()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .basic-dropdown {
    width: 100%;
    display: block;

    .drop-button {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;

      > * {
        pointer-events: none;
      }

      i {
        font-size: 1em;
        color: inherit;
        transition: transform 0.3s;
        margin-left: auto !important;

        &.active {
          transform: rotateX(0.5turn);
        }
      }
    }

    .drop-container {
      display: block;
      background: transparent;
      /*border: 1px solid $border;
      border-radius: $menu-item-radius;*/
      z-index: map_get($z-index, tooltip);
    }
  }
</style>
