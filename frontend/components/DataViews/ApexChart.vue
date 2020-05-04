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
      if (next) {
        let promisesArray = []
        let newSeries = this.getSeries()
        this.localSeries = newSeries.dataSeries
        this.updateOptionsColor( newSeries.colors )
      }
    },
    triggerVis(next, prev) {
      this.getCanShow()
    },
    trigger(next, prev) {
      this.getCanShow()
      if (this.canShow) {
        let newSeries = this.getSeries()
        this.localSeries = newSeries.dataSeries
        this.updateOptionsColor( newSeries.colors )
      }
    },
  },

  beforeMount() {
    // set up view config
    this.log && console.log("C-ApexChart / beforeMount ...")

    this.viewConfig = this.getLocalConfig
    this.datasetMappers = this.viewConfig.datasetMappers
    this.localChartOptions = this.datasetMappers.chartOptions
  },

  mounted() {
    this.log && console.log("C-ApexChart / mounted ...")
    this.getCanShow()
    let newSeries = this.getSeries()
    this.localSeries = newSeries.dataSeries
    this.updateOptionsColor( newSeries.colors )
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
      let specialStoreId = this.datasetMappers.specialStoreId
      let fromDatasetKey = this.datasetMappers.fromDatasetKey
      let seriesMappers = this.datasetMappers.seriesMappers

      let localChartOptions = this.localChartOptions
      let dataSeries = []
      let newColors = []

      for (let mapper of seriesMappers) {

        // get serie values
        let rawDataSerie = this.getSpecialStoreData({
          id: specialStoreId,
          key: fromDatasetKey,
          sortParams: mapper.sortDataSerieBy,
        })
        this.rawDataSerie = rawDataSerie
        // this.log && console.log('C-ApexChart / getSeries / rawDataSerie  : ', rawDataSerie )
        let dataFromKey = mapper.dataFromKey
        let valuesSerie

        let settingsColors, colorFromKey, colorMatchKey, colorValueFromKey, colorFallback, colorsReferences

        // get colors references for x-axis
        if (mapper.buildColorsAxisX) {
          // this.log && console.log('C-ApexChart / getSeries /localChartOptions : ',localChartOptions )
          settingsColors = mapper.buildColorsAxisXsettings
          colorFromKey = settingsColors.fromKey
          colorMatchKey = settingsColors.matchKey
          colorValueFromKey = settingsColors.getValueFromKey
          colorFallback = settingsColors.fallbackColor
          // get referencial dataset from initData
          let colorsReferencesDataset = this.getFromInitData(
            settingsColors.matchWithDatasetId
          )
          colorsReferences = colorsReferencesDataset && colorsReferencesDataset.data
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
            // this.log && console.log('C-ApexChart / getSeries / value : ', value )

            // 2bis - rebuild categories on x-axis
            if (mapper.buildAxisCategsX) {
              let settings = mapper.buildAxisCategsXsettings
              let categ = i[settings.fromKey]

              if (settings.splitBy) {
                categ = splitMulti(categ, settings.splitBy, settings.splitGlue, settings.capitalize)
                if (categ.length <= 1) {
                  categ = categ.join("")
                }
              }
              // this.log && console.log('C-ApexChart / getSeries / categ : ', categ )
              let newValue = { x: categ, y: value }
              value = newValue
            }
            tempSerie.push(value)

            // 2ter - rebuild colors on x-axis
            if (mapper.buildColorsAxisX) {
              // this.log && console.log('C-ApexChart / getSeries / localChartOptions : ',localChartOptions )
              let categCode = i[colorFromKey]
              // this.log && console.log('C-ApexChart / getSeries / categCode : ', categCode )

              // get referencial dataset
              let categColor = colorsReferences.find( color => color[ colorMatchKey ] == categCode )
              categColor = categColor ? categColor[ colorValueFromKey ] : colorFallback
              // this.log && console.log('C-ApexChart / getSeries / categColor : ', categColor )
              newColors.push( categColor )
              
            }

          })

          valuesSerie = tempSerie
          // if (mapper.buildColorsAxisX) {
          //   localChartOptions.colors = newColors
          // }

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

      return { dataSeries: dataSeries, colors: newColors }
    },

    updateOptionsColor( colors ) {
      if ( colors.length > 0) {
        this.localChartOptions = { ...this.localChartOptions, colors: colors}
      }
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

  },
}
</script>
