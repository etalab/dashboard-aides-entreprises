<style scoped>
.stats-container {
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  box-shadow: rgb(201, 211, 223) 0px 1px 4px;
}
</style>

<template>
  <v-container
    v-show="canShow"
    :id="`charts-${settings.id}`"
    :class="``"
    :trigger="`${trigger}`"
  >
    <v-layout justify-center>
      <div :class="``">
        {{ $t(viewConfig.titleI18n) }}
      </div>
      <!-- <div justify-center>
        <code>
          {{ viewConfig }}
        </code>
      </div> -->
    </v-layout>

    <v-layout justify-center>
      <!-- 
      <ChartBar 
        :chart-data="APEChartData"
        :optionsSettings=""
        >
      </ChartBar>
      -->
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import ChartBar from "~/components/DataViews/ChartBar.vue"

export default {
  name: "Chartjs",

  components: {
    ChartBar,
  },

  props: ["settings"],

  data() {
    return {
      dataViewType: "charts",
      viewConfig: undefined,

      series: undefined,
      chartOptions: undefined,
    }
  },

  watch: {},

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
    this.series = this.viewConfig.series
    this.chartOptions = this.viewConfig.chartOptions
  },

  mounted() {
    this.log && console.log("C-ApexChart / mounted ...")
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

    // stats () {
    //   return this.$store.state.stats
    // },
    // aides () {
    //   return this.$store.state.aides
    // },
    // charts () {
    //   return this.$store.state.charts
    // },
    // APEChartData () {
    //   return {
    //     labels: this.charts.ape.labels,
    //     datasets: [
    //       {
    //         yAxisID: 'montants',
    //         label: 'Montant',
    //         backgroundColor: '#004192',
    //         data: this.charts.ape.montants
    //       }, {
    //         yAxisID: 'nombres',
    //         label: 'Nombre',
    //         backgroundColor: '#D1335B',
    //         data: this.charts.ape.nombres
    //       }
    //     ]
    //   }
    // }
  },

  methods: {},
}
</script>
