export default function ({ req, store, app, env }) {

  // initialize the data default values and filters if necessary

  let hasDataSetupFilters = store.state.data.filters

  if ( !hasDataSetupFilters ){

    console.log('\n-MW- initDataSetup...')

    const filtersSetup = env.CONFIG_APP.filters
    console.log( "-MW- initDataSetup / filtersSetup :", filtersSetup )
    store.commit('data/setFilters', filtersSetup)

  }

}
