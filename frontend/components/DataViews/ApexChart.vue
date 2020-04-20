<style scoped>
.custom-min-height {
  min-height: 300px;
  min-width: 400px;
}
</style>

<template>
  <v-container
    v-show="canShow"
    :id="`apexcharts-${settings.id}`"
    :class="`${settings.containerClass}`"
    :trigger="`${trigger}`"
  >
    <v-divider v-if="viewConfig.dividers.before" />

    <v-layout justify-center>
      <!-- {{ windowSize }} -->

      <div :class="`${viewConfig.chartTitleClass}`">
        <!-- {{ trigger }}
        ///  -->
        <!-- {{ $t( viewConfig.titleI18n ) }} -->

        <span v-if="viewConfig.titlePreffixSpecialStoreId">
          {{ getSpecialStore[viewConfig.titlePreffixSpecialStoreId] }}
        </span>

        <span v-html="viewConfig.chartTitle[locale]" />
        <!-- {{ viewConfig.chartTitle[ locale ] }} -->

        <span v-if="viewConfig.titleSuffixSpecialStoreId">
          {{ getSpecialStore[viewConfig.titleSuffixSpecialStoreId] }}
        </span>
      </div>

      <!-- DEBUGGING -->
      <!-- <div justify-center>
        <code>
          localChartOptions : 
          {{ localChartOptions }}
        </code>
      </div> -->

      <!-- DEBUGGING -->
      <!-- <div justify-center>
        <code>
          localSeries : 
          {{ localSeries }}
        </code>
      </div> -->
    </v-layout>

    <!-- DEBUGGING -->
    <!-- <v-layout>
      <code>
        getSpecialStore[ 'focusObject']  : <br>
        {{ getSpecialStore[ 'focusObject' ][ 'kpi_top_10_naf' ] }}
      </code> 
    </v-layout> -->

    <v-layout justify-center :class="`custom-min-height`">
      <apexchart
        v-if="localChartOptions"
        :series="localSeries"
        :options="localChartOptions"
        :type="localChartOptions.chart.type"
        :height="localChartOptions.chart.height"
        :width="localChartOptions.chart.width"
      />
    </v-layout>

    <!-- {{ localChartOptions }} -->

    <v-divider v-if="viewConfig.dividers.after" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { switchFormatFunctions, sortArrayBy } from "~/utils/utils.js"

// ONLY DISPLAY DATA FROM data.specialStore

export default {
  name: "ApexChart",

  components: {},

  props: ["settings"],

  data() {
    return {
      dataViewType: "charts",
      viewConfig: undefined,

      mappers: undefined,

      localRawSerie: undefined,
      localSeries: undefined,
      localChartOptions: undefined,
    }
  },

  watch: {
    trigger(next, prev) {
      // this.log && console.log('C-ApexChart / watch / trigger / prev : ', prev )
      // this.log && console.log('C-ApexChart / watch / trigger / next : ', next )
      this.getSeries()
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
    // this.localSeries = this.getSeries()
    this.getSeries()
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getDataViewConfig: "getDataViewConfig",
      getSpecialStore: "data/getSpecialStore",
      getFromSpecialStoreData: "data/getFromSpecialStoreData",
      windowSize: "getWindowsSize",
      getCurrentBreakpoint: "getCurrentBreakpoint",
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

    canShow() {
      let bool = true
      let noShowArray = this.viewConfig && this.viewConfig.notShowFor
      if (noShowArray) {
        let bool = noShowArray.includes(this.getCurrentBreakpoint)
      }
      return bool
    },
  },

  methods: {
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
      this.localSeries = dataSeries
    },

    getSpecialStoreData(params) {
      // this.log && console.log('C-ApexChart / getSpecialStoreData / params : ', params )
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
