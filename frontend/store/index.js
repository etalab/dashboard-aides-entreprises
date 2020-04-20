// import { ... } from '~/utils/'
// import { findElementFromArrayAndId } from '~/utils/utils'

export const state = () => ({
  // GLOABAL APP ENV
  log: process.env.LOG,

  locale: undefined,
  locales: undefined,

  appTitle: process.env.CONFIG_APP.appTitle,

  windowSize: {
    width: 0,
    height: 0,
  },

  // BREAKPOINTS
  breakpoint: {
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1264,
      lg: 1904,
    },
    // scrollBarWidth: 24,
  },

  // NAVBAR - on basis vuetify create-nuxt-app
  navbar: process.env.CONFIG_APP.UX_config.navbar,
  // navbar : {
  //   clipped     :  process.env.CONFIG_APP.navbar.clipped,
  //   drawer      :  process.env.CONFIG_APP.navbar.drawer,
  //   fixed       :  process.env.CONFIG_APP.navbar.fixed,
  //   miniVariant :  process.env.CONFIG_APP.navbar.miniVariant,
  //   right       :  process.env.CONFIG_APP.navbar.right,
  //   rightDrawer :  process.env.CONFIG_APP.navbar.rightDrawer,
  //   items       : process.env.CONFIG_APP.navbar.items,

  // },
  currentNavbarFooter: undefined,
  currentFooter: undefined,

  // ROUTES
  localRouteConfig: undefined,
  configRoutes: process.env.CONFIG_APP.ROUTES_config,

  // UX-UI
  configUX: process.env.CONFIG_APP.UX_config,
  configUI: process.env.CONFIG_APP.UI_config,

  // DATA VIEWS COMPONENTS SETTINGS
  configsData: {
    maps: process.env.CONFIG_APP.MAP_config.settingsIds,
    charts: process.env.CONFIG_APP.CHARTS_config.settingsIds,
    numbers: process.env.CONFIG_APP.NUMBERS_config.settingsIds,
    tables: process.env.CONFIG_APP.TABLES_config.settingsIds,
    texts: process.env.CONFIG_APP.TEXTS_config.settingsIds,
    rawdatas: process.env.CONFIG_APP.RAWDATA_config.settingsIds,

    // PURE UX COMPONENTS
    navbarFooters: process.env.CONFIG_APP.UX_navbarFooters.settingsIds,
    globalButtons: process.env.CONFIG_APP.UX_globalButtons.settingsIds,
  },
})

export const getters = {
  // INTERNATIONALIZATION
  getDefaultLocale: (state, getters) => {
    // state.log && console.log("S-index-G-getDefaultLocale ...")
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale: (state, getters) => {
    // state.log && console.log("S-index-G-getCurrentLocale / state.locale : ", state.locale)
    return state.locale ? state.locale : getters.getDefaultLocale
  },

  // ROUTES
  getLocalRouteConfig: (state) => {
    return state.localRouteConfig
  },

  getCurrentRouteConfig: (state) => (currentRoute) => {
    try {
      return state.configRoutes.find(function (r) {
        return r.urls.indexOf(currentRoute) !== -1
      })
    } catch (e) {
      state.log && console.log("err", e)
      return undefined
    }
  },

  // CONFIGS
  getDataViewConfig: (state) => ({ dataViewType, id }) => {
    // state.log && console.log("S-index-G-getDataViewConfig / dataViewType : ", dataViewType)
    // state.log && console.log("S-index-G-getDataViewConfig / id : ", id)

    let dataTypeConfigs = state.configsData[dataViewType]
    // state.log && console.log("S-index-G-getDataViewConfig / dataTypeConfigs : ", dataTypeConfigs)

    let result = dataTypeConfigs && dataTypeConfigs.find((d) => d.id === id)

    if (result && typeof result.copySettingsFrom !== "undefined") {
      for (let refSetting of result.copySettingsFrom) {
        let settingsToCopy = dataTypeConfigs.find(
          (r) => r.id === refSetting.copyFromId
        )
        for (let field of refSetting.fieldsToCopy) {
          result[field] = settingsToCopy[field]
        }
      }
    }

    // state.log && console.log("S-index-G-getDataViewConfig / result : ", result)

    return result
  },

  // WINDOW SIZES
  getWindowsSize: (state) => {
    return state.windowSize
  },
  getWindowContentHeight: (state) => {
    return state.windowSize.height - this.navbar.height
  },

  getCurrentNavbarFooter: (state) => {
    return state.currentNavbarFooter
  },

  getActivatedCurrentNavbarFooter: (state) => {
    return state.currentNavbarFooter && state.currentNavbarFooter.activated
  },

  getCurrentBreakpoint: (state) => (width) => {
    let thresholds = state.breakpoint.thresholds
    let breakpointName = "md"
    // state.log && console.log("S-index-G-getCurrentBreakpoint / width : ", width)
    if (width < thresholds.xs) {
      breakpointName = "xs"
    }
    if (width >= thresholds.xs && width < thresholds.sm) {
      breakpointName = "sm"
    }
    if (width >= thresholds.sm && width < thresholds.md) {
      breakpointName = "md"
    }
    if (width >= thresholds.md && width < thresholds.lg) {
      breakpointName = "lg"
    }
    if (width > thresholds.lg) {
      breakpointName = "xl"
    }
    // state.log && console.log("S-index-G-getCurrentBreakpoint / breakpointName : ", breakpointName)
    return breakpointName
  },

  // isMobileWidth: (state, getters) => {
  //   let breakpoints = [ 'xs', 'sm' ]
  //   let currentBreakpoint = getters.getCurrentBreakpoint()
  //   return breakpoints.includes( currentBreakpoint )
  // },
}

export const mutations = {
  // NAVBARS
  setFromNavbar(state, value) {
    // state.log && console.log("S-index-M-setFromNavbar / value : ", value)
    state.navbar[value] = !state.navbar[value]
  },
  setCurrentNavbarFooter(state, config) {
    state.currentNavbarFooter = config
  },
  toggleNavbarFooterVisibility(state) {
    state.currentNavbarFooter.activated = !state.currentNavbarFooter.activated
  },
  setNavbarFooterVisibility(state, bool) {
    state.currentNavbarFooter.activated = bool
  },

  // WINDOW SIZE
  setWindowSize(state, winSize) {
    state.windowSize = winSize
  },

  // ROUTES CONFIG
  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-index-M-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-index-M-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },

  // INTERNATIONALIZATION
  switchLocale(state, localeObject) {
    // state.log && console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
  },

  setLocale(state, loc) {
    // state.log && console.log("S-index-M-setLocale / loc :", loc )
    state.locale = loc
  },

  initLocales(state) {
    // state.log && console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale
  },
}

export const actions = {
  setCurrentWindowSize({ state, getters, commit }, winSize) {
    commit("setWindowSize", winSize)
    if (state.currentNavbarFooter) {
      let windowWidth = winSize.width
      let showOnSizes = state.currentNavbarFooter.showOnSizes
      let breakpointName = getters.getCurrentBreakpoint(windowWidth)

      state.log &&
        console.log(
          "S-index-A-setCurrentWindowSize / breakpointName (for NavbarFooter): ",
          breakpointName
        )

      let bool = false
      if (showOnSizes.includes(breakpointName)) {
        bool = true
      }

      state.log &&
        console.log(
          "S-index-A-setCurrentWindowSize / bool (for NavbarFooter): ",
          bool
        )
      commit("setNavbarFooterVisibility", bool)
    }
  },
}
