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
    { 
      filterCode  : 'test', 
      optionValue : '0'
    } 
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

  setSelectedFilters (state, {selectedFilters}) {
    // trigger re-render
    state.search.question.selectedFilters = new Map(selectedFilters)
  },



}




export const actions = {

  search({state, commit}) {
    state.log && console.log("S-data-A-search / ... ")
  },

  toggleFilters({state, commit, dispatch}, {filterCode, optionValue}){

    // state.log && console.log("S-data-A-getActivatedFilters / filterItem :", filterItem)
    const selectedFilters = new Map(state.activatedFilters)
    state.log && console.log("S-data-M-updateActivatedFilters / selectedFilters :", selectedFilters)

    const selectedValues = selectedFilters.get(filterCode)
    if(selectedValues.has(optionValue))
      selectedValues.delete(optionValue)
    else
      selectedValues.add(optionValue)

    state.log && console.log("S-data-M-updateActivatedFilters / selectedFilters :", selectedFilters)
    commit('setSelectedFilters', {selectedFilters})

    // update query and search
    dispatch('search')

  },

  emptyOneFilter({state, commit, dispatch}, {filter}){
    // state.log && console.log("S-data-A-emptyOneFilter / filterItem :", filterItem)
    const selectedFilters = new Map(getters.getSelectedFilters)
    selectedFilters.set(filter, new Set())

    commit('setSelectedFilters', {selectedFilters})
    dispatch('search')
  },

  clearFilters({commit, dispatch}) {
    // state.log && console.log("S-data-A-clearFilters / filterItem :", filterItem)
    commit('resetFilters')
    dispatch('search')
  }



}