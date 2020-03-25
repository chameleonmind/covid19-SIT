<template>
  <div class="basic-card" :class="'color-'+$props.color">
    <h2 class="card-title" v-if="$props.cardTitle">{{$props.cardTitle}}</h2>
    <div class="card-body">
      <slot></slot>
    </div>
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .basic-card {
    border-radius: $default-radius;
    padding: 1rem;
    box-shadow: $shadow-lg;
    height: 100%;

    &.color-base {
      background-color: $base;
    }

    &.color-primary {
      background-color: $primary;
    }

    .card-title {
      margin: 0 0 1rem;
      color: $text;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid $border-alt;
    }
  }
</style>
