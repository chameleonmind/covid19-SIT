<template>
  <button class="button" :class="[colorClass, {'has-icon' : $props.icon, 'disabled' : $props.disabled || $props.loading}, sizeClass]"
          :disabled="$props.disabled || $props.loading"
          :type="$props.type"
          @click="clickEvent"
          @mouseover="mouseOverEvent"
          @mouseenter="mouseEnterEvent"
          @mouseleave="mouseLeaveEvent">
      <span class="button-text" :class="$props.loading ? 'hidden' : ''">
        <i v-if="$props.icon" :class="`icon icon-${$props.icon}`"></i>
        <slot></slot>
        <i v-if="$props.type === 'dropdown'" class="dropdown-icon icon-chevron-down"></i>
      </span>
    <span class="badge" v-if="$props.badge" :class="$props.badgeColor">
      {{$props.badge}}
    </span>
    <span class="loading-spinner"
          v-if="$props.loading">
        <i class="icon icon-loader"></i>
      </span>
  </button>
</template>

<script>
export default {
  name: 'basic-button',
  data () {
    return {
      compDisabled: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'plain'
    },
    size: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: 'button'
    },
    group: {
      type: String,
      default: 'none'
    },
    modifier: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    },
    badgeColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    colorClass () {
      return 'button-' + this.$props.color
    },
    sizeClass () {
      return 'size-' + this.$props.size
    }
  },
  methods: {
    clickEvent (e) {
      if (this.modifier === 'stop') {
        e.stopPropagation()
      } else if (this.modifier === 'prevent') {
        e.preventDefault()
      }
      this.$emit('click')
    },
    mouseOverEvent () {
      this.$emit('mouseover')
    },
    mouseEnterEvent () {
      this.$emit('mouseenter')
    },
    mouseLeaveEvent () {
      this.$emit('mouseleave')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .button {
    display: inline-block;
    position: relative;
    appearance: none;
    border: none;
    outline: none;
    border-radius: $default-radius;
    cursor: pointer;
    transition: background-color .2s, border-color .2s;

    &.size-normal {
      padding: 0.5rem 1.25rem;

      &.has-icon {
        padding: 0.75rem 1.5rem 0.75rem 1rem;

        .icon {
          margin-right: 0.75rem;
        }
      }
    }

    &.size-small {
      padding: .25rem .5rem;
      font-size: 0.9rem;

      &.has-icon {
        padding: .25rem .5rem .25rem .5rem;

        .icon {
          margin-right: 0.5rem;
        }
      }

      &.round {
        border-radius: 99px;
        width: 25px;
        height: 25px;
        font-size: 0.8rem;
      }
    }

    &.size-big {
      padding: 1rem 1.5rem;
      font-size: 1.2rem;

      &.has-icon {
        padding: .25rem .5rem .25rem .5rem;

        .icon {
          margin-right: 0.5rem;
        }
      }
    }

    &.size-xsm {
      padding: .2rem .25rem;
      font-size: 0.75rem;

      &.has-icon {
        padding: .2rem .25rem .2rem .25rem;

        .icon {
          margin-right: 0.25rem;
        }
      }
    }

    &:disabled {
      opacity: .65;
      cursor: no-drop;
    }

    &.button-primary {
      color: $text-button;
      background: $primary;
      border: 1px solid $primary;

      &:hover, &:focus {
        background: $primary-action;
      }
    }

    &.button-secondary {
      color: $text-button;
      background: $secondary;
      border: 1px solid $secondary;

      &:hover, &:focus {
        background: $secondary-action;
      }
    }

    &.button-outline {
      color: $text;
      border: 1px solid $text;
      background: $base-alt;

      &:hover, &:focus {
        border-color: $text-alt2;
      }
    }

    &.button-plain {
      color: $text-alt;
      border: 1px solid $plain;
      background: $plain;

      &:hover, &:focus {
        color: $text-alt2;
        background: $plain-action;
      }
    }

    &.button-text {
      background: transparent;
      padding: 0.5rem;
      color: inherit;
      outline: none;
      transition: opacity .2s;

      &:hover {
        opacity: .8;
      }
    }

    &.button-danger {
      color: $text-button;
      background: $danger;
      border: 1px solid $danger;
      transition: opacity 0.2s;

      &:hover, &:focus {
        opacity: 0.75;
      }
    }

    .dropdown-icon {
      margin-left: 0.5rem;
      margin-right: -0.5rem;
    }

    .badge {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      padding: .25rem .5rem .15rem 0.5rem;
      font-size: .85rem;
      line-height: 1;
      vertical-align: baseline;
      opacity: .95;
      color: $text;
      background: $base;
      border: 1px solid $border;
      box-shadow: $shadow-sm;
      border-radius: 99px;

      &.primary {
        color: $text-button;
        background: $primary;
        border: none;
      }

      &.success {
        color: $text-button;
        background: $success;
        border: none;
      }
    }
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .2s, display 0s .2s;

    i.icon {
      display: inline-block;
      animation: spin;
      animation-duration: 1.5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }

  .button-text {
    white-space: nowrap;
    opacity: 1;
    transition: opacity .2s;

    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }

  .button-group {
    > .button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    + .button-group {
      > .button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    :last-child {
      > .button {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
  }
</style>
