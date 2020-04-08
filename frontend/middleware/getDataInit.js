import getDataFromUrl from "~/utils/getData.js"


export default function ({ req, store, app, redirect }) {

  let log = store.state.log
  let baseUrl = store.state.data.backendApi

  let hasInitdData = store.state.data.initData 
  if (!hasInitdData) {

    log && console.log('\n-MW- getData / !hasInitdData ...')

    let urlsListInit = store.state.data.defaultDataSetup.initData.store
    log && console.log('-MW- getData / !hasInitdData / urlsListInit :', urlsListInit)

    for (let urlObj of urlsListInit ){

      log && console.log('-MW- getData / !hasInitdData / urlObj :', urlObj)
      let url = baseUrl + "/" + urlObj.url_suffix
  
      let response = getDataFromUrl( url )

      response.then( resp => {
        let value = { 
          field: urlObj.field,
          data : resp.data
        }
        log && console.log('-MW- getData / !hasInitdData / value :', value)
        store.commit('data/setInitData', value)
      })

    }
      
  }
    
  let hasDisplayedData = store.state.data.displayedData 
  if (!hasDisplayedData) {

    log && console.log('\n-MW- getData / !hasDisplayedData ...')
  
    let urlsListData = store.state.data.defaultDataSetup.displayedData.store
    log && console.log('-MW- getData / !hasDisplayedData / urlsListData :', urlsListData)

    for (let urlObj of urlsListData ){

      let url = baseUrl + "/" + urlObj.url_suffix
    
      let response = getDataFromUrl( url )
      response.then( resp => {
        let value = { 
          field: urlObj.field,
          data : resp.data
        }
        store.commit('data/setDisplayedData', value)
      })

    }

  }

}
