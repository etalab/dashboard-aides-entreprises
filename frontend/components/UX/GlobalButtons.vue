<style scoped></style>

<template>
  <v-container
    :id="`globalButtons-${settings.id}`"
    :class="`${settings.containerClass} ${isMobileWidth ? 'py-0' : ''}`"
    :trigger="`${trigger}`"
  >
    <v-divider v-if="viewConfig.dividers.before" />

    <v-row 
      :class="`${viewConfig.btnsRowClass} ${isMobileWidth ? viewConfig.btnsRowClassMobile : ''}`"
      >
      <div
        v-for="(btn, index) in viewConfig.componentButtons"
        :id="'B-' + btn.id + '-' + index"
        :key="'B-' + btn.id + '-' + index"
      >
        <GlobalBtn :btn="btn" />
      </div>
    </v-row>

    <v-divider v-if="getLocalConfig.dividers.after" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import GlobalBtn from "~/components/UX/GlobalBtn.vue"

export default {
  name: "GlobalButtons",

  components: {
    GlobalBtn,
  },

  props: ["settings", "routeId"],

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
    this.log && console.log("C-GlobalButtons / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getDataViewConfig: "getDataViewConfig",
      // selectFromDisplayedData: "data/selectFromDisplayedData",
      getSpecialStore: "data/getSpecialStore",
      getFromSpecialStoreData: "data/getFromSpecialStoreData",
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
      let breakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },
  },

  methods: {
    ...mapActions({
      // selectFromDisplayedData : 'data/selectFromDisplayedData',
    }),
  },
}
</script>
