// import { ... } from '~/utils/'
// import { findElementFromArrayAndId } from '~/utils/utils'

export const state = () => ({
  // GLOABAL APP ENV
  appVersion: process.env.CONFIG_APP.appVersion,
  log: process.env.LOG,

  locale: undefined,
  locales: undefined,

  appTitle: undefined,

  isIframe: false,
  windowSize: {
    width: 0,
    height: 0
  },

  // BREAKPOINTS
  breakpoint: {
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1264,
      lg: 1904
    }
    // scrollBarWidth: 24,
  },

  // NAVBAR - on basis vuetify create-nuxt-app
  navbar: undefined,

  currentNavbarFooter: undefined,
  currentFooter: undefined,
  triggerResetNavbarFooter: 1,

  // ROUTES
  routesTabs: undefined,
  noRoutesTabs: false,
  configRoutes: undefined,
  localRouteConfig: undefined,
  routeNeedDataReset: true,
  queryRouteId: undefined,

  // UX-UI
  configUX: undefined,
  configUI: undefined,

  // DATA VIEWS COMPONENTS SETTINGS
  configsData: {
    maps: undefined,
    charts: undefined,
    numbers: undefined,
    tables: undefined,
    texts: undefined,
    rawdatas: undefined,
    navbarFooters: undefined,
    globalButtons: undefined
  },

  divsVisibility: [],
  triggerVisChange: 1
})

export const getters = {
  // INTERNATIONALIZATION
  getDefaultLocale: () => {
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale: (state, getters) => {
    return state.locale ? state.locale : getters.getDefaultLocale
  },

  // ROUTES
  getRoutesTabs: (state) => {
    return state.routesTabs
  },
  getLocalRouteConfig: (state) => {
    return state.localRouteConfig
  },
  getCurrentRouteConfigById: (state) => (routeId) => {
    try {
      return state.configRoutes.find(function (r) {
        return r.id === routeId
      })
    } catch (e) {
      state.log && console.log('err', e)
      return undefined
    }
  },
  getCurrentRouteConfig: (state) => (currentRoute) => {
    try {
      return state.configRoutes.find(function (r) {
        return r.urls.includes(currentRoute)
      })
    } catch (e) {
      state.log && console.log('err', e)
      return undefined
    }
  },
  getRouteNeedDataReset: (state) => {
    return state.routeNeedDataReset
  },
  getQueryRouteId: (state) => {
    return state.queryRouteId
  },

  // DIVS VISIBILITY
  getDivVisibilityArray: (state) => {
    return state.divsVisibility
  },
  getDivVisibility: (state) => (div) => {
    const divObject = state.divsVisibility.find((d) => {
      return d.id === div.id && d.routeId === div.routeId
    })
    return divObject
  },
  getDivCurrentVisibility: (state, getters) => (div) => {
    try {
      // state.log && console.log("S-index-G-getDivCurrentVisibility / div : ", div )
      const breakpoint = div.breakpoint
      // state.log && console.log("S-index-G-getDivCurrentVisibility / breakpoint : ", breakpoint )

      const divObject = getters.getDivVisibility(div.div)
      // state.log && console.log("S-index-G-getDivCurrentVisibility / divObject : ", divObject )

      const mobileBreakpoints = state.configUX.mobileBreakpoints
      // state.log && console.log("S-index-G-getDivCurrentVisibility / mobileBreakpoints : ", mobileBreakpoints )

      if (mobileBreakpoints.includes(breakpoint)) {
        return divObject.isVisibleMobile
      } else {
        return divObject.isVisibleDesktop
      }
    } catch (e) {
      return false
    }
  },

  // CONFIGS
  getDataViewConfig: (state) => ({ dataViewType, id }) => {
    // state.log && console.log("S-index-G-getDataViewConfig / dataViewType : ", dataViewType)
    // state.log && console.log("S-index-G-getDataViewConfig / id : ", id)

    const dataTypeConfigs = state.configsData[dataViewType]
    // state.log && console.log("S-index-G-getDataViewConfig / dataTypeConfigs : ", dataTypeConfigs)

    const result = dataTypeConfigs && dataTypeConfigs.find((d) => d.id === id)

    if (result && typeof result.copySettingsFrom !== 'undefined') {
      for (const refSetting of result.copySettingsFrom) {
        const settingsToCopy = dataTypeConfigs.find(
          (r) => r.id === refSetting.copyFromId
        )
        for (const field of refSetting.fieldsToCopy) {
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
    const thresholds = state.breakpoint.thresholds
    let breakpointName = 'md'
    // state.log && console.log("S-index-G-getCurrentBreakpoint / width : ", width)
    if (width < thresholds.xs) {
      breakpointName = 'xs'
    }
    if (width >= thresholds.xs && width < thresholds.sm) {
      breakpointName = 'sm'
    }
    if (width >= thresholds.sm && width < thresholds.md) {
      breakpointName = 'md'
    }
    if (width >= thresholds.md && width < thresholds.lg) {
      breakpointName = 'lg'
    }
    if (width > thresholds.lg) {
      breakpointName = 'xl'
    }
    // state.log && console.log("S-index-G-getCurrentBreakpoint / breakpointName : ", breakpointName)
    return breakpointName
  }
}

export const mutations = {
  // CONFIGS
  setRootConfigs (state, configs) {
    state.log && console.log('S-index-M-setRootConfigs / configs : ', configs)

    state.appTitle = configs.UIUX_config.appTitle

    state.routesTabs = configs.UIUX_config.UX_config.tabsRoutes
    state.configRoutes = configs.ROUTES_config.routes

    state.navbar = configs.UIUX_config.UX_config.navbar
    state.configUX = configs.UIUX_config.UX_config

    state.configUI = configs.UIUX_config.UI_config

    const configsData = {
      maps: configs.MAP_config.settingsIds,
      charts: configs.CHARTS_config.settingsIds,
      numbers: configs.NUMBERS_config.settingsIds,
      tables: configs.TABLES_config.settingsIds,
      texts: configs.TEXTS_config.settingsIds,
      rawdatas: configs.RAWDATA_config.settingsIds,
      navbarFooters: configs.UX_navbarFooters.settingsIds,
      globalButtons: configs.UX_globalButtons.settingsIds
    }
    state.log &&
      console.log('S-index-M-setRootConfigs / configsData : ', configsData)
    state.configsData = configsData
  },

  // NAVBARS
  setFromNavbar (state, value) {
    // state.log && console.log("S-index-M-setFromNavbar / value : ", value)
    state.navbar[value] = !state.navbar[value]
  },
  setCurrentNavbarFooter (state, config) {
    state.currentNavbarFooter = config
  },
  toggleNavbarFooterVisibility (state) {
    state.currentNavbarFooter.activated = !state.currentNavbarFooter.activated
  },
  setNavbarFooterVisibility (state, bool) {
    state.currentNavbarFooter.activated = bool
  },
  toggleTriggerResetNavbarFooter (state) {
    state.triggerResetNavbarFooter = state.triggerResetNavbarFooter * -1
  },

  // WINDOW SIZE
  setWindowSize (state, winSize) {
    state.windowSize = winSize
  },
  setIframe (state, isIframe) {
    state.isIframe = isIframe
  },

  // ROUTES CONFIG
  setLocalRouteConfig (state, routeConfig) {
    // state.log && console.log("S-index-M-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-index-M-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },
  setRouteNeedDataReset (state, boolean) {
    state.routeNeedDataReset = boolean
  },
  SetQueryRouteId (state, queryRouteId) {
    state.queryRouteId = queryRouteId
  },
  setNoRoutesTabs (state, noRoutesTabs) {
    state.noRoutesTabs = noRoutesTabs
  },

  // DIVS VISIBILITY
  setDivVisibility (state, divRef) {
    // state.log && console.log("S-index-M-setDivVisibility / divRef : ", divRef)
    // let isDivInArray = state.divsVisibility.find( d => {return (d.id == divRef.id) && (d.routeId == divRef.routeId) })
    const divIdx = state.divsVisibility.findIndex((d) => {
      return d.id === divRef.id && d.routeId === divRef.routeId
    })
    // state.log && console.log("S-index-M-setDivVisibility / divIdx : ", divIdx)
    if (divIdx > -1) {
      state.divsVisibility[divIdx] = divRef
      // isDivInArray = divRef
    } else {
      state.divsVisibility.push(divRef)
    }
  },
  toggleVisTrigger (state) {
    state.triggerVisChange = state.triggerVisChange * -1
  },

  // INTERNATIONALIZATION
  switchLocale (state, localeObject) {
    // state.log && console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
  },

  setLocale (state, loc) {
    // state.log && console.log("S-index-M-setLocale / loc :", loc )
    state.locale = loc
  },

  initLocales (state) {
    state.log && console.log('S-index-M-initLocales ... ')

    const localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    const defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale
  }
}

export const actions = {
  setUpConfigs ({ state, commit, rootGetters }) {
    state.log && console.log('\n', '- '.repeat(20))
    state.log && console.log('S-index-A-setUpConfigs / ... ')
    const allConfigs = rootGetters['configs/getAllConfigs']
    state.log &&
      console.log('S-index-A-setUpConfigs / allConfigs :', allConfigs)
    commit('setRootConfigs', allConfigs)
  },

  setCurrentWindowSize ({ state, commit, dispatch }, windowInfos) {
    // state.log && console.log("S-index-A-setCurrentWindowSize / windowInfos.breakpointName : ", windowInfos.breakpointName)
    // set window in store
    commit('setWindowSize', windowInfos)
    // set navvbarFooter visibility
    let bool = false
    if (state.currentNavbarFooter) {
      // state.log && console.log("S-index-A-setCurrentWindowSize / bool : ", bool)
      const showOnSizes = state.currentNavbarFooter.showOnSizes
      const breakpointName = windowInfos.breakpointName
      if (showOnSizes && showOnSizes.includes(breakpointName)) {
        bool = true
      }
      commit('setNavbarFooterVisibility', bool)
    }
    // reset divs visibility to defaults if desktop
    if (
      !(state.currentNavbarFooter && state.currentNavbarFooter.activated) ||
      !bool
    ) {
      // state.log && console.log("S-index-A-setCurrentWindowSize / @ bool : ", bool)
      dispatch('setRouteDivsVisibility', windowInfos.routeConfig)
    }
  },
  setRouteDivsVisibility ({ commit }, routeConfig) {
    for (const row of routeConfig.pageRows) {
      const rowId = row.id
      for (const col of row.columns) {
        const colId = col.id
        for (const colRow of col.colRows) {
          const div = {
            routeId: routeConfig.id,
            rowId: rowId,
            colId: colId,
            id: colRow.settings.id,
            isVisibleMobile: colRow.settings.mobileIsVisibleDefault,
            isVisibleDesktop: colRow.settings.desktopIsVisibleDefault
          }
          // state.log && console.log("S-index-A-setRouteDivsVisibility / div : ", div)
          commit('setDivVisibility', div)
        }
      }
    }
  },
  toggleDivsVisibility ({ state, getters, commit }, btnConfig) {
    for (const divsToToggle of btnConfig.divsToToggle) {
      // state.log && console.log('S-index-A-toggleDivsVisibility / divsToToggle : ', divsToToggle)
      const toggle = divsToToggle.toggle
      const toggleVisibility = divsToToggle.toggleVisibility

      for (const div of divsToToggle.divIds) {
        const divRef = {
          id: div,
          routeId: divsToToggle.routeId,
          isVisibleMobile: true,
          isVisibleDesktop: true
        }

        const isDiv = getters.getDivVisibility(divRef)

        for (const vis of toggleVisibility) {
          switch (toggle) {
            case 'on':
              divRef[vis] = true
              break
            case 'off':
              divRef[vis] = false
              break
            case 'toggle':
              divRef[vis] = !isDiv[vis]
              break
          }
        }
        commit('setDivVisibility', divRef)
      }
    }
  }
}
