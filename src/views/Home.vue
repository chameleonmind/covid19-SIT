<template>
  <div class="home px-2 py-3">
    <transition name="fade" mode="out-in">
      <div class="row" v-if="localData && Object.keys(localData).length">
        <div class="col col-no-grow col-md-2 py-2">
          <basic-card :card-title="`Zdravo ${$options.filters.nameFilter(localData.name)}`">
            <div class="days-progress">
              <days-progress :days-passed="diffToToday" :max-days="daysDifference"/>
              <div class="progress-info">
                <p>Početak izolacije: <span>{{localData.startDate | formatDate}}</span></p>
                <p>Kraj izolacije: <span>{{localData.endDate | formatDate}}</span></p>
                <p>Proteklo vreme u izolaciji: <span>{{localData.startDate | toToday}}</span></p>
              </div>
            </div>
          </basic-card>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col col-md-2 col-no-grow ml-auto mr-auto">
          <add-isolation-info @save-data="saveData"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BasicCard from '../components/common/basicCard'
import DaysProgress from '../components/daysProgress'
import AddIsolationInfo from '../components/addIsolationInfo'
import localStorageMixin from '../mixins/localStorage'
import differenceInDays from 'date-fns/differenceInCalendarDays'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export default {
  name: 'Home',
  data () {
    return {
      days: 12,
      maxDays: 14,
      localData: null
    }
  },
  mixins: [localStorageMixin],
  filters: {
    formatDate (value) {
      if (!value) return ''
      return format(parseISO(value), 'dd.MM.yyyy.')
    },
    toToday (value) {
      if (!value) return ''
      const today = new Date()
      return differenceInDays(parseISO(value), today)
    },
    nameFilter (value) {
      if (!value) return ''
      if (value.endsWith('a') || value.endsWith('o') || value.endsWith('e') || value.endsWith('i')) {
        return value
      } else if (value.endsWith('k')) {
        return value.slice(0, -1) + 'če'
      } else {
        return value + 'e'
      }
    }
  },
  components: {
    AddIsolationInfo,
    DaysProgress,
    BasicCard
  },
  mounted () {
    this.getDataFromLocalStorage()
      .then(res => {
        this.localData = res
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {
    daysDifference () {
      return differenceInDays(parseISO(this.localData.endDate), parseISO(this.localData.startDate)) || 0
    },
    diffToToday () {
      const today = new Date()
      return differenceInDays(today, parseISO(this.localData.startDate))
    }
  },
  methods: {
    saveData (payload) {
      this.saveDataToLocalStorage(payload)
        .then(() => {
          this.getDataFromLocalStorage()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/themes/index";

  .days-progress {
    display: flex;
    align-items: center;

    .progress-info {
      padding-left: 1rem;
      flex: 1 1 auto;
      color: $text-alt2;

      span {
        font-weight: bold;
        color: $text;
      }
    }
  }
</style>
