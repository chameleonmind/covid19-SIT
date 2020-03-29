<template>
  <div class="emergency-measures">
    <div class="row">
      <div class="measure" v-for="(measure, idx) in emergencyMeasures.measures" :key="'measure'+idx">
        <p class="number-icon">{{idx+1}}</p>
        <h5 class="name">{{measure.name}}</h5>
        <p class="description">{{measure.description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import emergencyMeasuresSource from '../dataSource/measures'

export default {
  name: 'recommendations',
  data () {
    return {
      language: 'sr'
    }
  },
  computed: {
    emergencyMeasures () {
      return emergencyMeasuresSource[this.language]
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .emergency-measures {
    .row {
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .measure {
      flex: 0 0 100%;
      margin: 0 0.5rem;
      text-align: center;

      @media screen and(map_get($breakpoints, 'sm')) {
        flex-basis: 35%;
      }

      @media screen and(map_get($breakpoints, 'md')) {
        flex-basis: 25%;
      }

      .number-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: $primary;
        line-height: 0.5;
        border-radius: $full-radius;
        background: $plain;
        margin: 0 auto;
      }

      .name {
        font-size: 1rem;
        color: $text;
        margin: 0.5rem 0 0.5rem;
      }

      .description {
        font-size: 0.9rem;
        color: $text-alt2;
        margin: 0 0 0.5rem;
      }
    }
  }
</style>
