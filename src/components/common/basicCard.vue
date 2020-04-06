<template>
  <div class="basic-card" :class="'color-'+$props.color">
    <transition name="slide" mode="out-in">
      <div class="loader" v-if="$props.loading" :style="{minHeight: $props.loaderHeight}">
        <svg viewBox="-20 -20 240 240">
          <g fill="none" stroke-width="2">
            <path
              d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"></path>
          </g>
        </svg>
        <p class="mb-0 mt-3 font-s-sm">{{$t('translations.common.loadingInProgress')}}</p>
      </div>
      <div v-else>
        <h2 class="card-title" v-if="$props.cardTitle">{{$props.cardTitle}}
          <i :class="$props.cardIcon"
             :style="{color: $props.iconColor}"></i>
          <slot name="button"></slot>
        </h2>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'basicCard',
  props: {
    color: {
      type: String,
      default: 'base'
    },
    cardTitle: {
      type: String,
      default: ''
    },
    cardIcon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    loaderHeight: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .basic-card {
    border-radius: $big-radius;
    padding: 1rem;
    box-shadow: $shadow-lg;
    height: 100%;
    max-width: 100%;

    &.color-base {
      background-color: $base;
    }

    &.color-primary {
      background-color: $primary;
    }

    &.color-transparent {
      background-color: transparent;
      box-shadow: none;
      border-radius: 0;
    }

    .card-title {
      font-size: 1.25rem;
      margin: 0 0 1rem;
      color: $text;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid $border-alt;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        color: $text-alt2;
      }
    }

    .card-footer {
      font-size: 0.8rem;
      color: $text-alt2;
    }
  }

  .loader {
    height: 100%;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $text-alt2;
    transition: height 0.2s;

    svg {
      width: 2rem;
      height: 2rem;
      animation: loadSpinner;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      path {
        fill: none;
        stroke-width: 20;
        stroke: $primary;
        stroke-dasharray: 300;
        animation: pathAnimation;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }

  @keyframes loadSpinner {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes pathAnimation {
    0% {
      stroke-dasharray: 320;
    }
    50% {
      stroke-dasharray: 629;
    }
    100% {
      stroke-dasharray: 320;
    }
  }
</style>
