<template>
  <div class="about">
    <div v-html="aboutText.text"></div>
  </div>
</template>
<script>
import aboutDescription from '../dataSource/aboutDescription'
export default {
  name: 'About',
  data () {
    return {
      language: 'sr'
    }
  },
  computed: {
    aboutText () {
      return aboutDescription[this.language]
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
