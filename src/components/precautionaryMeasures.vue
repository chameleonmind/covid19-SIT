<template>
  <div class="recommended-measures">
    <section v-for="precausionGroup in precautions" :key="precausionGroup.name">
      <h3 class="title">{{precausionGroup.name}}</h3>
      <div class="row">
        <div class="measure" v-for="(measure, idx) in precausionGroup.measures" :key="'measure'+idx">
          <!--<i class="icon icon-"></i>
          <img :src="measure.icon" alt="" />-->
          <h5 class="name">{{measure.name}}</h5>
          <p class="description">{{measure.description}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'precautionaryMeasures',
  props: {
    precautions: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .recommended-measures {
    .title {
      font-size: 1rem;
      color: $text;
    }

    .row {
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .measure {
      flex: 0 0 20%;
      margin: 0 0.5rem;
      text-align: center;

      .icon {
        font-size: 1.5rem;
        color: $text-alt2;
        margin-bottom: 0.5rem;
        display: block;
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
