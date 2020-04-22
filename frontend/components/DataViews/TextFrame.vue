<style scoped></style>

<template>
  <v-container
    v-show="canShow"
    :id="`text-${settings.id}`"
    :class="`${settings.containerClass} ${isMobileWidth ? 'py-0' : ''}`"
    :trigger="`${trigger}`"
    :triggerVis="`${triggerVis}`"
  >

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
        :class="`${col.colClass} ${isMobileWidth ? 'py-0' : ''}`"
        :cols="col.cols"
      >
        <!-- TITLE -->
        <v-layout 
          :class="`justify-center`"
        >
          
          <!-- TEXT TITLE -->
          <h3 :class="`${isMobileWidth ? 'mb-0' : ''} ${col.colTitleClass} `">
            {{ col.colTitle[locale] }}
          </h3>

          <!-- TEXT FROM DISPLAYED DATA -->
          <p :class="`${col.textClass} ${isMobileWidth ? 'mb-0 ' + col.sizeMobile : col.sizeDesktop }`">
            
            <span 
              :class="`${col.textPrefixClass}`"
              v-html="col.textPrefix[locale]" 
            />

            <span
              v-if="col.specialStoreId"
              :class="`${col.specialStoreIdClass}`"
            >
              {{ getSpecialStore[col.specialStoreId] }}
            </span>

            <span 
              :class="`${col.textSuffixClass}`"
              v-html="col.textSuffix[locale]" 
            />
          </p>
        </v-layout>

        <!-- CONTENTS -->
        <template v-if="col.textsHtml">
          <v-layout
            v-for="(txt, idx) in col.textsHtml"
            :key="idx"
            :class="`${txt.textClass}`"
          >
            <!-- TEXT FROM DISPLAYED DATA -->
            <div v-if="!txt.fromUrl[locale]">
              <p :class="`${col.textClass} ${isMobileWidth ? 'mb-0 ' + col.sizeMobile : col.sizeDesktop }`">
                <span v-if="txt.textContent" v-html="txt.textContent[locale]" />
              </p>
            </div>

            <!-- TEXT FROM DISTANT HTML FILE -->
            <div v-show="txt.fromUrl[locale]">
              <p :class="`${col.textClass} ${isMobileWidth ? 'mb-0 ' + col.sizeMobile : col.sizeDesktop }`">
                <RawHtml :template-u-r-l="txt.fromUrl[locale]" />
              </p>
            </div>
          </v-layout>
        </template>
      </v-col>
    </v-row>

    <v-divider v-if="getLocalConfig.dividers.after" />
  </v-container>
</template>

<script>
import axios from "axios"

import { mapState, mapGetters, mapActions } from "vuex"

import RawHtml from "~/components/DataViews/RawHtml.vue"

export default {
  name: "TextFrame",

  components: {
    RawHtml,
  },

  props: ["settings", "routeId"],

  data() {
    return {
      dataViewType: "texts",
      viewConfig: undefined,
      canShow: undefined,
      rawHtmls: {},
      errorHtml: "<br><br>there is an <strong> Error </strong><br><br>",
    }
  },

  watch: {
    triggerVis(next, prev){
      this.getCanShow()
    },
  },

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-TextFrame / mounted ...")
    this.getCanShow()
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,
      triggerVis: (state) => state.triggerVisChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getDataViewConfig: "getDataViewConfig",
      selectFromDisplayedData: "data/selectFromDisplayedData",
      getSpecialStore: "data/getSpecialStore",
      windowSize: "getWindowsSize",
      getDivCurrentVisibility: "getDivCurrentVisibility",
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
    getCanShow() {
      let breakpoint = this.$vuetify.breakpoint.name
      let isVisible = this.getDivCurrentVisibility( {div: {id: this.settings.id, routeId: this.routeId}, breakpoint: breakpoint})
      this.canShow = isVisible
    },
    getDisplayedData(paramsArray) {
      this.log && console.log("C-TextFrame / getDisplayedData ...")
      let dataFromDisplayedData = this.selectFromDisplayedData(paramsArray)
      return dataFromDisplayedData
    },
  },
}
</script>
