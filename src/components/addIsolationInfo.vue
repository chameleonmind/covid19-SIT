<template>
  <div>
    <basic-card card-title="Podešavanja">
      <div class="row">
        <div class="col col-md-2">
          <basic-input id="name"
                       name="name"
                       floating-label
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
                        clear-button>
              <div slot="beforeCalendarHeader" class="datepicker-header">
                Odaberi datum kraja izolacije
              </div>
            </datepicker>
            <label class="floating">Kraj izolacije</label>
          </div>
        </div>
      </div>
      <div class="mt-3 text-center">
        <basic-button color="primary" class="px-5 py-3" @click="saveData" modifier="prevent">
          Sačuvaj
        </basic-button>
      </div>
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
      }
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
      console.log('this.sitData', this.sitData)
      this.$emit('save-data', this.sitData)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
