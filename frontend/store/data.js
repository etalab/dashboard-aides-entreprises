// import { ... } from '~/utils/'



export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  // API BACKEND
  backendApi : process.env.CONFIG_APP.backendApi, 
  dataSource : process.env.CONFIG_APP.dataSource,
  defaultDataSetup : process.env.CONFIG_APP.defaultDataSetup,

  // FILTERS
  filters : process.env.CONFIG_APP.filters,
  activatedFilters : [],

  // DATASETS
  initData : undefined,
  displayedData : undefined,

  query: undefined,
  response : undefined,

})


export const getters = {

  // INTERNATIONALIZATION
  getBackendApi : (state, getters) => {
    // state.log && console.log("S-data-G-getBackendApi ...")
    return state.backendApi
  },

}


export const mutations = {

  setElement (state, ElObject ){
    state[ElObject.field] = ElObject.value
  },
  
  setInitData (state, value){
    if ( !state.initData ){ state.initData = {} }
    state.initData[ value.field ] = value.data
  },

  setDisplayedData (state, value){
    if ( !state.displayedData ){ state.displayedData = {} }
    state.displayedData[ value.field ] = value.data
  }

}




export const actions = {

  // setSpecValue({state, commit}, value){
  //   commit('setValue', value)
  // },


}