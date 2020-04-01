<template>
  <div class="appearance">
    <label class="choice">
      <img src="../assets/images/appearance-sidebar.svg" alt="">
      <h4 class="title">{{$t('translations.views.dashboardView')}}</h4>
      <span class="custom-radio">
        <input type="radio" v-model="appearance" @input="emitChosenValue" value="dashboard"/>
        <span class="check"></span>
      </span>
    </label>
    <label class="choice">
      <img src="../assets/images/appearance-classic.svg" alt="">
      <h4 class="title">{{$t('translations.views.classicView')}}</h4>
      <div class="custom-radio">
        <input type="radio" v-model="appearance" @input="emitChosenValue" value="classic"/>
        <span class="check"></span>
      </div>
    </label>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chooseAppearance',
  data () {
    return {
      appearance: ''
    }
  },
  mounted () {
    this.appearance = this.getAppearance
    this.$emit('style-change', this.getAppearance)
  },
  computed: {
    ...mapGetters('appearance', ['getAppearance'])
  },
  methods: {
    emitChosenValue () {
      setTimeout(() => {
        this.$emit('style-change', this.appearance)
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .appearance {
    display: flex;
    justify-content: center;

    .choice {
      margin: 0 0.25rem;
      padding: 1rem 0.5rem;
      border: 2px solid $border-alt;
      border-radius: $big-radius;
      max-width: 240px;
      text-align: center;
      cursor: pointer;
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      img {
        width: 100%;
        max-width: 72px;
        min-width: 60px;
        height: auto;
        opacity: 0.75;
      }

      .title {
        font-size: 0.85rem;
        color: $text-alt;
        margin: 0 0 1rem;

        @media screen and (map_get($breakpoints, 'sm')) {
          font-size: 1rem;
        }
      }

      .custom-radio {
        align-self: center;
      }
    }
  }
</style>
