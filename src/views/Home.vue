<template>
  <div class="home px-2 py-3">
    <transition name="fade" mode="out-in">
      <div v-if="localData && Object.keys(localData).length && !personalInfoLoading">
        <section class="row">
          <div class="personal-data">
            <basic-card
              :card-title="`${$t('translations.home.daysProgress.hello')} ${getAppLanguage === 'en' ? $options.filters.firstName(localData.name) : $options.filters.nameFilter(localData.name)}!`"
              card-icon="icon-user"
              :loading="personalInfoLoading">
              <div class="days-progress">
                <days-progress :days-passed="diffToToday" :max-days="daysDifference"/>
                <div class="progress-info">
                  <p>{{$t('translations.home.daysProgress.start')}} <span>{{localData.startDate | formatDate}}</span>
                  </p>
                  <p>{{$t('translations.home.daysProgress.end')}} <span>{{localData.endDate | formatDate}}</span></p>
                  <p>{{$t('translations.home.daysProgress.elapsedTime')}}
                    <span>{{daysDifference - diffToToday > 0 ? startDayDiffToToday : endDayDiffToToday}}</span>
                  </p>
                </div>
              </div>
            </basic-card>
          </div>
          <div class="useful-info">
            <basic-card :card-title="$t('translations.home.usefulInfo.title')" card-icon="icon-info">
              <useful-info/>
            </basic-card>
          </div>
        </section>
        <section class="row">
          <div class="graph-data">
            <basic-card :card-title="$t('translations.home.stats.title') + ' - ' + getSelectedCountry" card-icon="icon-trending-up"
                        :loading="chartLoading"
                        :loader-height="chartHeight+100+'px'">
              <template v-if="chartData.datasets[0].data.length">
                <div class="row justify-space-between">
                  <div>
                    <basic-button :color="chartType === 'line' ? 'secondary' : 'outline'"
                                  size="xsm"
                                  class="px-2"
                                  @click="changeGraphType('line')"
                                  v-tooltip="$t('translations.home.stats.lineGraph')">
                      <i class="icon-trending-up"></i>
                    </basic-button>
                    <basic-button :color="chartType === 'bar' ? 'secondary' : 'outline'"
                                  size="xsm"
                                  class="px-2 ml-1"
                                  @click="changeGraphType('bar')"
                                  v-tooltip="$t('translations.home.stats.barChart')">
                      <i class="icon-bar-chart"></i>
                    </basic-button>
                  </div>
                  <div class="stats">
                    <p class="m-0">{{$t('translations.home.stats.lastChangeDate')}} <span class="date">{{latestUpdate | formatAmericanDate}}</span>
                    </p>
                    <p class="m-0">{{$t('translations.home.stats.latestData')}} <span class="confirmed">{{latestConfirmed}}</span>/<span
                      class="deaths">{{latestDeaths}}</span>/<span class="recovered">{{latestRecovered}}</span></p>
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
                                @click="changeTimeSpan(60)">
                    {{$t('translations.home.stats.60days')}}
                  </basic-button>
                  <basic-button :color="timeSpan === 30 ? 'secondary' : 'outline'"
                                size="xsm"
                                class="m-1 px-2"
                                rounded
                                @click="changeTimeSpan(30)">
                    {{$t('translations.home.stats.30days')}}
                  </basic-button>
                  <basic-button :color="timeSpan === 14 ? 'secondary' : 'outline'"
                                size="xsm"
                                class="m-1 px-2"
                                rounded
                                @click="changeTimeSpan(14)">
                    {{$t('translations.home.stats.14days')}}
                  </basic-button>
                  <basic-button :color="timeSpan === 7 ? 'secondary' : 'outline'"
                                size="xsm"
                                class="m-1 px-2"
                                rounded
                                @click="changeTimeSpan(7)">
                    {{$t('translations.home.stats.7days')}}
                  </basic-button>
                </div>
              </template>
              <div class="no-chart-data" v-else>
                <h4 class="m-0">{{$t('translations.common.noData')}}</h4>
              </div>
              <p class="mb-0 mt-1" slot="footer">{{$t('translations.common.source')}}: <a
                href="https://corona.lmao.ninja" target="_blank">https://corona.lmao.ninja</a>
              </p>
            </basic-card>
          </div>
        </section>
        <div class="row">
          <div class="p-2">
            <basic-card :card-title="$t('translations.home.measures.title')" card-icon="icon-alert-octagon">
              <recommendations/>
              <div slot="footer" class="row justify-space-between">
                <p class="m-0">{{$t('translations.common.source')}}: <a
                  href="http://rs.n1info.com/Zdravlje/a576624/Pravilna-primena-mera-zastite-od-koronavirusa.html"
                  target="_blank">N1</a></p>
                <p class="m-0">{{$t('translations.common.icons')}}: <a
                  href="https://www.iconfinder.com/iconpai"
                  target="_blank">iconpai</a></p>
              </div>
            </basic-card>
          </div>
        </div>
        <div class="row" v-if="getAppLanguage === 'sr'">
          <div class="p-2">
            <basic-card card-title="Na snazi je vanredno stanje" card-icon="icon-alert-triangle" icon-color="#d75044">
              <precautionary-measures/>
              <p slot="footer" class="m-0">{{$t('translations.common.source')}}: <a
                href="http://rs.n1info.com/Vesti/a578399/Mere-tokom-vanrednog-stanja.html"
                target="_blank">N1</a></p>
            </basic-card>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col col-md-2 col-no-grow ml-auto mr-auto mt-3">
          <basic-card :card-title="$t('translations.personalInfo.title')" card-icon="icon-user">
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
import localStorageMixin from '../mixins/localStorage'
import { differenceInDays, parseISO, format } from 'date-fns/esm'
import measures from '../dataSource/measures.js'
import dataGetter from '../mixins/dataGetter'
import BasicButton from '../components/common/basicButton'
import { mapGetters } from 'vuex'

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
      latestRecovered: 0,
      latestUpdate: '',
      timeSpan: 60,
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t('translations.home.stats.confirmedCases'),
            backgroundColor: 'rgba(100,45,222, 0.75)',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          },
          {
            label: this.$t('translations.home.stats.deathCases'),
            backgroundColor: 'rgba(215,80,68,0.75)',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          },
          {
            label: this.$t('translations.home.stats.recoveredCases'),
            backgroundColor: 'rgba(72,181,89,0.75)',
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
    firstName (name) {
      if (!name) return ''
      return name.split(' ')[0]
    },
    formatAmericanDate (value) {
      if (!value) return ''
      const splitDate = value.split('/')
      return splitDate[1] + '.' + splitDate[0] + '.' + '2020.'
    }
  },
  components: {
    Recommendations: () => import('../components/recommendations'),
    BarChart: () => import('../components/barChart'),
    BasicButton,
    UsefulInfo: () => import('../components/usefulInfo'),
    LineChart: () => import('../components/lineChart'),
    precautionaryMeasures: () => import('../components/precautionaryMeasures'),
    AddIsolationInfo: () => import('../components/addIsolationInfo'),
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
    ...mapGetters('language', ['getAppLanguage']),
    ...mapGetters('country', ['getSelectedCountry']),
    daysDifference () {
      return differenceInDays(parseISO(this.localData.endDate), parseISO(this.localData.startDate)) + 1 || 0
    },
    diffToToday () {
      const today = new Date()
      return differenceInDays(today, parseISO(this.localData.startDate))
    },
    startDayDiffToToday () {
      const today = new Date()
      const diff = differenceInDays(today, parseISO(this.localData.startDate))
      return diff !== 1 ? diff + ` ${this.$t('translations.home.daysProgress.days')}` : diff + ` ${this.$t('translations.home.daysProgress.days')}`
    },
    endDayDiffToToday () {
      const today = new Date()
      const diff = differenceInDays(parseISO(this.localData.endDate), today)
      if (diff > 0) {
        return this.$t('translations.home.daysProgress.still') + diff + (diff !== 1 ? ` ${this.$t('translations.home.daysProgress.days')}` : ` ${this.$t('translations.home.daysProgress.days')}`)
      } else if (diff === 0) {
        return this.$t('translations.home.daysProgress.days')
      }
      return (diff * -1) + (diff !== 1 ? ` ${this.$t('translations.home.daysProgress.daysMore')} ` : ` ${this.$t('translations.home.daysProgress.dayMore')}`)
    },
    recommendedMeasures () {
      return measures
    }
  },
  methods: {
    saveData (payload, shouldRefresh = false) {
      this.saveDataToLocalStorage(payload)
        .then(() => {
          if (shouldRefresh) {
            location.reload()
          } else {
            this.getDataFromLocalStorage()
              .then(res => {
                this.personalInfoLoading = false
                this.localData = res
                this.getChartData()
              })
          }
        })
        .catch((e) => {
          // console.log(e)
        })
    },
    transformDataForChart (data) {
      return new Promise((resolve, reject) => {
        if (data.timeline && data.timeline.cases) {
          this.chartData.labels = Object.keys(data.timeline.cases).slice(0 - this.timeSpan)
          this.chartData.datasets[0].data = Object.values(data.timeline.cases).slice(0 - this.timeSpan)
          this.chartData.datasets[1].data = Object.values(data.timeline.deaths).slice(0 - this.timeSpan)
          this.chartData.datasets[2].data = Object.values(data.timeline.recovered).slice(0 - this.timeSpan)

          this.latestConfirmed = Object.values(data.timeline.cases)[Object.values(data.timeline.cases).length - 1] || 0
          this.latestDeaths = Object.values(data.timeline.deaths)[Object.values(data.timeline.deaths).length - 1] || 0
          this.latestRecovered = Object.values(data.timeline.recovered)[Object.values(data.timeline.recovered).length - 1] || 0
          this.latestUpdate = Object.keys(data.timeline.cases)[Object.keys(data.timeline.cases).length - 1] || '-'
          resolve()
        } else {
          reject(new Error(this.$t('translations.common.dataUnavailable')))
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
      this.getData('sitChart', `https://corona.lmao.ninja/v2/historical/${this.getSelectedCountry}`, 720)
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
        .catch(e => {
          this.chartLoading = false
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

    .recovered {
      font-weight: bold;
      color: #48b559;
    }
  }

  .no-chart-data {
    padding: 3rem 0;
    text-align: center;
    color: $text-alt2;
  }
</style>
