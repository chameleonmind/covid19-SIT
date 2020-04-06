<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="info">
          <i class="icon-info"></i>
          {{$t('translations.personalInfo.info')}}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <basic-input id="name"
                     name="name"
                     floating-label
                     @input="clearError"
                     :label="$t('translations.personalInfo.name')"
                     v-model="sitData.name"/>
      </div>
    </div>
    <div class="row">
      <div class="col mt-3">
        <div class="relative">
          <datepicker class="custom-datepicker"
                      :class="{'active' : sitData.startDate}"
                      v-model="sitData.startDate"
                      :disabled-dates="calendarDisabledDatesStart"
                      @input="clearError"
                      clear-button>
            <div slot="beforeCalendarHeader" class="datepicker-header">
              {{$t('translations.personalInfo.startPickerDescription')}}
            </div>
          </datepicker>
          <label class="floating">{{$t('translations.personalInfo.isolationStart')}}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mt-3" :class="{'text-center' : $props.centered}">
        <basic-button :color="duration === '13' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('13')">
          {{$t('translations.personalInfo.14days')}}
        </basic-button>
        <basic-button :color="duration === '27' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('27')">
          {{$t('translations.personalInfo.28days')}}
        </basic-button>
        <basic-button :color="duration === 'custom' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('custom')">
          {{$t('translations.personalInfo.customEndDate')}}
        </basic-button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="row" v-if="duration === 'custom' || sitData.endDate">
        <div class="col mt-3">
          <div class="relative">
            <datepicker class="custom-datepicker"
                        :class="{'active' : sitData.endDate}"
                        v-model="sitData.endDate"
                        :disabled-dates="calendarDisabledDatesEnd"
                        @input="clearError"
                        clear-button>
              <div slot="beforeCalendarHeader" class="datepicker-header">
                {{$t('translations.personalInfo.endPickerDescription')}}
              </div>
            </datepicker>
            <label class="floating">{{$t('translations.personalInfo.isolationEnd')}}</label>
          </div>
        </div>
      </div>
    </transition>
    <div class="row my-3" v-if="$props.showLanguage">
      <div class="col">
        <v-select class="custom-dropdown"
                  :reduce="text => text.value"
                  label="text"
                  placeholder="Language"
                  :clearable="false"
                  :searchable="false"
                  :options="languageOptions"
                  v-model="selectedLanguage"/>
      </div>
    </div>
    <div class="row my-3" v-if="$props.showCountry">
      <div class="col">
        <v-select class="custom-dropdown"
                  :placeholder="$t('translations.personalInfo.countryPlaceholder')"
                  :clearable="true"
                  :searchable="true"
                  :options="listOfCountries"
                  v-model="selectedCountry"/>
      </div>
    </div>
    <div class="row" v-if="$props.showCountry">
      <div class="col">
        <choose-appearance @style-change="setAppearance"/>
      </div>
    </div>
    <div class="mt-3" :class="{'text-center' : $props.centered}">
      <basic-button color="primary" rounded @click="saveData" modifier="prevent">
        {{$t('translations.common.save')}}
      </basic-button>
    </div>
    <transition name="fade" mode="out-in">
      <p class="error" v-if="error">{{$t('translations.personalInfo.error')}}</p>
    </transition>
  </div>
</template>

<script>
import BasicInput from './common/basicInput'
import Datepicker from 'vuejs-datepicker'
import BasicButton from './common/basicButton'
import vSelect from 'vue-select'
import { mapGetters, mapActions } from 'vuex'
import countryList from '../dataSource/countryList'
import ChooseAppearance from './chooseAppearance'

export default {
  name: 'addIsolationInfo',
  data () {
    return {
      sitData: {
        name: '',
        startDate: '',
        endDate: ''
      },
      error: false,
      duration: '',
      selectedLanguage: '',
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
      selectedAppearance: ''
    }
  },
  components: {
    ChooseAppearance,
    BasicButton,
    BasicInput,
    Datepicker,
    vSelect
  },
  props: {
    passedData: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    centered: {
      type: Boolean,
      default: true
    },
    showLanguage: {
      type: Boolean,
      default: true
    },
    showCountry: {
      default: true
    }
  },
  mounted () {
    if (Object.keys(this.$props.passedData).length) {
      this.sitData = this.$props.passedData
    }
    this.selectedLanguage = this.getAppLanguage
    this.selectedCountry = this.getSelectedCountry
  },
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
    ...mapGetters('country', ['getSelectedCountry']),
    calendarDisabledDatesStart () {
      const today = new Date()
      today.setDate(today.getDate())
      return {
        from: today
      }
    },
    calendarDisabledDatesEnd () {
      const today = new Date()
      today.setDate(today.getDate())
      return {
        to: today
      }
    },
    listOfCountries () {
      return countryList
    }
  },
  methods: {
    setToBeginning (value) {
      const newDate = new Date(value)
      newDate.setHours(6, 0, 0, 0)
      return newDate
    },
    setToEnd (value) {
      const newDate = new Date(value)
      newDate.setHours(6, 0, 0, 0)
      return newDate
    },
    saveData () {
      if (this.sitData.name && this.sitData.startDate && this.sitData.endDate) {
        this.sitData.startDate = this.setToBeginning(this.sitData.startDate)
        this.sitData.endDate = this.setToEnd(this.sitData.endDate)
        const shouldRefresh = this.selectedLanguage !== this.getAppLanguage
        this.switchAppLanguage(this.selectedLanguage)
        this.switchCountrySelection(this.selectedCountry)
        this.switchAppearance(this.selectedAppearance)
        this.$emit('save-data', this.sitData, shouldRefresh)
      } else {
        this.error = true
      }
    },
    clearError () {
      this.error = false
    },
    setDuration (duration) {
      if (this.sitData.startDate) {
        this.duration = duration
        const startDate = new Date(this.sitData.startDate)
        if (duration !== 'custom') {
          const newDate = startDate.setDate(startDate.getDate() + duration * 1)
          this.sitData.endDate = new Date(newDate)
          this.setToEnd(this.sitData.endDate)
        }
      } else {
        this.$notification.show({
          text: this.$t('translations.personalInfo.startDateError'),
          type: 'error',
          duration: 3000
        })
      }
    },
    setAppearance (value) {
      this.selectedAppearance = value
    },
    ...mapActions('language', ['switchAppLanguage']),
    ...mapActions('country', ['switchCountrySelection']),
    ...mapActions('appearance', ['switchAppearance'])
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .error {
    margin: 1rem 0 0;
    padding: 0.15rem;
    background: $danger;
    color: $text-button;
    text-align: center;
  }

  .info {
    color: $text-alt2;
    font-size: 1rem;
    margin: 0 0 1rem;
    box-shadow: inset 0 0 0 1px $border;
    border-radius: $default-radius;
    overflow: hidden;
    position: relative;
    padding: 0.5rem 0.5rem 0.5rem 3rem;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      height: 101%;
      width: 2.5rem;
      background: $success;
    }

    i {
      position: absolute;
      left: 0.5rem;
      color: $text-button;
      font-size: 1.5rem;
      top: calc(50% - 1rem);
    }
  }
</style>
