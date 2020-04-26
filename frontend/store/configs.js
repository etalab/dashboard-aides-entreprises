export const state = () => ({
  log: process.env.LOG,

  configsFrom: undefined,
  configsAreSet: false,
  vuetifyThemeIsSet: false,

  configAppUIUX: undefined,
  configAppRoutes: undefined,
  configAppData: undefined,
  configAppMap: undefined,
  configAppCharts: undefined,
  configAppNumbers: undefined,
  configAppTexts: undefined,
  configAppTables: undefined,
  configAppRawData: undefined,
  configAppNavbarFooters: undefined,
  configAppGlobalButtons: undefined,
})

export const getters = {
  getAllConfigs: (state) => {
    let onlyConfigs = {
      UIUX_config: state.configAppUIUX,
      ROUTES_config: state.configAppRoutes,
      configAppData: state.configAppData,
      MAP_config: state.configAppMap,
      CHARTS_config: state.configAppCharts,
      NUMBERS_config: state.configAppNumbers,
      TEXTS_config: state.configAppTexts,
      TABLES_config: state.configAppTables,
      RAWDATA_config: state.configAppRawData,
      UX_navbarFooters: state.configAppNavbarFooters,
      UX_globalButtons: state.configAppGlobalButtons,
    }
    return onlyConfigs
  },
  getConfigField: (state) => (field) => {
    return state[field]
  },
}

export const mutations = {
  setConfigField(state, configRef) {
    state.log &&
      console.log("S-configs-M-setConfigField / configRef :", configRef)
    state[configRef.field] = configRef.data
  },
  setConfigsFrom(state, configsFrom) {
    state.log &&
      console.log("S-configs-M-setConfigsFrom / configsFrom :", configsFrom)
    state.configsFrom = configsFrom
  },
  setConfigsAreSet(state) {
    state.log && console.log("S-configs-M-setConfigsAreSet ...")
    state.configsAreSet = true
  },
  setVuetifyThemeIsSet(state) {
    state.log && console.log("S-configs-M-setVuetifyThemeIsSet ...")
    state.vuetifyThemeIsSet = true
  },
}

export const actions = {
  setRootConfigs({ state, dispatch }) {
    state.log && console.log("S-configs-A-setRootConfigs ...")

    // correctly set up store data @ store/index.js
    dispatch("setUpConfigs", null, { root: true })
    dispatch("data/setUpConfigData", null, { root: true })

    // flag as set up
    // commit("setConfigsAreSet")
  },
}
