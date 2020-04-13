import { getDataFromUrl } from "~/utils/getData.js"
import { objectFromPath, switchFormatFunctions, setNestedObjectFromPath } from '~/utils/utils.js'

import axios from 'axios'

export default function ({ store, app, redirect }) {

  let log = store.state.log
  let baseUrl = store.state.data.backendApi
  let promisesArray = []
  let callableFrom = [ 'url', 'static' ]

  log && console.log('\n-MW- getDataInit / app : ', app)


  // STORE DATASETS
  let hasInitdData = store.state.data.initData 

  if (!hasInitdData) {

    log && console.log('\n-MW- getDataInit / !hasInitdData ...')

    let dataToStoreAtInitList = store.state.data.defaultDataSetup.initData.store
    // log && console.log('-MW- getDataInit / !hasInitdData / dataToStoreAtInitList :', dataToStoreAtInitList)

    for (let dataRef of dataToStoreAtInitList ){

      log && console.log('\n-MW- getDataInit / dataRef.id :', dataRef.id)
      // log && console.log('-MW- getDataInit / dataRef :', dataRef)
      // log && console.log('-MW- getDataInit / is callable :', callableFrom.includes( dataRef.from ))

      let dataset = {
        id : dataRef.id,
        data : undefined
      } 
      
      // PROMISE FOR DATA FROM RAWOBJECT
      
      if ( dataRef.from == 'rawObject' ) {
        
        log && console.log('-MW- getDataInit / dataRef.from :', dataRef.from)

        let initDataFromObjectPromise = new Promise( (resolve, reject ) => {
          resolve( dataRef.rawObject )
        })
        .then( resp => {
          // log && console.log('-MW- getDataInit / dataset.id', dataset.id,' / res :' , resp )
          dataset.data = resp
          store.commit('data/pushToInitData', dataset)
          // COPY IT TO data/displayedData
          if ( dataRef.displayed ){
            store.commit('data/pushToDisplayedData', dataset)
          }
        })
        promisesArray.push( initDataFromObjectPromise )

      }

      // PROMISES FOR DATA FROM URL

      // if ( dataRef.from == 'url' || dataRef == 'static' ) {
      if ( callableFrom.includes( dataRef.from ) ) {

        log && console.log('-MW- getDataInit / dataRef.from :', dataRef.from)

        // GET DATA AND STORE TO data/initData
        let initDataFromUrlPromise = axios.get( dataRef.url )
        .then( resp => {
          // log && console.log('-MW- getDataInit / dataset.id', dataset.id,' / res :' , resp )
          dataset.data = resp.data
          store.commit('data/pushToInitData', dataset)
          
          // COPY IT TO data/displayedData
          if ( dataRef.displayed ){
            store.commit('data/pushToDisplayedData', dataset)
          }
          
          // COPY A SLICE TO ...
          if ( dataRef.copyTo && dataRef.copyTo.length > 0 ){
            for ( let dataCopy of dataRef.copyTo ){
              log  && console.log('\n... -MW- getDataInit / dataset.id', dataset.id,' / dataCopy.fieldToCopy :' , dataCopy.fieldToCopy )
              
              // get source data
              const sourceObject = resp.data[ dataCopy.from.objectRef ]
              const value = sourceObject && sourceObject[ dataCopy.fieldToCopy ]
              if ( dataCopy.format ) {
                value = switchFormatFunctions( value, dataCopy.format )
              }

              log  && console.log('... -MW- getDataInit / dataset.id', dataset.id,' / value :' , value )

              // get target dataset 
              let getterName, setterName 
              switch( dataCopy.toDataStore ){
                case 'displayedData' : 
                  getterName = 'data/getFromDisplayedData' ; 
                  setterName = 'data/pushToDisplayedData' ; 
                  break ; 
                case 'initData' : 
                  getterName = 'data/getFromInitData' ; 
                  setterName = 'data/pushToInitData' ; 
                break ; 
              }
              let targetData_ = store.getters[ getterName ]( dataCopy.toId ) 
              let targetData = { ...targetData_ }
              log  && console.log('... -MW- getDataInit / dataset.id', dataset.id,' / targetData (before):' , targetData )
              
              let targetDataset = targetData.data
              let modifiedData = setNestedObjectFromPath( dataCopy.toDataPath, value, targetDataset )
              targetData.data = modifiedData
              log  && console.log('... -MW- getDataInit / dataset.id', dataset.id,' / targetData (after):' , targetData )
              // store.commit( setterName , targetData )

            }
          }

        })
        promisesArray.push( initDataFromUrlPromise )
      }
      
    }
    
  }
  
  // WAIT FOR ALL PROMISES TO RETURN
  log && console.log('\n')
  return Promise.all( promisesArray )

}
