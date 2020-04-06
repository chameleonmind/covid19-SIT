<template>
  <div class="settings">
    <loading :visible="loadingData"/>
    <div :class="{'app-container narrow-container': getAppearance !== 'dashboard'}">
      <div class="container">
        <expandable :title="$t('translations.settings.appSettings')"
                    :expanded="appSettingsExpand"
                    ref="appSettingsRef"
                    @toggle="toggleElement('appSettingsExpand')">
          <div class="row">
            <div class="col">
              <label for="language">{{$t('translations.settings.selectLanguage')}}</label>
              <v-select class="custom-dropdown"
                        :reduce="text => text.value"
                        label="text"
                        id="language"
                        :clearable="false"
                        :searchable="false"
                        :options="languageOptions"
                        v-model="selectedLanguage"/>
              <label for="country" class="mt-3">{{$t('translations.settings.chooseCountry')}}</label>
              <v-select class="custom-dropdown"
                        :placeholder="$t('translations.personalInfo.countryPlaceholder')"
                        id="country"
                        :clearable="true"
                        :searchable="true"
                        :options="listOfCountries"
                        v-model="selectedCountry"/>
              <div class="my-3">
                <choose-appearance @style-change="setAppearance"/>
              </div>
              <basic-button color="primary"
                            rounded
                            class="mt-3"
                            :disabled="loadingData"
                            :loading="loadingData"
                            @click="setLanguageAndCountry">
                {{$t('translations.common.save')}}
              </basic-button>
            </div>
          </div>
        </expandable>
        <template v-if="localData && Object.keys(localData).length">
          <expandable :title="$t('translations.settings.changeDataTitle')"
                      :expanded="detailsExpand"
                      ref="detailsExpandRef"
                      :overflow-visible="true"
                      @toggle="toggleElement('detailsExpand')">
            <div class="row">
              <add-isolation-info :centered="false" :passed-data="localData" :show-country="false"
                                  :show-language="false" @save-data="saveData"></add-isolation-info>
            </div>
          </expandable>
          <expandable :title="$t('translations.settings.deleteData.title')"
                      :expanded="deleteExpand"
                      :overflow-visible="false"
                      @toggle="toggleElement('deleteExpand')">
            <h4>{{$t('translations.settings.deleteData.subtitle')}}</h4>
            <basic-button color="danger" rounded @click="confirmDataDelete">
              {{$t('translations.settings.deleteData.deleteButton')}}
            </basic-button>
          </expandable>
        </template>
      </div>
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
import countryList from '../dataSource/countryList'
import ChooseAppearance from '../components/chooseAppearance'

export default {
  name: 'Settings',
  components: {
    ChooseAppearance,
    Loading,
    AddIsolationInfo,
    BasicButton,
    Expandable,
    vSelect
  },
  mixins: [localStorageMixin],
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
    ...mapGetters('country', ['getSelectedCountry']),
    ...mapGetters('appearance', ['getAppearance']),
    listOfCountries () {
      return countryList
    }
  },
  data () {
    return {
      loadingData: false,
      localData: {},
      deleteExpand: false,
      detailsExpand: false,
      appSettingsExpand: true,
      selectedLanguage: 'en',
      selectedCountry: '',
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
      error: false,
      selectedAppearance: ''
    }
  },
  mounted () {
    this.getDataFromLocalStorage()
      .then(res => {
        this.localData = res
      })
    this.selectedLanguage = this.getAppLanguage
    this.selectedCountry = this.getSelectedCountry
    setTimeout(() => {
      this.$refs.appSettingsRef.calculateElementHeight()
    }, 500)
  },
  methods: {
    ...mapActions('language', ['switchAppLanguage']),
    ...mapActions('country', ['switchCountrySelection']),
    ...mapActions('appearance', ['switchAppearance']),
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
          this.detailsExpand = false
          this.$refs.detailsExpandRef.calculateElementHeight()
          this.$notification.show({
            text: this.$t('translations.settings.saveSuccess'),
            type: 'success',
            duration: 3000
          })
        })
    },
    setLanguageAndCountry () {
      if (!this.selectedCountry) return
      this.loadingData = true
      setTimeout(() => {
        this.switchAppLanguage(this.selectedLanguage)
          .then(() => {
            if (this.selectedCountry !== this.getSelectedCountry) {
              this.switchCountrySelection(this.selectedCountry)
              localStorage.removeItem('sitChart')
            }
            this.switchAppearance(this.selectedAppearance)
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
    },
    setAppearance (value) {
      this.selectedAppearance = value
    }
  }
}
</script>

<style scoped lang="scss">
  .settings {
    padding: 1rem;
    height: 100%;

    .container {
      width: 100%;
      max-width: 580px;
    }

    .language-select {
      width: 100%;
      max-width: 580px;
    }

    .change-info {
      padding: 1rem;
    }

    label {
      display: block;
      padding-bottom: 0.25rem;
      padding-left: 0.5rem;
      font-weight: bold;
    }
  }
</style>
