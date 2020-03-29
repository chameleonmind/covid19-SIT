<template>
  <div class="news-container">
    News go here
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'News',
  data () {
    return {}
  },
  mounted () {
    if (!this.hasSeenWarning) {
      this.$message.show({
        heading: 'Upozorenje!',
        text: 'Čuvajte se lažnih vesti!',
        onHidden: () => this.confirmAction()
      })
    }
  },
  computed: {
    ...mapGetters('news', ['hasSeenWarning'])
  },
  methods: {
    ...mapActions('news', ['markAsSeen']),
    confirmAction () {
      console.log('I confirm!')
    }
  }
}
</script>

<style scoped lang="scss">
  .news-container {
    padding: 1rem;
  }
</style>
