<template>
  <div>
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
        <basic-button :color="duration === '14' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('14')">
          {{$t('translations.personalInfo.14days')}}
        </basic-button>
        <basic-button :color="duration === '28' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('28')">
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
    <div class="row my-3">
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
    <div class="row">
      <div class="col">
        <p class="info p-2" :class="{'text-center px-3' : $props.centered}">
          {{$t('translations.personalInfo.info')}}
        </p>
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
      languageOptions: [
        {
          value: 'sr',
          text: 'Srpski'
        },
        {
          value: 'en',
          text: 'English'
        }
      ]
    }
  },
  components: {
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
    }
  },
  mounted () {
    if (Object.keys(this.$props.passedData).length) {
      this.sitData = this.$props.passedData
    }
  },
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
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
    }
  },
  methods: {
    saveData () {
      if (this.sitData.name && this.sitData.startDate && this.sitData.endDate) {
        const shouldRefresh = this.selectedLanguage !== this.getAppLanguage
        this.switchAppLanguage(this.selectedLanguage)
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
        }
      } else {
        this.$notification.show({
          text: this.$t('translations.personalInfo.startDateError'),
          type: 'error',
          duration: 3000
        })
      }
    },
    ...mapActions('language', ['switchAppLanguage'])
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
    font-size: 0.85rem;
    margin: 0;
  }
</style>
