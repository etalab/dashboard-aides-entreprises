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
