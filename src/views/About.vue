<template>
  <div class="about">
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
