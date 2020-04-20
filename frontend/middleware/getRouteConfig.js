export default function ({ store, route, redirect }) {
  const log = store.state.log

  let path = route.path

  let queryLocale = route.query.locale

  log && console.log("\n-MW- getRouteConfig ... ")

  // set locale if part of url
  if (queryLocale) {
    // log && console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.commit("setLocale", queryLocale)
  }

  // retrieve local route config
  // log && console.log('-MW- getRouteConfig / path : ', path)
  let currentRouteConfig = store.getters["getCurrentRouteConfig"](path)
  // log && console.log('-MW- getRouteConfig / currentRouteConfig : ', currentRouteConfig)

  // reroute to error / or home if currentRouteConfig is undefined
  if (typeof currentRouteConfig === "undefined") {
    redirect("/")
  }

  // set local route config
  else {
    store.commit("setLocalRouteConfig", currentRouteConfig)
  }

  log && console.log("\n")
}
