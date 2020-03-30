<template>
  <div class="recommended">
    <div class="row">
      <div class="measure" v-for="(recommendation, idx) in recommendedMeasures.measures" :key="'recommendation'+idx">
        <img class="icon" :src="recommendation.icon" alt=""/>
        <!--<h5 class="name">{{recommendation.name}}</h5>-->
        <p class="description">{{recommendation.description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import recommendations from '../dataSource/recommendations'
import { mapGetters } from 'vuex'

export default {
  name: 'recommendations',
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
    recommendedMeasures () {
      return recommendations[this.getAppLanguage]
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .recommended {
    .title {
      font-size: 1rem;
      color: $text;
    }

    .row {
      justify-content: space-around;
      flex-wrap: wrap;

      @media screen and (map_get($breakpoints, 'md')) {
        flex-wrap: nowrap;
      }
    }

    .measure {
      flex: 0 0 30%;
      margin: 0 0.5rem;
      text-align: center;

      @media screen and (map_get($breakpoints, 'md')) {
        flex-basis: 10%;
      }

      .icon {
        max-width: 64px;
        display: block;
        margin: auto auto 0.5rem;
      }

      .name {
        font-size: 1rem;
        color: $text;
        margin: 0 0 0.5rem;
      }

      .description {
        font-size: 0.9rem;
        color: $text-alt2;
        margin: 0 0 0.5rem;
      }
    }
  }
</style>
