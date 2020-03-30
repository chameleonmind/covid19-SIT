<template>
  <div class="loader-full" v-if="$props.visible">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .loader-full {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.85);

    .spinner {
      width: 3rem;
      height: 3rem;
      border: 2px solid #fff;
      border-bottom: 2px solid transparent;
      border-radius: 500px;
      animation: spin;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }
</style>
