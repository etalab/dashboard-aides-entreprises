<style scoped></style>

<template>
  <v-container
    v-show="canShow"
    :id="`text-${settings.id}`"
    :class="`${settings.containerClass}`"
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

    <v-row
      v-for="(row, index) in viewConfig.componentRows"
      :id="'R' + index"
      :key="'R' + index"
    >
      <v-col
        v-for="(col, i) in row.columns"
        :id="'R' + index + '-C' + i"
        :key="'R' + index + '-C' + i"
        :class="`${col.colClass}`"
        :cols="col.cols"
      >
        <!-- TITLE -->
        <v-layout :class="`justify-center`">
          <!-- TEXT TITLE -->
          <h3 :class="`${col.colTitleClass} ${isMobileWidth ? 'mb-0' : ''}`">
            {{ col.colTitle[locale] }}
          </h3>

          <!-- TEXT FROM DISPLAYED DATA -->
          <p :class="`${col.textClass} ${isMobileWidth ? 'mb-0' : ''}`">
            <span v-html="col.textPrefix[locale]" />

            <span
              v-if="col.specialStoreId"
              :class="`${col.specialStoreIdClass}`"
            >
              {{ getSpecialStore[col.specialStoreId] }}
            </span>

            <span v-html="col.textSuffix[locale]" />
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
              <p>
                <span v-if="txt.textContent" v-html="txt.textContent[locale]" />
              </p>
            </div>

            <!-- TEXT FROM DISTANT HTML FILE -->
            <div v-show="txt.fromUrl[locale]">
              <p>
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

  props: ["settings"],

  data() {
    return {
      dataViewType: "texts",
      viewConfig: undefined,
      rawHtmls: {},
      errorHtml: "<br><br>there is an <strong> Error </strong><br><br>",
    }
  },

  watch: {},

  beforeMount() {
    // set up view config
    this.viewConfig = this.getLocalConfig
  },

  mounted() {
    this.log && console.log("C-TextFrame / mounted ...")
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
      this.log && console.log("C-TextFrame / getDisplayedData ...")
      let dataFromDisplayedData = this.selectFromDisplayedData(paramsArray)
      return dataFromDisplayedData
    },
  },
}
</script>
