<style scoped>
.custom-min-height {
  min-height: 300px;
}
.hide {
  display: none;
}
</style>

<template>
  <v-container
    v-show="canShow"
    :id="`apexcharts-${settings.id}`"
    :trigger="`${trigger}`"
    :class="`${settings.containerClass}`"
    :trigger-vis="`${triggerVis}`"
  >
    <v-divider v-if="viewConfig.dividers.before" />

    <v-layout justify-center>
      <div :class="`${viewConfig.chartTitleClass}`">
        <span v-if="viewConfig.titlePreffixSpecialStoreId">
          {{ getSpecialStore[viewConfig.titlePreffixSpecialStoreId] }}
        </span>

        <span v-html="viewConfig.chartTitle[locale]" />

        <span v-if="viewConfig.titleSuffixSpecialStoreId">
          {{ getSpecialStore[viewConfig.titleSuffixSpecialStoreId] }}
        </span>
      </div>
    </v-layout>

    <v-layout justify-center :class="`custom-min-height`">
      <apexchart
        v-if="canShow && localChartOptions && localSeries"
        :ref="settings.id"
        :series="localSeries"
        :options="localChartOptions"
        :type="localChartOptions.chart.type"
        :height="localChartOptions.chart.height"
        :width="localChartOptions.chart.width"
      />
    </v-layout>

    <v-divider
      v-if="
        !(isMobileWidth && viewConfig.dividers.afterHideOnMobile) &&
          viewConfig.dividers.after
      "
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { switchFormatFunctions, sortArrayBy, splitMulti } from "~/utils/utils.js"

// ONLY DISPLAY DATA FROM data.specialStore

export default {
  name: "ApexChart",

  components: {},

  props: ["settings", "routeId"],

  data() {
    return {
      dataViewType: "charts",
      viewConfig: undefined,
      canShow: undefined,

      mappers: undefined,

      localRawSerie: undefined,
      localSeries: [],
      localChartOptions: undefined,
    }
  },

  watch: {
    canShow(next, prev) {
      // this.log && console.log("- ".repeat(10))
      // this.log && console.log("C-ApexChart / watch - canShow / next : ", next)
      if (next) {
        let promisesArray = []
        let chart = this.$refs[this.settings.id]
        this.localSeries = this.getSeries()
        // this.log && console.log("\nC-ApexChart / watch - canShow / this.localSeries : ", this.localSeries)
      }
    },
    triggerVis(next, prev) {
      // this.log && console.log("C-ApexChart / watch - triggerVis / next : ", next)
      this.getCanShow()
    },
    trigger(next, prev) {
      // this.log && console.log("C-ApexChart / watch - trigger / next : ", next)
      this.getCanShow()
      if (this.canShow) {
        this.localSeries = this.getSeries()
      }
    },
  },

  beforeMount() {
    // set up view config
    this.log && console.log("C-ApexChart / beforeMount ...")

    this.viewConfig = this.getLocalConfig
    this.datasetMappers = this.viewConfig.datasetMappers
    this.localChartOptions = this.datasetMappers.chartOptions
    this.log &&
      console.log(
        "C-ApexChart / beforeMount / this.localChartOptions : ",
        this.localChartOptions
      )
  },

  mounted() {
    this.log && console.log("C-ApexChart / mounted ...")
    // this.localSeries = this.getSeries()
    this.getCanShow()
    this.localSeries = this.getSeries()
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,
      triggerVis: (state) => state.triggerVisChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getDataViewConfig: "getDataViewConfig",
      getSpecialStore: "data/getSpecialStore",
      getFromSpecialStoreData: "data/getFromSpecialStoreData",
      windowSize: "getWindowsSize",
      getDivCurrentVisibility: "getDivCurrentVisibility",
    }),

    // config
    getLocalConfig() {
      let viewId = {
        dataViewType: this.dataViewType,
        id: this.settings.id,
      }
      let localConfig = this.getDataViewConfig(viewId)
      return localConfig
    },

    isMobileWidth() {
      let breakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },
  },

  methods: {
    getCanShow() {
      let breakpoint = this.$vuetify.breakpoint.name
      let isVisible = this.getDivCurrentVisibility({
        div: { id: this.settings.id, routeId: this.routeId },
        breakpoint: breakpoint,
      })
      this.canShow = isVisible
    },

    getSeries() {
      this.log && console.log("C-ApexChart / getSeries ... ")
      let specialStoreId = this.datasetMappers.specialStoreId
      let fromDatasetKey = this.datasetMappers.fromDatasetKey
      let seriesMappers = this.datasetMappers.seriesMappers

      let dataSeries = []

      for (let mapper of seriesMappers) {
        let rawDataSerie = this.getSpecialStoreData({
          id: specialStoreId,
          key: fromDatasetKey,
          sortParams: mapper.sortDataSerieBy,
        })
        this.rawDataSerie = rawDataSerie
        // this.log && console.log('C-ApexChart / getSeries / rawDataSerie  : ', rawDataSerie )

        let dataFromKey = mapper.dataFromKey

        let valuesSerie

        if (rawDataSerie && dataFromKey) {
          let tempSerie = []

          // 2 - get serie
          rawDataSerie.forEach((i) => {
            // this.log && console.log('C-ApexChart / getSeries / i : ', i )
            let value = i[dataFromKey]
            if (value && mapper.format) {
              value = switchFormatFunctions(value, mapper.format)
            }
            // this.log && console.log('C-ApexChart / getSeries / value : ', value )

            // 2bis - rebuild categories on xais
            if (mapper.buildAxisCategsX) {
              let settings = mapper.buildAxisCategsXsettings
              let categ = i[settings.fromKey]

              if (settings.splitBy) {
                categ = splitMulti(categ, settings.splitBy)
                if (categ.length <= 1) {
                  categ = categ.join("")
                }
              }

              // this.log && console.log('C-ApexChart / getSeries / categ : ', categ )
              let newValue = { x: categ, y: value }
              value = newValue
            }
            tempSerie.push(value)
          })

          valuesSerie = tempSerie
        } else {
          valuesSerie = rawDataSerie
        }

        // this.log && console.log('C-ApexChart / getSeries / valuesSerie (1) : ', valuesSerie )

        let dataSerie = {
          name: mapper.serieName,
          data: valuesSerie,
        }
        dataSeries.push(dataSerie)
      }
      this.log &&
        console.log("C-ApexChart / getSeries / dataSeries : ", dataSeries)
      // this.log && console.log('C-ApexChart / getSeries / this.localChartOptions : ', this.localChartOptions )
      // this.log && console.log('C-ApexChart / getSeries / this.$refs[ this.settings.id ] : ', this.$refs[ this.settings.id ] )

      // this.localSeries = dataSeries
      return dataSeries
    },

    getSpecialStoreData(params) {
      this.log &&
        console.log("C-ApexChart / getSpecialStoreData / params : ", params)
      let obj = this.getFromSpecialStoreData({
        id: params.id,
        key: params.key,
        sortParams: params.sortParams,
      })
      return obj
    },

    updateSeries(dataset) {
      this.localSeries = dataset
    },
  },
}
</script>
