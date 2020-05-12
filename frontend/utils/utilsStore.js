import { switchFormatFunctions } from '~/utils/utils.js'

console.log('+ + + utils/utilsStore... ')

// UTILS USING STORE AS PARAM

// - - - - - - - - - - - - - - - - - - - //
// COPY DATA
// - - - - - - - - - - - - - - - - - - - //

export function copyData (respData, store, dataRef, log) {
  // COPY A SLICE TO ...

  for (const dataCopy of dataRef.copyTo) {
    log && console.log('\n... + + + copyData :', dataCopy)
    // log  && console.log('... + + + copyData / respData :' , respData )

    // get source data
    let value = respData[dataCopy.from.objectRef]
    // log  && console.log('... + + + copyData / value :' , value )
    if (dataCopy.fieldToCopy) {
      value = value && value[dataCopy.fieldToCopy]
    }
    if (dataCopy.format) {
      value = switchFormatFunctions(value, dataCopy.format)
    }

    const targetData = {
      value: value,
      specialStoreId: dataCopy.toSpecialStore
    }

    store.dispatch('data/setNestedData', targetData)
  }
}
export function storeData (dataset, dataRef, resp, store, log) {
  // log && console.log('+ + + storeData / dataset.id', dataset.id,' / res :' , resp )
  dataset.data = resp.data
  store.commit('data/pushToInitData', dataset)

  // COPY IT TO data/displayedData
  if (dataRef.displayed) {
    store.commit('data/pushToDisplayedData', dataset)
  }

  // COPY A SLICE TO ...
  if (dataRef.copyTo && dataRef.copyTo.length > 0) {
    for (const dataCopy of dataRef.copyTo) {
      log &&
        console.log(
          '\n... + + + storeData / dataset.id : ',
          dataset.id,
          ' / dataCopy.fieldToCopy :',
          dataCopy.fieldToCopy
        )

      // get source data
      const sourceObject = resp.data[dataCopy.from.objectRef]
      let value = sourceObject
      if (dataCopy.fieldToCopy) {
        value = sourceObject && sourceObject[dataCopy.fieldToCopy]
      }
      if (dataCopy.format) {
        value = switchFormatFunctions(value, dataCopy.format)
      }
      // log  && console.log('... + + + storeData / dataset.id : ', dataset.id,' / value :' , value )

      const targetData = {
        value: value,
        specialStoreId: dataCopy.toSpecialStore
      }

      store.dispatch('data/setNestedData', targetData)
    }
  }
}

// - - - - - - - - - - - - - - - - - - - //
// UPDATE DATASET IN STORES
// - - - - - - - - - - - - - - - - - - - //

export function canRunIf (ifQuery, urlParams) {
  let canRun = true
  for (const condition of ifQuery) {
    const urlArgBool = urlParams[condition.field] === condition.val
    canRun = canRun ? urlArgBool : false
  }
  return canRun
}

export function updateDataStoreDataset (targetData, store, log) {
  log && console.log('+ + + updateDataStore / store.state.data : ', store.state.data)
  store.dispatch('data/setNestedData', targetData)
}

export function updateDataStore (urlParams, params, store, log) {
  log && console.log('\n', '+++ '.repeat(10))
  for (const targetParams of params.targets) {
    // log && console.log('+ + + updateDataStore / ifQuery : ', ifQuery)

    // 1 - get if targetParams must run given urlParams
    const canRun = canRunIf(targetParams.ifQuery, urlParams)

    if (canRun) {
      // 2 - prepare targetParams
      log && console.log('\n+ + + updateDataStore / urlParams : ', urlParams)

      targetParams.fromPropValue = urlParams.value
      log && console.log('+ + + updateDataStore / targetParams : ', targetParams)

      // 3 - get data value given the urlArgs
      // log && console.log('+ + + updateDataStore / store.state.data[targetParams.fromStoreData] : ', store.state.data[targetParams.fromStoreData])
      let data = store.getters['data/getStoreSourceData'](targetParams)
      if (targetParams.format) {
        data = switchFormatFunctions(data, targetParams.format)
      }
      log && console.log('+ + + updateDataStore / data : ', data)

      // 4 - commit value to datastore
      const targetData = {
        value: data,
        specialStoreId: targetParams.targetSpecialStoreId
      }
      log && console.log('+ + + updateDataStore / targetData : ', targetData)
      updateDataStoreDataset(targetData, store, log)
    }
  }
}
export function setMapZoom (urlParams, params, store, log) {
  log && console.log('\n+ + + setMapZoom / urlParams : ', urlParams)
  for (const targetParams of params.targets) {
    const canRun = canRunIf(targetParams.ifQuery, urlParams)
    if (canRun) {
      log && console.log('\n+ + + setMapZoom / urlParams : ', urlParams)
    }
  }
}
