<template>
  <div class="settings">
    <loading :visible="loadingData"/>
    <div class="container">
      <expandable :title="$t('translations.settings.appSettings')" :expanded="appSettingsExpand" @toggle="toggleElement('appSettingsExpand')">
        <div class="row">
          <div class="col">
            <v-select class="custom-dropdown"
                      :reduce="text => text.value"
                      label="text"
                      :clearable="false"
                      :searchable="false"
                      :options="languageOptions"
                      v-model="selectedLanguage"/>
            <basic-button color="primary"
                          rounded
                          class="mt-3"
                          :disabled="loadingData"
                          :loading="loadingData"
                          @click="setLanguage">
              {{$t('translations.common.save')}}
            </basic-button>
          </div>
        </div>
      </expandable>
      <template v-if="localData && Object.keys(localData).length">
        <expandable :title="$t('translations.settings.changeDataTitle')" :expanded="detailsExpand" @toggle="toggleElement('detailsExpand')">
          <div class="row">
            <add-isolation-info :centered="false" :passed-data="localData" @save-data="saveData"></add-isolation-info>
          </div>
        </expandable>
        <expandable :title="$t('translations.settings.deleteData.title')" :expanded="deleteExpand" @toggle="toggleElement('deleteExpand')">
          <h4>{{$t('translations.settings.deleteData.subtitle')}}</h4>
          <basic-button color="danger" rounded @click="confirmDataDelete">
            {{$t('translations.settings.deleteData.deleteButton')}}
          </basic-button>
        </expandable>
      </template>
    </div>
  </div>
</template>

<script>
import Expandable from '../components/common/expandable'
import BasicButton from '../components/common/basicButton'
import localStorageMixin from '../mixins/localStorage'
import AddIsolationInfo from '../components/addIsolationInfo'
import vSelect from 'vue-select'
import { mapGetters, mapActions } from 'vuex'
import Loading from '../components/common/loading'

export default {
  name: 'Settings',
  components: {
    Loading,
    AddIsolationInfo,
    BasicButton,
    Expandable,
    vSelect
  },
  mixins: [localStorageMixin],
  computed: {
    ...mapGetters('language', ['getAppLanguage'])
  },
  data () {
    return {
      loadingData: false,
      localData: {},
      deleteExpand: false,
      detailsExpand: false,
      appSettingsExpand: true,
      selectedLanguage: 'en',
      languageOptions: [
        {
          value: 'sr',
          text: 'Srpski'
        },
        {
          value: 'en',
          text: 'English'
        }
      ],
      error: false
    }
  },
  mounted () {
    this.getDataFromLocalStorage()
      .then(res => {
        this.localData = res
      })
    this.selectedLanguage = this.getAppLanguage
  },
  methods: {
    ...mapActions('language', ['switchAppLanguage']),
    toggleElement (elem) {
      this[elem] = !this[elem]
    },
    confirmDataDelete () {
      this.$message.show({
        heading: this.$t('translations.settings.deleteConfirmation.title'),
        text: this.$t('translations.settings.deleteConfirmation.description'),
        type: 'confirmation',
        okText: this.$t('translations.common.delete'),
        cancelText: this.$t('translations.common.cancel'),
        onConfirm: () => this.performDelete()
      })
    },
    performDelete () {
      localStorage.removeItem('sitData')
      localStorage.removeItem('sitChart')

      this.$notification.show({
        text: this.$t('translations.settings.deleteSuccess'),
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
            text: this.$t('translations.settings.saveSuccess'),
            type: 'success',
            duration: 3000
          })
        })
    },
    setLanguage () {
      // selectedLanguage
      this.loadingData = true
      setTimeout(() => {
        this.switchAppLanguage(this.selectedLanguage)
          .then(() => {
            location.reload()
            this.loadingData = false
          })
          .catch(() => {
            this.loadingData = false
          })
          .finally(() => {
            this.loadingData = false
          })
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
  .settings {
    padding: 1rem;
    background: #fff;
    min-height: calc(100vh - 4.5rem);

    .container {
      width: 100%;
      max-width: 480px;
    }

    .language-select {
      width: 100%;
      max-width: 480px;
    }

    .change-info {
      padding: 1rem;
    }
  }
</style>
