<style scoped>
.has-scrollbar {
  overflow-y: scroll !important;
}
</style>

<template>
  <div
    id="homepage"
    :style="`max-height:${contentWindowHeight}px;`"
  >
    <v-row
      v-for="(row, index) in routeConfig.pageRows"
      :id="'R' + index"
      :key="'R' + index"
      no-gutters
    >
      <template v-if="row.activated">
        <v-col
          v-for="(col, i) in row.columns"
          :id="'R' + index + '-C' + i"
          :key="'R' + index + '-C' + i"
          :class="`${col.colClass}`"
        >
          <template v-if="col.activated">
            <!-- {{ windowSize }} -->
            <!-- {{ contentWindowHeight }}  -->
            <!-- {{ $vuetify.breakpoint.name }} -->

            <div
              :class="`${col.hasScrollbar ? 'has-scrollbar' : ''}`"
              :style="`${
                col.hasScrollbar
                  ? 'max-height:' + contentWindowHeight + 'px'
                  : ''
              }`"
            >
              <v-row
                v-for="(colRow, iRow) in col.colRows"
                :id="'R' + index + '-C' + i + '-CR' + iRow"
                :key="'R' + index + '-C' + i + '-CR' + iRow"
                no-gutters
                :justify="colRow.justify"
                :align="colRow.align"
                :class="colRow.class"
              >
                <TextFrame
                  v-if="colRow.activated && colRow.component == 'text'"
                  :settings="colRow.settings"
                />

                <GlobalButton
                  v-if="colRow.activated && colRow.component == 'globalButton'"
                  :settings="colRow.settings"
                />

                <Numbers
                  v-if="colRow.activated && colRow.component == 'numbers'"
                  :settings="colRow.settings"
                />

                <MapboxGL
                  v-if="colRow.activated && colRow.component == 'map'"
                  :settings="colRow.settings"
                />

                <ApexChart
                  v-if="colRow.activated && colRow.component == 'apexchart'"
                  :settings="colRow.settings"
                />

                <ChartJS
                  v-if="colRow.activated && colRow.component == 'chartjs'"
                  :settings="colRow.settings"
                />

                <Table
                  v-if="colRow.activated && colRow.component == 'table'"
                  :settings="colRow.settings"
                />
              </v-row>
            </div>
          </template>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

import Filters from "~/components/DataViews/Filters.vue"

import MapboxGL from "~/components/DataViews/MapboxGL.vue"
import Numbers from "~/components/DataViews/Numbers.vue"
import ChartJS from "~/components/DataViews/ChartJS.vue"
import ApexChart from "~/components/DataViews/ApexChart.vue"
import TextFrame from "~/components/DataViews/TextFrame.vue"
import GlobalButton from "~/components/UX/GlobalButton.vue"
import Table from "~/components/DataViews/Table.vue"

export default {
  name: "Homepage",

  components: {
    Filters,
    MapboxGL,
    Numbers,
    ChartJS,
    ApexChart,
    TextFrame,
    GlobalButton,
    Table,
  },

  props: [],

  data() {
    return {
      fixed: false,
      window: {
        width: 0,
        height: 0,
      },
    }
  },

  watch: {
    getActivatedCurrentNavbarFooter(next, prev) {
      this.log &&
        console.log(
          "\nP-Homepage / watch / getActivatedCurrentNavbarFooter ... next :",
          next
        )
      this.log &&
        console.log(
          "P-Homepage / watch / getActivatedCurrentNavbarFooter ... prev :",
          prev
        )
      // this.log && console.log('P-Homepage / watch / getActivatedCurrentNavbarFooter ... this.getCurrentNavbarFooter :', this.getCurrentNavbarFooter)

      // if (typeof prev !== 'undefined'){
      let fallback = "/"
      if (next && typeof prev !== "undefined") {
        // show navbarFooter => mobile
        fallback = this.getCurrentNavbarFooter.redirectAtBreakShow.path
          ? this.getCurrentNavbarFooter.redirectAtBreakShow.path
          : "/"
      } else {
        // don't show navbarFooter => desktop
        fallback = this.getCurrentNavbarFooter.redirectAtBreakNoShow.path
          ? this.getCurrentNavbarFooter.redirectAtBreakNoShow.path
          : "/"
      }
      this.log &&
        console.log(
          "P-Homepage / watch / getActivatedCurrentNavbarFooter ... fallback :",
          fallback
        )
      this.$router.push(fallback)
      // }
    },
  },

  created() {
    this.log && console.log("P-Homepage / created ...")
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize)
  },

  mounted() {
    this.log && console.log("P-Homepage / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      backendApi: (state) => state.data.backendApi,
      filters: (state) => state.data.filters,

      initData: (state) => state.data.initData,
      data: (state) => state.data.displayedData,

      navbarHeight: (state) => state.navbar.height,
      // currentNavbarFooter : state => state.currentNavbarFooter,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      routeConfig: "getLocalRouteConfig",
      windowSize: "getWindowsSize",
      getCurrentNavbarFooter: "getCurrentNavbarFooter",
      getActivatedCurrentNavbarFooter: "getActivatedCurrentNavbarFooter",
      // isMobileWidth : 'isMobileWidth',
    }),

    contentWindowHeight() {
      let height = this.windowSize.height - this.navbarHeight
      if (
        this.getCurrentNavbarFooter &&
        this.getCurrentNavbarFooter.activated
      ) {
        height = height - this.getCurrentNavbarFooter.height
      }
      return height
    },
  },

  methods: {
    ...mapActions({
      setCurrentWindowSize: "setCurrentWindowSize",
    }),

    handleResize() {
      this.window.width = window.innerWidt
      this.window.height = window.innerHeight
      this.setCurrentWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    },
  },
}
</script>
