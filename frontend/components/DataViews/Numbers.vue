<style scoped></style>

<template>
  <v-container
    v-show="canShow"
    :id="`numbers-${settings.id}`"
    :class="`${settings.containerClass}`"
    :trigger="`${trigger}`"
  >
    <!-- 
    <div>
      Numbers- settings.id : {{ settings.id  }} test
    </div> 
    -->

    <v-divider v-if="viewConfig.dividers.before" />

    <v-row
      v-for="(row, index) in viewConfig.componentRows"
      :id="'R' + index"
      :key="'R' + index"
    >
      <v-col
        v-for="(col, i) in row.columns"
        :id="'R' + index + '-C' + i"
        :key="'R' + index + '-C' + i"
        :class="`${col.colClass} ${isMobileWidth ? 'py-0 my-0' : ''}`"
        :cols="col.cols"
      >
        <v-layout :class="`d-flex justify-center`">
          <!-- NUMBER TITLE -->
          <p :class="`${col.titleClass} ${isMobileWidth ? 'mb-0' : ''}`">
            <!-- {{ trigger }}
            ///  -->
            {{ col.colTitle[locale] }}
          </p>
        </v-layout>

        <v-layout :class="`d-flex justify-center`">
          <!-- NUMBER FROM DISPLAYED DATA -->
          <p :class="`${col.numberClass}`">
            <!-- <code> -->
            <!-- {{ col.specialStore }} - -->
            {{ numToString(getSpecialStore[col.specialStoreId]) }}
            {{ col.unit[locale] }}
            <!-- </code> -->
          </p>

          <!-- NUMBER LEGEND -->
          <h4 :class="``">
            {{ col.legend[locale] }}
          </h4>
        </v-layout>
      </v-col>
    </v-row>

    <!-- <code>
      specialStore[ 'nombre']  : 
      {{ getSpecialStore[ 'nombre' ] }}
    </code>  -->
    <!-- <code>
      specialStore.nombre  : 
      {{ getSpecialStore.nombre  }}
    </code>  -->

    <v-divider v-if="getLocalConfig.dividers.after" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: "Numbers",

  components: {},

  props: ["settings"],

  data() {
    return {
      dataViewType: "numbers",
      viewConfig: undefined,
    }
  },

  watch: {
    // trigger(next, prev){
    // }
  },

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-Numbers / mounted ...")
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
      this.log && console.log("C-Numbers / getDisplayedData ...")
      let dataFromDisplayedData = this.selectFromDisplayedData(paramsArray)
      return dataFromDisplayedData
    },

    numToString(data) {
      return data // .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    },
  },
}
</script>
