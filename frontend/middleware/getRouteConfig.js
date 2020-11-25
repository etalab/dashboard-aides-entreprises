import { chooseBooleanMode } from '~/utils/utils.js'

export default function ({ store, env, route, redirect }) {
  const log = store.state.log
  // log && console.log('\n', '+ '.repeat(20))
  // log && console.log('-MW- getRouteConfig ... ')

  const path = route.path
  const queryLocale = route.query.locale
  const queryIframe = route.query.iframe
  const queryNoTabs = route.query.notabs
  const queryNoMapScroll = route.query.nomapscroll
  const queryRouteId = route.query.routeId

  // set locale if part of url
  if (queryLocale) {
    // log && console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.commit('setLocale', queryLocale)
  }

  // set iframe param if part of url OR if override from env file
  const overrideIframe = env.CONFIG_APP.overrideIframe
  if (overrideIframe || queryIframe) {
    let isIframe = false
    // log && console.log('-MW- getRouteConfig / queryIframe : ', queryIframe)
    if (overrideIframe) {
      isIframe = true
    } else {
      isIframe = chooseBooleanMode(queryIframe)
    }
    store.commit('setIframe', isIframe)
  }

  // set noRouteTabs param if part of url OR if override from env file
  const overrideNoTabs = env.CONFIG_APP.overrideRoutesTabs
  if (overrideNoTabs || queryNoTabs) {
    let noRoutesTabs = false
    // log && console.log('-MW- getRouteConfig / queryNoTabs : ', queryNoTabs)
    if (overrideNoTabs) {
      noRoutesTabs = true
    } else {
      noRoutesTabs = chooseBooleanMode(queryNoTabs)
    }
    store.commit('setNoRoutesTabs', noRoutesTabs)
  }

  // set noMapScroll param if part of url OR if override from env file
  const overrideNoMapScroll = env.CONFIG_APP.overrideNopMapScroll
  if (overrideNoMapScroll || queryNoMapScroll) {
    let noMapScroll = false
    // log && console.log('-MW- getRouteConfig / queryNoMapScroll : ', queryNoMapScroll)
    if (overrideNoMapScroll) {
      noMapScroll = true
    } else {
      noMapScroll = chooseBooleanMode(queryNoMapScroll)
    }
    store.commit('maps/setNoMapScroll', noMapScroll)
  }

  // retrieve last route config
  const lastRouteConfig = store.getters.getLocalRouteConfig
  const lastRouteConfigId = lastRouteConfig && lastRouteConfig.id
  // log && console.log('-MW- getRouteConfig / lastRouteConfigId : ', lastRouteConfigId)

  // retrieve local route config
  let currentRouteConfig

  if (typeof queryRouteId !== 'undefined') {
    store.commit('SetQueryRouteId', queryRouteId)
    currentRouteConfig = store.getters.getCurrentRouteConfigById(queryRouteId)
  } else {
    store.commit('SetQueryRouteId', undefined)
    currentRouteConfig = store.getters.getCurrentRouteConfig(path)
  }
  // log && console.log('-MW- getRouteConfig / currentRouteConfig.id : ', currentRouteConfig.id)

  // reroute to error / or home if currentRouteConfig is undefined
  if (typeof currentRouteConfig === 'undefined') { redirect('/') }

  // set local route config
  else {
    // set route config
    store.commit('setLocalRouteConfig', currentRouteConfig)
    // flag need data reset if lastConfig !== currentRouteConfig
    if (lastRouteConfigId !== currentRouteConfig.id) {
      // log && console.log('-MW- getRouteConfig / lastRouteConfigId :', lastRouteConfigId)
      store.commit('toggleTriggerResetNavbarFooter')
      store.commit('setRouteNeedDataReset', true)
    } else {
      store.commit('setRouteNeedDataReset', false)
    }
  }

  // log && console.log('\n')
}
