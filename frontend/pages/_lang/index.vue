<style scoped>
.has-scrollbar {
  overflow-y: scroll !important;
}
</style>

<template>
  <div
    :id="routeConfig.id"
    :style="`max-height:${contentWindowHeight}px;`"
    :triggerVis="`${triggerVis}`"
  >
    <!-- triggerVis: <code>{{triggerVis}}</code> -->
    <!-- getDivVisibilityArray: <br><code>{{getDivVisibilityArray}}</code> -->

    <v-row
      v-for="(row, index) in routeConfig.pageRows"
      :id="'R' + index"
      :key="'R' + index"
      :class="`odm-row`"
      no-gutters
    >
      <template v-if="row.activated">
        <v-col
          v-for="(col, i) in row.columns"
          :id="'R' + index + '-C' + i"
          :key="'R' + index + '-C' + i"
          :class="`odm-col ${col.colClass}`"
        >
          <template v-if="col.activated">
            <!-- {{ windowSize }} -->
            <!-- {{ contentWindowHeight }}  -->
            <!-- $vuetify.breakpoint.name : {{ $vuetify.breakpoint.name }}<br> -->
            <!-- $device : {{ $device }}<br> -->

            <div
              :class="`${col.hasScrollbar ? 'has-scrollbar' : ''}`"
              :style="`${
                col.hasScrollbar || isMobileWidth
                  ? 'max-height:' + contentWindowHeight() + 'px'
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
                :class="`odm-colrow odm-colrow-${colRow.component} ${colRow.class}`"
              >
                <TextFrame
                  v-if="colRow.activated && colRow.component == 'text'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
                />

                <GlobalButtons
                  v-if="colRow.activated && colRow.component == 'globalButtons'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
                />

                <Numbers
                  v-if="colRow.activated && colRow.component == 'numbers'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
                />

                <MapboxGL
                  v-if="colRow.activated && colRow.component == 'map'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
                />

                <ApexChart
                  v-if="colRow.activated && colRow.component == 'apexchart'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
                />

                <Table
                  v-if="colRow.activated && colRow.component == 'table'"
                  :settings="colRow.settings"
                  :route-id="routeConfig.id"
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

// import Filters from "~/components/DataViews/Filters.vue"

import MapboxGL from "~/components/DataViews/MapboxGL.vue"
import Numbers from "~/components/DataViews/Numbers.vue"
import ApexChart from "~/components/DataViews/ApexChart.vue"
import TextFrame from "~/components/DataViews/TextFrame.vue"
import GlobalButtons from "~/components/UX/GlobalButtons.vue"
import Table from "~/components/DataViews/Table.vue"

export default {
  name: "Homepage",

  components: {
    // Filters,
    MapboxGL,
    Numbers,
    ApexChart,
    TextFrame,
    GlobalButtons,
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
      // this.$router.push(fallback)
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

  beforeMount() {
    this.$store.dispatch("setRouteDivsVisibility", this.routeConfig)
  },

  mounted() {
    this.log && console.log("P-Homepage / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      // vuetifyThemeIsSet: (state) => state.configs.vuetifyThemeIsSet,
      // configUI: (state) => state.configUI,

      backendApi: (state) => state.data.backendApi,
      filters: (state) => state.data.filters,

      initData: (state) => state.data.initData,
      data: (state) => state.data.displayedData,

      navbarHeight: (state) => state.navbar.height,
      // currentNavbarFooter : state => state.currentNavbarFooter,
      divsVisibility: (state) => state.divsVisibility,
      triggerVis: (state) => state.triggerVisChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      routeConfig: "getLocalRouteConfig",
      windowSize: "getWindowsSize",
      getCurrentNavbarFooter: "getCurrentNavbarFooter",
      getActivatedCurrentNavbarFooter: "getActivatedCurrentNavbarFooter",
      // isMobileWidth : 'isMobileWidth',
      getDivVisibilityArray: "getDivVisibilityArray",
    }),

    isMobileWidth() {
      let breakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },
  },

  methods: {
    ...mapActions({
      setCurrentWindowSize: "setCurrentWindowSize",
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

    handleResize() {
      this.window.width = window.innerWidt
      this.window.height = window.innerHeight
      this.setCurrentWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpointName: this.$vuetify.breakpoint.name,
        isMobile: this.$device,
        routeConfig: this.routeConfig,
      })
      this.$store.commit("toggleVisTrigger")
    },
  },
}
</script>
