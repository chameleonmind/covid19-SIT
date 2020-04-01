<template>
  <div class="about" :class="{'app-container': getAppearance !== 'dashboard'}">
    <div v-html="aboutText.text"></div>
  </div>
</template>
<script>
import aboutDescription from '../dataSource/aboutDescription'
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
    ...mapGetters('appearance', ['getAppearance']),
    aboutText () {
      return aboutDescription[this.getAppLanguage]
    }
  }
}
</script>

<style scoped lang="scss">
  .about {
    padding: 1rem;
    width: 100%;
    max-width: 720px;
  }
</style>
