<template>
  <div class="days-progress" :class="{'time-up' : $props.maxDays <= $props.daysPassed}">
    <svg viewBox="-20 -20 240 240">
      <g fill="none" stroke-width="18">
        <path
          d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"></path>
      </g>
    </svg>
    <svg viewBox="-20 -20 240 240">
      <path
        d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"
        :stroke-dashoffset="calculatedRemainingDays"></path>
    </svg>
    <div class="overlay">
      <p>Preostalo</p>
      <h2>{{remainingDays}}</h2>
      <p>{{maxDays - daysPassed !== 1 ? 'dana' : 'dan'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'daysProgress',
  props: {
    daysPassed: {
      type: Number,
      default: 0
    },
    maxDays: {
      type: Number,
      default: 0
    }
  },
  computed: {
    calculatedRemainingDays () {
      return this.$props.maxDays >= this.$props.daysPassed ? Math.round(629 * this.$props.daysPassed / this.$props.maxDays) : 629
    },
    remainingDays () {
      return this.$props.maxDays >= this.$props.daysPassed ? this.$props.maxDays - this.$props.daysPassed : 0
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/themes/index";

  @keyframes load {
    0% {
      stroke-dashoffset: 0
    }
  }

  .days-progress {
    display: inline-block;
    position: relative;
    text-align: center;
    min-width: 12rem;
    min-height: 12rem;

    svg {
      width: 12rem;
      height: 12rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);

      path {
        fill: none;
        stroke-width: 40;
        stroke-dasharray: 629;
        transition: stroke-dashoffset 1s;
      }

      &:nth-child(1) path {
        stroke: $plain;
      }

      &:nth-child(2) path {
        stroke: $primary;
      }
    }

    .time-up svg path {
      stroke: $success;
    }

    .overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      color: $text;
      font-weight: bold;
      width: 8.5rem;
      height: 8.5rem;
      border-radius: 10rem;
      box-shadow: $shadow;
      background-color: $base;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h2 {
        margin: 0 0 -5px;
        line-height: 1;
      }

      p {
        font-size: 0.8rem;
        font-weight: normal;
        color: $text-alt2;
        margin: 0;
        line-height: 1;
      }
    }
  }
</style>
