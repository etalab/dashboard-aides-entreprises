<style scoped>
.custom-min-height {
  min-height: 150px;
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

        <span 
          v-if="viewConfig.titlePreffixSpecialStoreId"
          :class="viewConfig.titlePreffixClass"
          >
          {{ getSpecialStore[viewConfig.titlePreffixSpecialStoreId] }}
        </span>

        <span v-html="viewConfig.chartTitle[locale]" />

        <span 
          v-if="viewConfig.titleSuffixSpecialStoreId"
          :class="viewConfig.titleSuffixClass"
          >
          {{ getSpecialStore[viewConfig.titleSuffixSpecialStoreId] }}
        </span>

      </div>
    </v-layout>

    <!-- DEBUG -->
    <v-layout justify-center>
      <div
        >
        <!-- v-if="canShow && localChartOptions && localSeries" -->
        localSeries : <br>
        <code>
          <pre>
            {{ localSeries }}
          </pre>
        </code>
      </div>
    </v-layout>

     <!-- CHART -->
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

    <br>

    <v-divider
      v-if="
        !(isMobileWidth && viewConfig.dividers.afterHideOnMobile) &&
          viewConfig.dividers.after
      "
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { switchFormatFunctions, splitMulti, numberToString } from "~/utils/utils.js"

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
      if (next) {
        let newSeries = this.getSeries()
        this.localSeries = newSeries && newSeries.dataSeries
        this.updateOptionsColor(newSeries.colors)
        this.updateOptionsLabels(newSeries.labels)
      }
    },
    triggerVis(next, prev) {
      this.getCanShow()
    },
    trigger(next, prev) {
      this.getCanShow()
      if (this.canShow) {
        let newSeries = this.getSeries()
        this.localSeries = newSeries && newSeries.dataSeries
        this.updateOptionsColor(newSeries.colors)
        this.updateOptionsLabels(newSeries.labels)
      }
    },
  },

  beforeMount() {
    // set up view config
    // this.log && console.log("C-ApexChart / beforeMount ... ")

    this.viewConfig = this.getLocalConfig
    this.datasetMappers = this.viewConfig.datasetMappers
    this.localChartOptions = this.datasetMappers.chartOptions
  },

  mounted() {
    this.log && console.log("\nC-ApexChart / mounted ... this.settings.id :", this.settings.id)
    this.getCanShow()
    let newSeries = this.getSeries()
    this.log && console.log("C-ApexChart / mounted ... newSeries :", newSeries)
    this.localSeries = newSeries && newSeries.dataSeries
    this.updateOptionsColor(newSeries.colors)
    this.updateOptionsLabels(newSeries.labels)
    this.updateOptionsFormatter()
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
      getFromInitData: "data/getFromInitData",
      getFromDisplayedData: "data/getFromDisplayedData",
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
      const specialStoreId = this.datasetMappers.specialStoreId
      const fromDatasetKey = this.datasetMappers.fromDatasetKey
      const seriesMappers = this.datasetMappers.seriesMappers
      const formatterOpts = this.datasetMappers.format

      const chartOptions = this.localChartOptions
      const pieChartTypes = ['donut', 'pie']

      let dataSeries = []
      let newColors = []
      let dataLabels = []

      for (let mapper of seriesMappers) {
        // get serie values
        let rawDataSerie = this.getSpecialStoreData({
          id: specialStoreId,
          key: fromDatasetKey,
          sortParams: mapper.sortDataSerieBy,
        })
        this.rawDataSerie = rawDataSerie
        // this.log && console.log('C-ApexChart / getSeries / rawDataSerie : ', rawDataSerie )
        let dataFromKey = mapper.dataFromKey
        let valuesSerie

        let settingsColors,
          colorFromKey,
          colorMatchKey,
          colorValueFromKey,
          colorFallback,
          colorsReferences

        // get colors references for x-axis
        if (mapper.buildColorsAxisX) {
          settingsColors = mapper.buildColorsAxisXsettings
          colorFromKey = settingsColors.fromKey
          colorMatchKey = settingsColors.matchKey
          colorValueFromKey = settingsColors.getValueFromKey
          colorFallback = settingsColors.fallbackColor
          // get referencial dataset from initData
          let colorsReferencesDataset = this.getFromInitData(
            settingsColors.matchWithDatasetId
          )
          colorsReferences =
            colorsReferencesDataset && colorsReferencesDataset.data
          // this.log && console.log('C-ApexChart / getSeries / colorsReferences : ', colorsReferences )
        }

        if (rawDataSerie && dataFromKey) {
          let tempSerie = []

          // 2 - get serie
          rawDataSerie.forEach((i) => {
            // this.log && console.log('\nC-ApexChart / getSeries / i : ', i )
            let value = i[dataFromKey]
            if (value && mapper.format) {
              value = switchFormatFunctions(value, mapper.format)
            }
            // if (value && formatterOpts) {
            //   this.log && console.log('\nC-ApexChart / getSeries / formatterOpts : ', formatterOpts )
            //   value = numberToString(value, formatterOpts)
            // }
            this.log && console.log('C-ApexChart / getSeries / value : ', value )

            // 2bis - rebuild categories on x-axis
            if (mapper.buildAxisCategsX) {
              let settingsAxisX = mapper.buildAxisCategsXsettings
              let categ = i[settingsAxisX.fromKey]

              if (settingsAxisX.splitBy) {
                categ = splitMulti(
                  categ,
                  settingsAxisX.splitBy,
                  settingsAxisX.splitGlue,
                  settingsAxisX.capitalize
                )
                if (categ.length <= 1) {
                  categ = categ.join("")
                }
              }
              // this.log && console.log('C-ApexChart / getSeries / categ : ', categ )
              let newValue = { x: categ, y: value }
              value = newValue
            }

            // 2ter - rebuild categories as labels
            if (mapper.buildLabels) {
              let settingsLabels = mapper.buildLabelsSettings
              let label = i[settingsLabels.fromKey]

              if (settingsLabels.splitBy) {
                label = splitMulti(
                  label,
                  settingsLabels.splitBy,
                  settingsLabels.splitGlue,
                  settingsLabels.capitalize
                )
                if (label.length <= 1) {
                  label = label.join("")
                }
              }
              this.log && console.log('C-ApexChart / getSeries / label : ', label )
              let newLabel = label
              dataLabels.push(newLabel)
            }

            // this.log && console.log('\nC-ApexChart / getSeries / value (bis) : ', value )
            tempSerie.push(value)

            // 2ter - rebuild colors on x-axis
            if (mapper.buildColorsAxisX) {
              let categCode = i[colorFromKey]
              // this.log && console.log('C-ApexChart / getSeries / categCode : ', categCode )

              // get referencial dataset
              let categColor = colorsReferences.find(
                (color) => color[colorMatchKey] == categCode
              )
              categColor = categColor
                ? categColor[colorValueFromKey]
                : colorFallback
              // this.log && console.log('C-ApexChart / getSeries / categColor : ', categColor )
              newColors.push(categColor)
            }
          })

          // this.log && console.log('\nC-ApexChart / getSeries / tempSerie : ', tempSerie )
          valuesSerie = tempSerie
        } else {
          valuesSerie = rawDataSerie
        }

        this.log && console.log('C-ApexChart / getSeries / valuesSerie (1) : ', valuesSerie )

        let dataSerie = {
          name: mapper.serieName,
          data: valuesSerie,
        }
        dataSeries.push(dataSerie)
      }

      // flatten dataSeries if chart type needs only one
      if ( pieChartTypes.includes(chartOptions.chart.type) ) {
        let dataSeriesFirst = dataSeries[0]
        dataSeries = dataSeriesFirst.data
      }
      return { dataSeries: dataSeries, colors: newColors, labels: dataLabels }
    },

    updateOptionsColor(colors) {
      if (colors.length > 0) {
        this.localChartOptions = { ...this.localChartOptions, colors: colors }
      }
    },
    updateOptionsLabels(labels) {
      if (labels.length > 0) {
        this.localChartOptions = { ...this.localChartOptions, labels: labels }
      }
    },
    updateOptionsFormatter() {
      const formatterOpts = this.datasetMappers.format
      if (formatterOpts) {
        let localChartOptions = { ...this.localChartOptions }
        localChartOptions.dataLabels.formatter = function (val, opts) {
          return numberToString(val, formatterOpts)
        }
        this.localChartOptions = localChartOptions
      }
    },

    getSpecialStoreData(params) {
      // this.log &&
      //   console.log("C-ApexChart / getSpecialStoreData / params : ", params)
      let obj = this.getFromSpecialStoreData({
        id: params.id,
        key: params.key,
        sortParams: params.sortParams,
      })
      return obj
    },
  },
}
</script>
