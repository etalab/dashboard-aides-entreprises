<style scoped></style>

<template>
  <v-btn
    v-show="canShow"
    :class="`${btn.btnClass}`"
    :block="btn.block"
    :icon="btn.icon"
    :outlined="btn.outlined"
    :fab="btn.fab"
    :color="btn.color"
    :large="isMobileWidth ? false : btn.large"
    :small="isMobileWidth ? true : btn.small"
    :dark="btn.dark"
    :tile="btn.tile"
    :rounded="btn.rounded"
    :disabled="btn.disabled"
    @click="runBtnFunctions(btn)"
  >
    {{ btn.title[locale] }}
  </v-btn>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { objectToUrlParams } from '~/utils/utils.js'

export default {
  name: "GlobalBtn",

  components: {},

  props: ["btn"],

  data() {
    return {
      canShow: true,
    }
  },

  watch: {
    trigger(next, prev) {
      this.getCanShow()
    },
    canShow(next, prev) {
      this.$store.commit("buttons/toggleBtnTrigger")
    },
  },

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-GlobalButton / mounted ...")
    this.getCanShow()
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
      routeParams: (state) => state.routeParams,
      queryRouteId: (state) => state.queryRouteId
    }),

    ...mapGetters({
      // getCurrentLocale: "getCurrentLocale",
      getSpecialStore: "data/getSpecialStore",
    }),

    isMobileWidth() {
      let breakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },
  },

  methods: {
    ...mapActions({
      // selectFromDisplayedData : 'data/selectFromDisplayedData',
    }),

    getCanShow() {
      let hideIfs = this.btn.hideIfs
      // this.log && console.log("C-GlobalBtn / canShow / this.getSpecialStore : ", this.getSpecialStore)
      let boolsArray = [true]
      if (hideIfs) {
        for (let hideIf of hideIfs) {
          let valueFromSpecialStore = this.getSpecialStore[
            hideIf.specialStoreId
          ]
          let tempBool = hideIf.value == valueFromSpecialStore
          boolsArray.push(!tempBool)
        }
      }
      let checker = boolsArray.every(Boolean)
      this.canShow = checker
    },

    runBtnFunctions(btn) {
      // this.log && console.log('C-GlobalButton / runBtnFunctions / btn : ', btn)

      for (let fn of btn.functions) {
        // this.log && console.log('C-GlobalButton / runBtnFunctions / fn.funcName : ', fn.funcName )
        let funcParams = fn.funcParams
        switch (fn.funcName) {

          case "resetStore":
            this.$store.dispatch("data/resetStore", funcParams)
            break

          case "resetMapZoom":
            this.$store.dispatch("maps/triggerResetZoom", funcParams)
            break

          case 'updateUrlPath' :
            this.updateUrlPath( funcParams ) ;
            break

          case 'cleanUrlPath' :
            this.cleanUrlPath( ) ;
            break

          case 'resetFitToPolygon' :
            this.resetFitToPolygon( ) ;
            break

          case 'resetSelectedPolygons' :
            this.resetSelectedPolygons( ) ;
            break
        }
      }
      this.$store.commit("buttons/toggleBtnTrigger")
    },

    updateUrlPath(params) {
      this.log && console.log("\nC-GlobalButton / updateUrlPath  : ", "+ ".repeat(10) )
      this.log && console.log("\nC-GlobalButton / updateUrlPath ... params : ", params )

      for (let targetParams of params.targets) {

        let targetArgs = { ...targetParams.urlArgs }
        // this.log && console.log("C-GlobalButton / updateUrlPath ... this.$store.state.data[ targetArgs.datastore ] : ", this.$store.state.data[ targetArgs.datastore ] )

        const routePath = this.$route.path
        let paramsString = objectToUrlParams(targetArgs)
        const routeIdString = this.queryRouteId ? `routeId=${this.queryRouteId}` : undefined
        if (routeIdString) {
          paramsString = routeIdString + '&' + paramsString
        }
        this.log && console.log("C-GlobalButton / updateUrlPath ... paramsString : ", paramsString )
        
        this.$store.commit("setRouteParams", paramsString)
        history.pushState(
          {},
          null,
          routePath + '?' + paramsString
        )
      }
    },

    cleanUrlPath() {
      this.$store.commit("setRouteParams", undefined)
      const routePath = this.$route.path
      // const routeIdString = this.queryRouteId ? `routeId=${this.queryRouteId}` : undefined
      history.pushState(
        {},
        null,
        routePath
      )
    },

    resetFitToPolygon() {
      this.$store.commit('maps/setFitToPolygon', undefined)
    },

    resetSelectedPolygons() {
      this.$store.commit('maps/seSelectedStateId', undefined)
    }

  },
}
</script>
