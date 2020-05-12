import { updateDataStore, setMapZoom } from '~/utils/utilsStore.js'

export default function ({ store, route }) {
  const log = store.state.log
  log && console.log('\n', '+ '.repeat(20))
  log && console.log('-MW- setRouteViews / ... ')

  const currentRouteConfig = store.getters.getLocalRouteConfig
  log && console.log('-MW- setRouteViews / currentRouteConfig :', currentRouteConfig)

  // GET ROUTE PARAMS IF ANY IN ROUTE && ROUTE_CONNFIG
  const setUpRouteViews = currentRouteConfig.setUpRouteViews
  if (setUpRouteViews) {
    log && console.log('-MW- setRouteViews / setUpRouteViews :', setUpRouteViews)

    // BUILD URL PARAMS
    var urlParams = {}
    for (const p of setUpRouteViews.urlArgs) {
      urlParams[p] = route.query[p]
    }
    log && console.log('-MW- setRouteViews / urlParams :', urlParams)

    // LOOP FUNCTIONS TO RUN FOR THIS ROUTE
    for (const fn of setUpRouteViews.functions) {
      log && console.log('-MW- setRouteViews / fn.funcName :', fn.funcName)

      switch (fn.funcName) {
        case 'updateDataStore':
          updateDataStore(urlParams, fn.funcParams, store, log)
          break
        case 'goToPolygon':
          setMapZoom(urlParams, fn.funcParams, store, log)
          break
      }
    }
  }

  log && console.log('\n')
}
