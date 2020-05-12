import { copyData, storeData } from '~/utils/utilsStore.js'

import axios from 'axios'

export default function ({ store, route }) {
  const log = store.state.log
  log && console.log('\n', '+ '.repeat(20))
  log && console.log('-MW- getRouteData / ... ')

  const currentRouteConfig = store.getters.getLocalRouteConfig
  log && console.log('-MW- getRouteData / currentRouteConfig :', currentRouteConfig)

  const promisesArray = []
  const callableFrom = ['url', 'static']

  // GET ROUTE PARAMS IF ANY IN ROUTE && ROUTE_CONNFIG
  const setUpFocus = currentRouteConfig.setUpFocus
  if (setUpFocus) {
    var urlParams = {}
    log && console.log('-MW- getRouteData / setUpFocus :', setUpFocus)
    for (const p of setUpFocus.urlArgs) {
      urlParams[p] = route.query[p]
    }
    log && console.log('-MW- getRouteData / urlParams :', urlParams)
  }

  // STORE DATASETS
  const routeNeedDataReset = store.getters.getRouteNeedDataReset
  log && console.log('-MW- getRouteData / routeNeedDataReset :', routeNeedDataReset)

  if (routeNeedDataReset) {
    log && console.log('\n-MW- getRouteData / routeNeedDataReset ...')

    const currentRouteConfigDatasets = currentRouteConfig.sourcesIds
    // log && console.log('\n-MW- getRouteData / currentRouteConfigDatasets :', currentRouteConfigDatasets)

    const RoutesDataList = store.state.data.routesData.initData.store
    // log && console.log('\n-MW- getRouteData / RoutesDataList :', RoutesDataList)

    const dataToStoreAtInitList = RoutesDataList && RoutesDataList.filter(dataset => {
      return currentRouteConfigDatasets.includes(dataset.id)
    })
    // log && console.log('-MW- getRouteData / routeNeedDataReset / dataToStoreAtInitList :', dataToStoreAtInitList)

    for (const dataRef of dataToStoreAtInitList) {
      log && console.log('\n-MW- getRouteData / dataRef.id :', dataRef.id)
      // log && console.log('-MW- getRouteData / dataRef :', dataRef)
      // log && console.log('-MW- getRouteData / is callable :', callableFrom.includes( dataRef.from ))

      const dataset = {
        id: dataRef.id,
        data: undefined
      }

      // PROMISE FOR DATA FROM RAWOBJECT

      if (dataRef.from === 'rawObject') {
        log && console.log('-MW- getRouteData / dataRef.from :', dataRef.from)

        const initDataFromObjectPromise = new Promise((resolve) => {
          resolve(dataRef.rawObject)
        }).then((resp) => {
          log &&
            console.log(
              '-MW- getRouteData / dataset.id',
              dataset.id,
              ' / res :',
              resp
            )
          dataset.data = resp
          store.commit('data/pushToInitData', dataset)
          // COPY IT TO data/displayedData
          if (dataRef.displayed) {
            store.commit('data/pushToDisplayedData', dataset)
          }
          if (dataRef.copyTo && dataRef.copyTo.length > 0) {
            copyData(resp, store, dataRef, log)
          }
        })
        promisesArray.push(initDataFromObjectPromise)
      }

      // PROMISES FOR DATA FROM URL

      // if ( dataRef.from == 'url' || dataRef == 'static' ) {
      if (callableFrom.includes(dataRef.from)) {
        log && console.log('-MW- getRouteData / dataRef.from :', dataRef.from)

        // GET DATA AND STORE TO data/initData
        const initDataFromUrlPromise = axios
          .get(dataRef.url)
          .then((resp) => {
            storeData(dataset, dataRef, resp, store, log)
          })
          .catch((err) => {
            console.log(
              '-MW- getRouteData / error while loading from dataRef.url :',
              err
            )
            console.log('-MW- trying to load fro backupUrl now...')
            const backupPromises = []
            const initDataFromBackupUrlPromise = axios
              .get(dataRef.backupUrl)
              .then((resp) => {
                console.log(
                  '-MW- trying to load fro backupUrl / initDataFromBackupUrlPromise / resp : ',
                  resp
                )
                storeData(dataset, dataRef, resp, store, log)
              })
            backupPromises.push(initDataFromBackupUrlPromise)
            return Promise.all(backupPromises)
          })
        promisesArray.push(initDataFromUrlPromise)
      }
    }
  }

  // WAIT FOR ALL PROMISES TO RETURN
  log && console.log('\n')
  return Promise.all(promisesArray)
}
