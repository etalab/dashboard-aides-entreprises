
export default function ({ store, route, redirect }) {
  
  const log = store.state.log 

  let path = route.path

  let queryLocale = route.query.locale

  // set locale if part of url
  if ( queryLocale ){
    log && console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.commit('setLocale', queryLocale )
  }

  log && console.log('-MW- getRouteConfig / path : ', path)
  let currentRouteConfig = store.getters['getCurrentRouteConfig'](path)
  // log && console.log('-MW- getRouteConfig / currentRouteConfig : ', currentRouteConfig)

  // reroute to error if currentRouteConfig is undefined
  if ( typeof currentRouteConfig === 'undefined' ){
    redirect('/')
  }

  // set local route config
  else {
    store.commit('setLocalRouteConfig', currentRouteConfig)
  }

  log && console.log('\n')

}