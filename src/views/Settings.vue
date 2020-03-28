<template>
  <div class="settings">
    <template v-if="localData && Object.keys(localData).length">
      <expandable title="Izmeni podatke" :expanded="detailsExpand" @toggle="toggleElement('detailsExpand')">
        <div class="row">
          <div class="col-md-2">
            <add-isolation-info :centered="false" :passed-data="localData" @save-data="saveData"></add-isolation-info>
          </div>
        </div>
      </expandable>
      <expandable title="Obriši sve podatke" :expanded="deleteExpand" @toggle="toggleElement('deleteExpand')">
        <h4>Obriši sve sačuvane podatke</h4>
        <basic-button color="danger" rounded @click="confirmDataDelete">
          Obriši
        </basic-button>
      </expandable>
    </template>
    <h3 v-else class="p-3 m-0 text-center">Nema dostupnih podešavanja.</h3>
  </div>
</template>

<script>
import Expandable from '../components/common/expandable'
import BasicButton from '../components/common/basicButton'
import localStorageMixin from '../mixins/localStorage'
import AddIsolationInfo from '../components/addIsolationInfo'

export default {
  name: 'Settings',
  components: {
    AddIsolationInfo,
    BasicButton,
    Expandable
  },
  mixins: [localStorageMixin],
  data () {
    return {
      localData: {},
      deleteExpand: false,
      detailsExpand: false,
      error: false
    }
  },
  mounted () {
    this.getDataFromLocalStorage()
      .then(res => {
        this.localData = res
      })
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
    },
    clearError () {
      this.error = false
    },
    saveData (data) {
      this.saveDataToLocalStorage(data)
        .then(() => {
          this.$notification.show({
            text: 'Podaci uspešno sačuvani.',
            type: 'success',
            duration: 3000
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .settings {
    padding: 0.5rem 1rem;
    background: #fff;
    min-height: calc(100vh - 4.5rem);

    .change-info {
      padding: 1rem;
    }
  }
</style>
