import getDataFromUrl from "~/utils/getData.js"

import axios from 'axios'

export default function ({ store, app, redirect }) {

  let log = store.state.log
  let baseUrl = store.state.data.backendApi
  let promisesArray = []

  log && console.log('\n-MW- getDataInit / app : ', app)

  // STORE DATASETS - 
  let hasInitdData = store.state.data.initData 

  if (!hasInitdData) {

    log && console.log('-MW- getDataInit / !hasInitdData ...')

    let urlsListInit = store.state.data.defaultDataSetup.initData.store
    
    // log && console.log('-MW- getDataInit / !hasInitdData / urlsListInit :', urlsListInit)

    for (let dataRef of urlsListInit ){

      log && console.log('-MW- getDataInit / dataRef.id :', dataRef.id)
      
      let dataset = {
        id : dataRef.id,
      } 

      // GET DATA AND STORE TO data/initData
      let initDataPromise = axios.get( dataRef.url )
      initDataPromise.then( resp => {
        // log && console.log('-MW- getDataInit / res :' , resp )
        dataset.data = resp.data
        store.commit('data/pushToInitData', dataset)

        // COPY IT TO data/displayedData
        if ( dataRef.displayed ){
          store.commit('data/pushToDisplayedData', dataset)
        }
      })

      promisesArray.push( initDataPromise )

    }

    return Promise.all( promisesArray )

  }
  
  log && console.log('-MW- getDataInit / finished ...')

}
