<template>
  <div class="statistics px-2 py-3">
    <div :class="{'app-container': getAppearance !== 'dashboard'}">
      <section class="row">
        <div class="data-card">
          <basic-card :card-title="$t('translations.home.stats.title') + ' - ' + getSelectedCountry"
                      :loading="chartLoading"
                      :loader-height="chartHeight+100+'px'">
            <basic-button slot="button"
                          color="primary"
                          size="small"
                          class="mb-1 px-3"
                          rounded
                          @click="getChartData(true)"
                          :loading="chartLoading">
              <i class="icon-refresh-ccw"></i>
            </basic-button>
            <div class="row justify-space-between">
              <div>
                <basic-button :color="chartType === 'line' ? 'secondary' : 'outline'"
                              size="small"
                              class="px-2"
                              @click="changeGraphType('line')"
                              v-tooltip="$t('translations.home.stats.lineGraph')">
                  <i class="icon-trending-up"></i>
                </basic-button>
                <basic-button :color="chartType === 'bar' ? 'secondary' : 'outline'"
                              size="small"
                              class="px-2 ml-1"
                              @click="changeGraphType('bar')"
                              v-tooltip="$t('translations.home.stats.barChart')">
                  <i class="icon-bar-chart"></i>
                </basic-button>
              </div>
              <div class="stats">
                <p class="m-0">{{$t('translations.home.stats.lastChangeDate')}} <span class="date">{{latestUpdate | formatAmericanDate}}</span>
                </p>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <line-chart v-if="chartType === 'line'" :chart-data="chartData" :options="chartOptions"
                          :height="chartHeight" ref="lineChartRef"></line-chart>
              <bar-chart v-else-if="chartType === 'bar'" :chart-data="chartData" :options="chartOptions"
                         :height="chartHeight" ref="barChartRef"></bar-chart>
            </transition>
            <div class="text-center">
              <basic-button :color="timeSpan === 30 ? 'secondary' : 'outline'"
                            size="small"
                            class="m-1 px-2"
                            rounded
                            @click="changeTimeSpan(30)">
                {{$t('translations.home.stats.30days')}}
              </basic-button>
              <basic-button :color="timeSpan === 14 ? 'secondary' : 'outline'"
                            size="small"
                            class="m-1 px-2"
                            rounded
                            @click="changeTimeSpan(14)">
                {{$t('translations.home.stats.14days')}}
              </basic-button>
              <basic-button :color="timeSpan === 7 ? 'secondary' : 'outline'"
                            size="small"
                            class="m-1 px-2"
                            rounded
                            @click="changeTimeSpan(7)">
                {{$t('translations.home.stats.7days')}}
              </basic-button>
            </div>
          </basic-card>
        </div>
      </section>
      <section class="row">
        <div class="data-card">
          <basic-card :card-title="$t('translations.stats.numbersTitle')">
            <div class="stat-numbers">
              <div class="entry">
                <h3 class="title">{{$t('translations.stats.confirmedCases')}}</h3>
                <h4 class="value">{{latestConfirmed}}</h4>
                <p class="difference">{{confirmedDiff > 0 ? '+ ' + confirmedDiff : confirmedDiff === 0 ? confirmedDiff :
                  '- ' + confirmedDiff}}</p>
              </div>
              <div class="entry">
                <h3 class="title">{{$t('translations.stats.deathCases')}}</h3>
                <h4 class="value">{{latestDeaths}}</h4>
                <p class="difference">{{deathDiff > 0 ? '+ ' + deathDiff : deathDiff === 0 ? deathDiff : '- ' +
                  deathDiff}}</p>
              </div>
              <div class="entry">
                <h3 class="title">{{$t('translations.stats.recoveredCases')}}</h3>
                <h4 class="value">{{latestRecovered}}</h4>
                <p class="difference">{{recoveredDiff > 0 ? '+ ' + recoveredDiff : recoveredDiff === 0 ? recoveredDiff :
                  '- ' + recoveredDiff}}</p>
              </div>
              <div class="entry">
                <h3 class="title">{{$t('translations.stats.percentage')}}</h3>
                <h4 class="value">{{percentageDied}}%</h4>
              </div>
            </div>
            <p class="mb-0 mt-1" slot="footer">
              {{$t('translations.stats.dataInfo')}}
              {{$t('translations.common.source')}}: <a
              href="https://corona.lmao.ninja" target="_blank">https://corona.lmao.ninja</a>
            </p>
          </basic-card>
        </div>
      </section>
      <section class="row">
        <div class="data-card">
          <info-table :table-data="tableData" :table-header="tableFields" ref="tableRef"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BasicCard from '../components/common/basicCard'
import { mapGetters } from 'vuex'
import localStorageMixin from '../mixins/localStorage'
import dataGetter from '../mixins/dataGetter'
import { parseISO, format } from 'date-fns/esm'
import BasicButton from '../components/common/basicButton'
import InfoTable from '../components/infoTable'

export default {
  name: 'Statistics',
  components: {
    BasicButton,
    BasicCard,
    BarChart: () => import('../components/barChart'),
    LineChart: () => import('../components/lineChart'),
    InfoTable
  },
  filters: {
    formatAmericanDate (value) {
      if (!value) return ''
      const splitDate = value.split('/')
      return `${splitDate[1].length === 1 ? '0' + splitDate[1] : splitDate[1]}.${splitDate[0].length === 1 ? '0' + splitDate[0] : splitDate[0]}.2020.`
    }
  },
  data () {
    return {
      chartLoading: false,
      chartType: 'line',
      chartHeight: 120,
      latestConfirmed: 0,
      latestDeaths: 0,
      latestRecovered: 0,
      latestUpdate: '',
      timeSpan: 30,
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t('translations.home.stats.confirmedCases'),
            backgroundColor: 'rgba(100,45,222, 0.75)',
            borderColor: 'rgba(100,45,222, 1)',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          },
          {
            label: this.$t('translations.home.stats.deathCases'),
            backgroundColor: 'rgba(215,80,68,0.75)',
            borderColor: 'rgba(215,80,68,1)',
            data: [],
            pointRadius: 2,
            pointHoverRadius: 8
          },
          {
            label: this.$t('translations.home.stats.recoveredCases'),
            backgroundColor: 'rgba(72,181,89,0.75)',
            borderColor: 'rgba(72,181,89,1)',
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
            display: true,
            ticks: {
              callback: (value, index, values) => {
                if (value.indexOf('/') > -1) {
                  const split = value.split('/')
                  return `${split[1].length === 1 ? '0' + split[1] : split[1]}.${split[0].length === 1 ? '0' + split[0] : split[0]}.`
                }
              }
            }
          }],
          yAxes: [{
            type: 'linear',
            display: true
          }]
        },
        legend: {
          display: true,
          labels: {
            boxWidth: 12,
            borderWidth: 1
          }
        },
        layout: {
          padding: {
            right: 10,
            bottom: 10
          }
        }
      },
      tableData: [],
      tableFields: [
        {
          name: 'date',
          sortField: 'date',
          title: this.$t('translations.stats.date'),
          callback: (value) => {
            return format(parseISO(value), 'dd.MM.yyyy')
          }
        },
        {
          name: 'confirmed',
          title: this.$t('translations.stats.confirmedCases'),
          width: '15%'
        },
        {
          name: 'deaths',
          title: this.$t('translations.stats.deathCases'),
          width: '15%'
        },
        {
          name: 'recovered',
          title: this.$t('translations.stats.recoveredCases'),
          width: '15%'
        }
      ]
    }
  },
  mounted () {
    this.getChartData()
  },
  mixins: [localStorageMixin, dataGetter],
  computed: {
    ...mapGetters('appearance', ['getAppearance']),
    ...mapGetters('country', ['getSelectedCountry']),
    confirmedDiff () {
      return this.chartData.datasets[0].data[this.chartData.datasets[0].data.length - 1] - this.chartData.datasets[0].data[this.chartData.datasets[0].data.length - 2] || 0
    },
    deathDiff () {
      return this.chartData.datasets[1].data[this.chartData.datasets[1].data.length - 1] - this.chartData.datasets[1].data[this.chartData.datasets[1].data.length - 2] || 0
    },
    recoveredDiff () {
      return this.chartData.datasets[2].data[this.chartData.datasets[2].data.length - 1] - this.chartData.datasets[2].data[this.chartData.datasets[2].data.length - 2] || 0
    },
    percentageDied () {
      return this.latestConfirmed > 0 ? (this.latestDeaths * 100 / this.latestConfirmed).toFixed(2) : 0
    }
  },
  methods: {
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

          // create table data
          this.tableData.length = 0
          Object.keys(data.timeline.cases).slice(0 - this.timeSpan).forEach((item, idx) => {
            const rawDate = Object.keys(data.timeline.cases).slice(0 - this.timeSpan)[idx].split('/')
            const date = `20${rawDate[2]}-${rawDate[0].length === 1 ? '0' + rawDate[0] : rawDate[0]}-${rawDate[1].length === 1 ? '0' + rawDate[1] : rawDate[1]}`
            const rowData = {
              date: date,
              confirmed: Object.values(data.timeline.cases).slice(0 - this.timeSpan)[idx],
              deaths: Object.values(data.timeline.deaths).slice(0 - this.timeSpan)[idx],
              recovered: Object.values(data.timeline.recovered).slice(0 - this.timeSpan)[idx]
            }

            this.tableData.push(rowData)
          })
          this.$refs.tableRef.refreshTable()
          resolve()
        } else {
          reject(new Error(this.$t('translations.common.dataUnavailable')))
        }
      })
    },
    getChartData (hardRefresh = false) {
      this.chartLoading = true
      this.getData('sitChart', `https://corona.lmao.ninja/v2/historical/${this.getSelectedCountry}`, 120, hardRefresh)
        .then(res => {
          this.transformDataForChart(res)
            .then(() => {
              this.chartLoading = false
              this.setChartHeight()
              if (this.$route.query.axisType && this.$route.query.axisType === 'logarithmic') {
                this.$set(this.chartOptions.scales.yAxes[0], 'type', 'logarithmic')
              }
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

  .statistics {
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

    .data-card {
      flex: 1 1 auto;
      padding: 0.5rem;
      max-width: 100%;
    }

    .full-card {
      flex: 1 1 100%;
      padding: 0.5rem;
      max-width: 100%;
    }

    .stat-numbers {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      .entry {
        flex: 0 0 100%;
        text-align: center;
        padding: 1rem 0;

        &:nth-child(-n+3) {
          border-bottom: 1px solid $border-alt;
        }

        .title {
          font-size: 1rem;
          margin: 0 0 0.5rem;
          color: $text-alt2;
          font-weight: normal;
        }

        .value {
          font-weight: 100;
          font-size: 4rem;
          margin: 0;
          color: $primary;
        }

        .difference {
          font-weight: bold;
          color: $text-alt2;
          margin: 0;
          font-size: 1.5rem;
        }

        @media screen and (map_get($breakpoints, 'exsm')) {
          flex: 0 0 calc(50% - 1rem);
          margin: 0 0.5rem;
          border-bottom: none;
          padding: 0.5rem 0;

          &:nth-child(-n+3) {
            border-bottom: none;
          }

          &:nth-child(-n+2) {
            border-bottom: 1px solid $border-alt;
          }

          .value {
            font-size: 3rem;
          }

          .difference {
            font-size: 1.25rem;
          }
        }

        @media screen and (map_get($breakpoints, 'sm')) {
          flex: 0 0 calc(50% - 1rem);
          border-bottom: none;
          padding: 1rem 0;
          margin: 0 0.5rem;

          &:nth-child(-n+3) {
            border-bottom: none;
          }

          &:nth-child(-n+2) {
            border-bottom: 1px solid $border-alt;
          }

          .title {
            font-size: 0.9rem !important;
          }

          .value {
            font-size: 2.5rem !important;
          }

          .difference {
            font-size: 1rem !important;
          }
        }

        @media screen and (map_get($breakpoints, 'md')) {
          flex: 0 0 calc(25% - 0.5rem);
          border-bottom: none;
          padding: 1rem 0;
          margin: 0 0.25rem;

          &:nth-child(-n+3) {
            border-bottom: none;
          }

          &:nth-child(-n+2) {
            border-bottom: none;
          }

          .title {
            font-size: 1rem !important;
          }

          .value {
            font-size: 2.5rem !important;
          }

          .difference {
            font-size: 1.5rem !important;
          }
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
    }
  }

</style>
