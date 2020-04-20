<style scoped></style>

<template>
  <v-container
    :id="`globalButton-${settings.id}`"
    :class="`${settings.containerClass} ${isMobileWidth ? 'pb-0 mb-0' : ''}`"
    :trigger="`${trigger}`"
  >
    <!-- 
    <div>
      text- settings.id : {{ settings.id  }} test
    </div> 
    -->

    <!-- 
    <code>
      {{ viewConfig }}
    </code> 
    -->

    <v-divider v-if="viewConfig.dividers.before" />

    <v-row :class="`${viewConfig.btnsRowClass} ${isMobileWidth ? 'my-0' : ''}`">
      <!-- <div
        > -->

      <v-btn
        v-for="(btn, index) in viewConfig.componentButtons"
        :id="'B' + btn.id + index"
        :key="'B' + btn.id + index"
        :class="`${btn.btnClass}`"
        :block="btn.block"
        :icon="btn.icon"
        :outlined="btn.outlined"
        :fab="btn.fab"
        :color="btn.color"
        :large="btn.large"
        :small="btn.small"
        :dark="btn.dark"
        :tile="btn.tile"
        :rounded="btn.rounded"
        :disabled="btn.disabled"
        @click="runBtnFunctions(btn)"
      >
        {{ btn.title[locale] }}
      </v-btn>

      <!-- </div> -->
    </v-row>

    <v-divider v-if="getLocalConfig.dividers.after" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: "GlobalButton",

  components: {},

  props: ["settings"],

  data() {
    return {
      dataViewType: "globalButtons",
      viewConfig: undefined,
    }
  },

  watch: {},

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-GlobalButton / mounted ...")
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
      selectFromDisplayedData: "data/selectFromDisplayedData",
      getSpecialStore: "data/getSpecialStore",
      windowSize: "getWindowsSize",
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
      let breakpoints = ["xs", "sm"]
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },
  },

  methods: {
    ...mapActions({
      // selectFromDisplayedData : 'data/selectFromDisplayedData',
    }),

    getDisplayedData(paramsArray) {
      this.log && console.log("C-GlobalButton / getDisplayedData ...")
      let dataFromDisplayedData = this.selectFromDisplayedData(paramsArray)
      return dataFromDisplayedData
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
    },
  },
}
</script>
