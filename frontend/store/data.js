import { objectFromPath } from '~/utils/utils.js'


export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  // API BACKEND
  backendApi : process.env.CONFIG_APP.backendApi, 
  dataSource : process.env.CONFIG_APP.dataSource,
  defaultDataSetup : process.env.CONFIG_APP.defaultDataSetup,

  // FILTERS
  filters : process.env.CONFIG_APP.filters,
  activatedFilters : [ ],

  // DATASETS
  initData : undefined,
  isInitDataSet : false,
  
  // QUERY
  query: undefined,
  response : undefined,

  // DISPLAYED DATA
  displayedData : undefined,

})


export const getters = {

  // BACKEND

  getBackendApi : (state, getters) => {
    // state.log && console.log("S-data-G-getBackendApi ...")
    return state.backendApi
  },

  // FILTERS

  getActivatedFilters : (state) => {
    // state.log && console.log("S-data-G-getActivatedFilters ...")
    return state.activatedFilters
  },


  // DATASETS
  
  getFromInitData : (state) => ( id ) => {
    state.log && console.log("S-data-G-getFromInitData / id : ", id )
    state.log && console.log("S-data-G-getFromInitData / state.initData : ", state.initData )
    return state.initData.find( dataset => dataset.id == id )
  },

  getFromDisplayedData : (state) => ( id ) => {
    return state.displayedData && state.displayedData.find( dataset => dataset.id == id )
  },

  selectFromDisplayedData : ( state, getters ) => ( paramsArray ) => {
    state.log && console.log("S-data-A-selectFromDisplayedData / paramsArray  : ", paramsArray )
    let resultsArray = [ ]
    for ( let params of paramsArray){
      let dataset = getters.getFromDisplayedData( params.id )
      state.log && console.log("S-data-A-selectFromDisplayedData / dataset  : ", dataset )
      let result = dataset && objectFromPath( dataset, params.field )
      resultsArray.push( result )
    }
    return resultsArray
  },


}


export const mutations = {
  
  setInitDataAsSet (state) {
    state.isInitDataSet = !state.isInitDataSet
  },
  
  // DATASETS 

  pushToInitData (state, dataset){
    state.log && console.log("... S-data-M-pushToInitData / dataset.id : ", dataset.id)
    state.log && console.log("... S-data-M-pushToInitData / dataset : ", dataset)
    state.log && console.log("... S-data-M-pushToInitData / state.initData : ", state.initData)
    if ( !state.initData ){ state.initData = [] }
    state.initData.push( dataset )
  },

  pushToDisplayedData (state, dataset){
    state.log && console.log("... S-data-M-pushToDisplayedData / dataset.id  : ", dataset.id )
    if ( !state.displayedData ){ state.displayedData = [] }
    state.displayedData.push( dataset )
  },

  
  setDisplayedDataset (state, dataset ){
    state.log && console.log("S-data-M-setDisplayedDataset / dataset.id  : ", dataset.id )
    let foundIndex = state.displayedData.findIndex( x => x.id == dataset.id )
    state.displayedData[ foundIndex ] = dataset 
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

  // DATASETS

  setDisplayedDataset({state, getters, commit}, updatedDataset ) {

    // state.log && console.log("S-data-A-setDisplayedDataset / updatedDataset.id  : ", updatedDataset.id )
   
    // check if dataset exists in displayedData
    let dataset = getters.getFromDisplayedData( updatedDataset.id )
    // state.log && console.log("S-data-A-setDisplayedDataset / dataset : ", dataset)

    if ( typeof dataset !== 'undefined' ){
      commit('setDisplayedDataset', updatedDataset )
    } else {
      commit('pushToDisplayedData', updatedDataset )
    }

  },



  // QUERIES

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