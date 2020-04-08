export default function ({ req, store, app, env }) {

  // initialize the data default values and filters if necessary

  let log = store.state.log

  let hasDataSetupFilters = store.state.data.filters

  if ( !hasDataSetupFilters ){

    log && console.log('\n-MW- initDataSetup...')

    // const dataSource = env.CONFIG_APP.dataSource
    // const defaultDataSetup = env.CONFIG_APP.defaultDataSetup
    // const filters = env.CONFIG_APP.filters
    
    // log && console.log( "-MW- initDataSetup / dataSource :", dataSource )
    // log && console.log( "-MW- initDataSetup / defaultDataSetup :", defaultDataSetup )
    // log && console.log( "-MW- initDataSetup / filters :", filters )

    // store.commit('data/setElement', { field: "dataSource" , value : dataSource})
    // store.commit('data/setElement', { field: "defaultDataSetup" , value : defaultDataSetup})
    // store.commit('data/setElement', { field: "filters" , value : filters})

  }

}
