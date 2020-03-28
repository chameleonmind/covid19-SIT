<template>
  <div class="settings">
    <expandable title="Obriši sve podatke" :expanded="deleteExpand" @toggle="toggleElement('deleteExpand')">
      <h4>Obriši sve sačuvane podatke</h4>
      <basic-button color="primary" @click="confirmDataDelete">
        Obriši
      </basic-button>
    </expandable>
  </div>
</template>

<script>
import Expandable from '../components/common/expandable'
import BasicButton from '../components/common/basicButton'

export default {
  name: 'Settings',
  components: {
    BasicButton,
    Expandable
  },
  data () {
    return {
      deleteExpand: true
    }
  },
  methods: {
    toggleElement (elem) {
      this[elem] = !this[elem]
    },
    confirmDataDelete () {
      this.$message.show({
        heading: 'Please confirm',
        text: 'Da li ste sigurni da želite da obrišete sve sačuvane podatke?',
        type: 'confirmation',
        okText: 'Obriši',
        cancelText: 'Otkaži',
        onConfirm: () => this.performDelete()
      })
    },
    performDelete () {
      localStorage.removeItem('sitData')
      localStorage.removeItem('sitChart')

      this.$notification.show({
        text: 'Podaci uspešno obrisani.',
        type: 'success',
        duration: 3000
      })

      setTimeout(() => {
        this.$router.push('/')
      }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
  .settings {
    padding: 0.5rem 1rem;
  }
</style>
