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
        }
      }
      this.$store.commit("buttons/toggleBtnTrigger")
    },
  },
}
</script>
