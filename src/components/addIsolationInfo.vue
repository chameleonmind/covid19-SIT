<template>
  <div>
    <basic-card card-title="Podešavanja" card-icon="icon-user">
      <div class="row">
        <div class="col col-md-2">
          <basic-input id="name"
                       name="name"
                       floating-label
                       @input="clearError"
                       label="Ime" v-model="sitData.name"/>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-2 mt-3">
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
        <div class="col col-md-2 mt-3">
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
      <div class="row">
        <div class="col">
          <p class="info">
            Podaci koje ovde unosite se čuvaju samo na ovom uređaju i ne šalju se ni na jedan servis.
          </p>
        </div>
      </div>
      <div class="mt-3 text-center">
        <basic-button color="primary" rounded class="px-5 py-3" @click="saveData" modifier="prevent">
          Sačuvaj
        </basic-button>
      </div>
      <transition name="fade" mode="out-in">
        <p class="error" v-if="error">Molim popunite sve podatke</p>
      </transition>
    </basic-card>
  </div>
</template>

<script>
import BasicCard from './common/basicCard'
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
      error: false
    }
  },
  components: {
    BasicButton,
    BasicInput,
    BasicCard,
    Datepicker
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
    text-align: center;
    font-size: 0.85rem;
    padding: 1rem 0 0.5rem;
    margin: 0;

    @media screen and (map_get($breakpoints, 'md')) {
      padding: 1rem 20% 0.5rem;
    }
  }
</style>
