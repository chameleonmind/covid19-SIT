<template>
  <div class="home px-2 py-3">
    <transition name="fade" mode="out-in">
      <div v-if="localData && Object.keys(localData).length && !personalInfoLoading">
        <section class="row">
          <div class="personal-data">
            <basic-card :card-title="`Zdravo ${$options.filters.nameFilter(localData.name)}`" card-icon="icon-user"
                        :loading="personalInfoLoading">
              <div class="days-progress">
                <days-progress :days-passed="diffToToday" :max-days="daysDifference"/>
                <div class="progress-info">
                  <p>Početak: <span>{{localData.startDate | formatDate}}</span></p>
                  <p>Kraj: <span>{{localData.endDate | formatDate}}</span></p>
                  <p>Vreme: <span>{{daysDifference - diffToToday > 0 ? startDayDiffToToday : endDayDiffToToday}}</span></p>
                </div>
              </div>
            </basic-card>
          </div>
          <div class="recommendations" v-if="false">
            <basic-card card-title="Na snazi je vanredno stanje" card-icon="icon-alert-triangle" icon-color="#d75044">
              <precautionary-measures :precautions="recommendedMeasures.measures"/>
              <p class="m-0" slot="footer">Icons by: </p>
            </basic-card>
          </div>
          <div class="useful-info">
            <basic-card card-title="Korisne informacije" card-icon="icon-info">
              <useful-info/>
            </basic-card>
          </div>
        </section>
        <section class="row">
          <div class="graph-data">
            <basic-card card-title="Broj slučajeva" card-icon="icon-trending-up" :loading="chartLoading" :loader-height="chartHeight+100+'px'">
              <basic-button :color="chartType === 'line' ? 'secondary' : 'outline'"
                            size="xsm"
                            class="px-2"
                            @click="changeGraphType('line')"
                            v-tooltip="'Linijski grafik'">
                <i class="icon-trending-up"></i>
              </basic-button>
              <basic-button :color="chartType === 'bar' ? 'secondary' : 'outline'"
                            size="xsm"
                            class="px-2 ml-1"
                            @click="changeGraphType('bar')"
                            v-tooltip="'Grafik sa stubićima'">
                <i class="icon-bar-chart"></i>
              </basic-button>
              <transition name="fade" mode="out-in">
                <line-chart v-if="chartType === 'line'" :chart-data="chartData" :options="chartOptions"
                            :height="chartHeight" ref="lineChartRef"></line-chart>
                <bar-chart v-else-if="chartType === 'bar'" :chart-data="chartData" :options="chartOptions"
                           :height="chartHeight" ref="barChartRef"></bar-chart>
              </transition>
              <p class="mb-0 mt-1" slot="footer">Izvor: <a href="https://corona.lmao.ninja" target="_blank">https://corona.lmao.ninja</a></p>
            </basic-card>
          </div>
        </section>
      </div>
      <div class="row" v-else>
        <div class="col col-md-2 col-no-grow ml-auto mr-auto mt-3">
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
import precautionaryMeasures from '../components/precautionaryMeasures'
import measures from '../dataSource/measures.js'
import LineChart from '../components/lineChart'
import dataGetter from '../mixins/dataGetter'
import UsefulInfo from '../components/usefulInfo'
import BasicButton from '../components/common/basicButton'
import BarChart from '../components/barChart'

export default {
  name: 'Home',
  data () {
    return {
      days: 12,
      maxDays: 14,
      localData: null,
      chartHeight: 80,
      chartType: 'line',
      personalInfoLoading: true,
      chartLoading: true,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Potvrđeni slučajevi',
            backgroundColor: 'rgba(100,45,222, 0.75)',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          },
          {
            label: 'Smrtni slučajevi',
            backgroundColor: '#d75044',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: true
          }]
        },
        legend: {
          display: true
        },
        layout: {
          padding: {
            right: 10,
            bottom: 10
          }
        }
      }
    }
  },
  mixins: [localStorageMixin, dataGetter],
  filters: {
    formatDate (value) {
      if (!value) return ''
      return format(parseISO(value), 'dd.MM.yyyy.')
    },
    nameFilter (value) {
      if (!value) return ''
      if (value.endsWith('za') || value.endsWith('ža')) {
        return value.slice(0, -1) + 'o'
      } else if (value.endsWith('ca')) {
        return value.slice(0, -1) + 'e'
      } else if (value.endsWith('a') || value.endsWith('o') || value.endsWith('e') || value.endsWith('i')) {
        return value
      } else if (value.endsWith('k')) {
        return value.slice(0, -1) + 'če'
      } else {
        return value + 'e'
      }
    }
  },
  components: {
    BarChart,
    BasicButton,
    UsefulInfo,
    LineChart,
    precautionaryMeasures,
    AddIsolationInfo,
    DaysProgress,
    BasicCard
  },
  mounted () {
    this.getDataFromLocalStorage()
      .then(res => {
        this.personalInfoLoading = false
        this.localData = res
        this.getChartData()
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
    },
    startDayDiffToToday () {
      const today = new Date()
      const diff = differenceInDays(today, parseISO(this.localData.startDate))
      return diff !== 1 ? diff + ' dana' : diff + ' dan'
    },
    endDayDiffToToday () {
      const today = new Date()
      const diff = differenceInDays(parseISO(this.localData.endDate), today)
      if (diff > 0) {
        return 'Još ' + diff + (diff !== 1 ? ' dana' : 'dan')
      } else if (diff === 0) {
        return 'Poslednji dan'
      }
      return (diff * -1) + (diff !== 1 ? ' dana više' : 'dan više')
    },
    recommendedMeasures () {
      return measures
    }
  },
  methods: {
    saveData (payload) {
      this.saveDataToLocalStorage(payload)
        .then(() => {
          this.getDataFromLocalStorage()
            .then(res => {
              this.personalInfoLoading = false
              this.localData = res
              this.getChartData()
            })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    transformDataForChart (data) {
      return new Promise((resolve, reject) => {
        if (data.timeline.cases) {
          this.chartData.labels = Object.keys(data.timeline.cases)
          this.chartData.datasets[0].data = Object.values(data.timeline.cases)
          this.chartData.datasets[1].data = Object.values(data.timeline.deaths)
          resolve()
        } else {
          reject(new Error('Could not read data'))
        }
      })
    },
    setChartHeight () {
      if (window.innerWidth < 768) {
        this.chartHeight = 180
      } else {
        this.chartHeight = 80
      }
    },
    changeGraphType (value) {
      this.chartType = value
      this.chartLoading = true
      setTimeout(() => {
        this.chartLoading = false
      }, 300)
    },
    getChartData () {
      this.chartLoading = true
      this.getData('sitChart', 'https://corona.lmao.ninja/v2/historical/Serbia', 360)
        .then(res => {
          this.transformDataForChart(res)
            .then(() => {
              this.chartLoading = false
              this.setChartHeight()
              // refresh chart
              this.$nextTick(() => {
                this.$refs.lineChartRef.refreshChart()
              })
            })
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/themes/index";

  .home {
    position: relative;
    z-index: 0;

    &::before {
      position: absolute;
      content: '';
      background: $primary;
      left: 0;
      top: calc(25vh - 1px);
      width: 100%;
      height: 12vh;
      z-index: -1;
      clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
    }

    &::after {
      position: absolute;
      content: '';
      background: $primary;
      left: 0;
      top: 0;
      width: 100%;
      height: 25vh;
      z-index: -1;
    }

    .personal-data, .recommendations, .useful-info {
      flex: 1 1 100%;
      padding: 0.5rem;
      max-width: 100%;

      @media screen and (map_get($breakpoints, 'sm')) {
        flex-basis: 50%;
        flex-grow: 0;
        max-width: 50%;
      }
    }

    .graph-data {
      flex: 1 1 100%;
      padding: 0.5rem;
      max-width: 100%;
    }
  }

  .days-progress {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (map_get($breakpoints, 'exsm')) {
      justify-content: start;
    }

    .progress-info {
      padding: 1rem 0 0 1rem;
      flex: 1 1 auto;
      color: $text-alt2;
      text-align: center;

      @media screen and (map_get($breakpoints, 'exsm')) {
        text-align: left;
      }

      span {
        font-weight: bold;
        color: $text;
      }
    }
  }
</style>
