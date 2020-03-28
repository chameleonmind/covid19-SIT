<template>
  <div>
    <div class="row">
      <div class="col">
        <basic-input id="name"
                     name="name"
                     floating-label
                     @input="clearError"
                     label="Ime" v-model="sitData.name"/>
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
              Odaberi početak izolacije
            </div>
          </datepicker>
          <label class="floating">Početak izolacije</label>
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
          14 dana
        </basic-button>
        <basic-button :color="duration === '28' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('28')">
          28 dana
        </basic-button>
        <basic-button :color="duration === 'custom' ? 'primary' : 'outline'"
                      size="small"
                      class="m-1"
                      :disabled="!sitData.startDate"
                      @click="setDuration('custom')">
          Odabraću iz kalendara
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
                Odaberi datum kraja izolacije
              </div>
            </datepicker>
            <label class="floating">Kraj izolacije</label>
          </div>
        </div>
      </div>
    </transition>
    <div class="row">
      <div class="col">
        <p class="info p-2" :class="{'text-center px-3' : $props.centered}">
          Podaci koje ovde unosite se čuvaju samo na ovom uređaju i ne šalju se ni na jedan servis.
        </p>
      </div>
    </div>
    <div class="mt-3" :class="{'text-center' : $props.centered}">
      <basic-button color="primary" rounded @click="saveData" modifier="prevent">
        Sačuvaj
      </basic-button>
    </div>
    <transition name="fade" mode="out-in">
      <p class="error" v-if="error">Molim popunite sve podatke</p>
    </transition>
  </div>
</template>

<script>
import BasicInput from './common/basicInput'
import Datepicker from 'vuejs-datepicker'
import BasicButton from './common/basicButton'

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
      duration: ''
    }
  },
  components: {
    BasicButton,
    BasicInput,
    Datepicker
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
        this.$emit('save-data', this.sitData)
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
          text: 'Početni datum nije odabran',
          type: 'error',
          duration: 3000
        })
      }
    }
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
