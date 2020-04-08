// import { addOrRemove } from '~/utils/utils'


export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  // API BACKEND
  backendApi : process.env.CONFIG_APP.backendApi, 
  dataSource : process.env.CONFIG_APP.dataSource,
  defaultDataSetup : process.env.CONFIG_APP.defaultDataSetup,

  // FILTERS
  filters : process.env.CONFIG_APP.filters,
  activatedFilters : [ 
    // { 
    //   filterIndex : 'c-test/o-0',
    //   filterCode  : 'test', 
    //   optionValue : '0'
    // } 
  ],

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

  // FILTERS
  getActivatedFilters : (state) => {
    // state.log && console.log("S-data-G-getActivatedFilters ...")
    return state.activatedFilters
  },

}


export const mutations = {

  setElement (state, ElObject ){
    state[ElObject.field] = ElObject.value
  },
  
  // DATTA
  setInitData (state, value){
    if ( !state.initData ){ state.initData = {} }
    state.initData[ value.field ] = value.data
  },

  setDisplayedData (state, value){
    if ( !state.displayedData ){ state.displayedData = {} }
    state.displayedData[ value.field ] = value.data
  },

  // FILTERS
  resetFilters(state) {
    state.log && console.log("S-data-M-resetFilters ...")
    state.activatedFilters = [ ]
  },

  setActivatedFilters (state, selectedFilters) {
    state.log && console.log("S-data-M-setActivatedFilters / selectedFilters :", selectedFilters)
    state.activatedFilters = selectedFilters
  },



}




export const actions = {

  search({state, commit}) {
    // TO DO 
    state.log && console.log("S-data-A-search / ... ")
  },

  // FILTERS
  toggleFilters({state, commit, dispatch, getters}, filterTag ){

    state.log && console.log("\nS-data-A-getActivatedFilters / filterTag :", filterTag)

    const currentFilters = getters.getActivatedFilters.map( a => a )
    state.log && console.log("S-data-A-toggleFilters / currentFilters A :", currentFilters)

    // find item by FilterCode + 
    var removeIndex = currentFilters.map(function(item) { return item.filterIdx }).indexOf(filterTag.filterIdx);
    state.log && console.log("S-data-A-toggleFilters / removeIndex :", removeIndex)

    if (removeIndex != -1 ){ 
      currentFilters.splice(removeIndex, 1) 
    }
    else { 
      currentFilters.push( filterTag ) 
    }

    state.log && console.log("S-data-A-toggleFilters / currentFilters B :", currentFilters)
    commit('setActivatedFilters', currentFilters )

    // update query and search
    dispatch('search')

  },

  emptyOneFilter({state, commit, dispatch}, {filter}){

    // state.log && console.log("S-data-A-emptyOneFilter / filterItem :", filterItem)
    // const selectedFilters = new Map(getters.getSelectedFilters)
    // selectedFilters.set(filter, new Set())

    commit('setActivatedFilters', selectedFilters )
    dispatch('search')
  },

  clearFilters({commit, dispatch}) {
    // state.log && console.log("S-data-A-clearFilters / filterItem :", filterItem)
    commit('resetFilters')
    dispatch('search')
  }



}