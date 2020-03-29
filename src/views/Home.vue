<template>
  <div class="home px-2 py-3">
    <transition name="fade" mode="out-in">
      <div v-if="localData && Object.keys(localData).length && !personalInfoLoading">
        <section class="row">
          <div class="personal-data">
            <basic-card :card-title="`Zdravo ${$options.filters.nameFilter(localData.name)}!`" card-icon="icon-user"
                        :loading="personalInfoLoading">
              <div class="days-progress">
                <days-progress :days-passed="diffToToday" :max-days="daysDifference"/>
                <div class="progress-info">
                  <p>Početak: <span>{{localData.startDate | formatDate}}</span></p>
                  <p>Kraj: <span>{{localData.endDate | formatDate}}</span></p>
                  <p>Proteklo:
                    <span>{{daysDifference - diffToToday > 0 ? startDayDiffToToday : endDayDiffToToday}}</span>
                  </p>
                </div>
              </div>
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
            <basic-card card-title="Statistika (Srbija)" card-icon="icon-trending-up" :loading="chartLoading"
                        :loader-height="chartHeight+100+'px'">
              <div class="row justify-space-between">
                <div>
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
                </div>
                <div class="stats">
                  <p class="m-0">Poslednja promena: <span class="date">{{latestUpdate | formatAmericanDate}}</span></p>
                  <p class="m-0">Poslednji podaci: <span class="confirmed">{{latestConfirmed}}</span>/<span
                    class="deaths">{{latestDeaths}}</span></p>
                </div>
              </div>
              <transition name="fade" mode="out-in">
                <line-chart v-if="chartType === 'line'" :chart-data="chartData" :options="chartOptions"
                            :height="chartHeight" ref="lineChartRef"></line-chart>
                <bar-chart v-else-if="chartType === 'bar'" :chart-data="chartData" :options="chartOptions"
                           :height="chartHeight" ref="barChartRef"></bar-chart>
              </transition>
              <div class="text-center">
                <basic-button :color="timeSpan === 60 ? 'secondary' : 'outline'"
                              size="xsm"
                              class="m-1 px-2"
                              rounded
                              @click="changeTimeSpan(60)">60 dana
                </basic-button>
                <basic-button :color="timeSpan === 30 ? 'secondary' : 'outline'"
                              size="xsm"
                              class="m-1 px-2"
                              rounded
                              @click="changeTimeSpan(30)">30 dana
                </basic-button>
                <basic-button :color="timeSpan === 14 ? 'secondary' : 'outline'"
                              size="xsm"
                              class="m-1 px-2"
                              rounded
                              @click="changeTimeSpan(14)">14 dana
                </basic-button>
                <basic-button :color="timeSpan === 7 ? 'secondary' : 'outline'"
                              size="xsm"
                              class="m-1 px-2"
                              rounded
                              @click="changeTimeSpan(7)">7 dana
                </basic-button>
              </div>
              <p class="mb-0 mt-1" slot="footer">Izvor: <a href="https://corona.lmao.ninja" target="_blank">https://corona.lmao.ninja</a>
              </p>
            </basic-card>
          </div>
        </section>
        <div class="row">
          <div class="p-2">
            <basic-card card-title="Preventivne mere zaštite od koronavirusa" card-icon="icon-alert-octagon">
              <recommendations/>
              <div slot="footer" class="row justify-space-between">
                <p class="m-0">Izvor <a
                  href="http://rs.n1info.com/Zdravlje/a576624/Pravilna-primena-mera-zastite-od-koronavirusa.html"
                  target="_blank">N1</a></p>
                <p class="m-0">Ikone: <a
                  href="https://www.iconfinder.com/iconpai"
                  target="_blank">iconpai</a></p>
              </div>
            </basic-card>
          </div>
        </div>
        <div class="row">
          <div class="p-2">
            <basic-card card-title="Na snazi je vanredno stanje" card-icon="icon-alert-triangle" icon-color="#d75044">
              <precautionary-measures/>
              <p slot="footer" class="m-0">Izvor <a
                href="http://rs.n1info.com/Vesti/a578399/Mere-tokom-vanrednog-stanja.html"
                target="_blank">N1</a></p>
            </basic-card>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col col-md-2 col-no-grow ml-auto mr-auto mt-3">
          <basic-card card-title="Podešavanja" card-icon="icon-user">
            <add-isolation-info @save-data="saveData"/>
          </basic-card>
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
import Recommendations from '../components/recommendations'

export default {
  name: 'Home',
  data () {
    return {
      localData: null,
      chartHeight: 100,
      chartType: 'line',
      personalInfoLoading: true,
      chartLoading: true,
      latestConfirmed: 0,
      latestDeaths: 0,
      latestUpdate: '',
      timeSpan: 60,
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
            display: true
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
    nameFilter (name) {
      if (!name) return ''
      const value = name.split(' ')[0]
      if (value.endsWith('za') || value.endsWith('ža') || value.endsWith('ira')) {
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
    },
    formatAmericanDate (value) {
      if (!value) return ''
      const splitDate = value.split('/')
      return splitDate[1] + '.' + splitDate[0] + '.' + '2020.'
    }
  },
  components: {
    Recommendations,
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
        // console.log(e)
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
          // console.log(e)
        })
    },
    transformDataForChart (data) {
      return new Promise((resolve, reject) => {
        if (data.timeline.cases) {
          this.chartData.labels = Object.keys(data.timeline.cases).slice(0 - this.timeSpan)
          this.chartData.datasets[0].data = Object.values(data.timeline.cases).slice(0 - this.timeSpan)
          this.chartData.datasets[1].data = Object.values(data.timeline.deaths).slice(0 - this.timeSpan)

          this.latestConfirmed = Object.values(data.timeline.cases)[Object.values(data.timeline.cases).length - 1] || 0
          this.latestDeaths = Object.values(data.timeline.deaths)[Object.values(data.timeline.deaths).length - 1] || 0
          this.latestUpdate = Object.keys(data.timeline.cases)[Object.keys(data.timeline.cases).length - 1] || '-'
          resolve()
        } else {
          reject(new Error('Could not read data'))
        }
      })
    },
    changeTimeSpan (value) {
      this.timeSpan = value
      this.getChartData()
    },
    setChartHeight () {
      if (window.innerWidth <= 768) {
        this.chartHeight = 220
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        this.chartHeight = 160
      } else {
        this.chartHeight = 100
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
      this.getData('sitChart', 'https://corona.lmao.ninja/v2/historical/Serbia', 720)
        .then(res => {
          this.transformDataForChart(res)
            .then(() => {
              this.chartLoading = false
              this.setChartHeight()
              // refresh chart
              this.$nextTick(() => {
                if (this.$refs.lineChartRef) this.$refs.lineChartRef.refreshChart()
                if (this.$refs.barChartRef) this.$refs.barChartRef.refreshChart()
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

  .stats {
    font-size: 0.85rem;
    text-align: right;
    color: $text-alt2;

    .date {
      font-weight: bold;
      color: $text;
    }

    .confirmed {
      font-weight: bold;
      color: rgba(100, 45, 222, 0.75);
    }

    .deaths {
      font-weight: bold;
      color: $danger;
    }
  }
</style>
