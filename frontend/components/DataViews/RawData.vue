<style scoped></style>

<template>
  <v-container
    v-show="canShow"
    :id="`rawdata-${settings.id}`"
    :class="``"
    :trigger="`${trigger}`"
  >
    <v-layout> RawData- settings.id : {{ settings.id }} </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "RawData",

  components: {},

  props: ["settings"],

  data() {
    return {
      dataViewType: "rawdatas",
      viewConfig: undefined,
    }
  },

  watch: {},

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-RawData / mounted ...")
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

  methods: {},
}
</script>
