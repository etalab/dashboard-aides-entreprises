import { chooseBooleanMode } from "~/utils/utils.js"

export default function ({ store, route, redirect }) {
  const log = store.state.log
  log && console.log("\n", "+ ".repeat(20))
  log && console.log("-MW- getRouteConfig ... ")

  let path = route.path

  let queryLocale = route.query.locale
  let queryIframe = route.query.iframe


  // set locale if part of url
  if (queryLocale) {
    // log && console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.commit("setLocale", queryLocale)
  }

  // set locale if part of url
  if (queryIframe) {
    // log && console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.commit("setIframe", chooseBooleanMode(queryIframe))
  }

  // retrieve local route config
  // log && console.log('-MW- getRouteConfig / path : ', path)
  let currentRouteConfig = store.getters["getCurrentRouteConfig"](path)
  log &&
    console.log(
      "-MW- getRouteConfig / currentRouteConfig : ",
      currentRouteConfig
    )

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
