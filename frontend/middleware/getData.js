import getDataFromUrl from "~/utils/getData.js"


export default function ({ req, store, app, redirect }) {

  let hasData = store.state.data.displayedData 

  if (!hasData) {

    console.log('\n-MW- getData...')
  
    let baseUrl = store.state.data.backendApi
    let testUrl = baseUrl + "/region"
  
    let response = getDataFromUrl( testUrl )
    response.then( resp =>
      store.commit('data/setDisplayedData', resp.data)
    )

  }

}
