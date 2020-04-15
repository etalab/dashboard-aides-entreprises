import { objectFromPath, sortArrayBy } from '~/utils/utils.js'


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
  specialStore : {},
  triggerChange : 1,

})


export const getters = {

  // BACKEND

  getBackendApi : (state, getters) => {
    return state.backendApi
  },

  // FILTERS

  getActivatedFilters : (state) => {
    return state.activatedFilters
  },


  // DATASETS
  
  getFromInitData : (state) => ( id ) => {
    return state.initData.find( dataset => dataset.id == id )
  },

  getFromDisplayedData : (state) => ( id ) => {
    return state.displayedData && state.displayedData.find( dataset => dataset.id == id )
  },

  getFromSpecialStore : (state) => ( id ) => {
    return state.specialStore.find( dataset => dataset.id == id )
  },

  selectFromDisplayedData : ( state, getters ) => ( paramsArray ) => {
    state.log && console.log("S-data-A-selectFromDisplayedData / paramsArray  : ", paramsArray )
    let resultsArray = [ ]
    for ( let params of paramsArray){
      let dataset = getters.getFromDisplayedData( params.id )
      state.log && console.log("S-data-A-selectFromDisplayedData / dataset  : ", dataset )
      let result = dataset && objectFromPath( dataset.data, params.field )
      resultsArray.push( result )
    }
    return resultsArray
  },

  getSpecialStore : (state) => {
    return state.specialStore
  },

  getFromSpecialStoreData : (state, getters) =>  ( params ) => {
    state.log && console.log("S-data-A-getFromSpecialStoreData / params  : ", params )
    let obj = state.specialStore[ params.id ]
    obj = ( params.key )? obj[ params.key ] : params.key

    let sortParams = params.sortParams
    if ( sortParams ) {
      obj = sortArrayBy( obj, sortParams)
    }
    return obj
  },

}


export const mutations = {
  
  setInitDataAsSet (state) {
    state.isInitDataSet = !state.isInitDataSet
  },
  
  // DATASETS 

  pushToInitData (state, dataset){
    if ( !state.initData ){ state.initData = [] }
    state.initData.push( dataset )
  },

  pushToDisplayedData (state, dataset){
    if ( !state.displayedData ){ state.displayedData = [] }
    state.displayedData.push( dataset )
  },

  setInitDataset (state, dataset ){
    state.log && console.log("S-data-M-setInitDataset / dataset.id  : ", dataset.id )
    let foundIndex = state.initData.findIndex( x => x.id == dataset.id )
    state.initData[ foundIndex ] = dataset 
  },

  setDisplayedDataset (state, dataset ){
    state.log && console.log("S-data-M-setDisplayedDataset / dataset.id  : ", dataset.id )
    let foundIndex = state.displayedData.findIndex( x => x.id == dataset.id )
    state.displayedData[ foundIndex ] = dataset 
  },


  toggleTrigger (state) {
    state.triggerChange = state.triggerChange*(-1)
  }, 

  setDeepNestedData (state, targetData ){
    state.log && console.log("S-data-M-setDeepNestedData / targetData  : ", targetData )
    state.specialStore[ targetData.specialStoreId ] = targetData.value
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

  setDisplayedDataset( {state, getters, commit}, updatedDataset ) {

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

  setNestedData ( {state, commit, getters}, targetData ) {
    // state.log && console.log("S-data-A-setNestedData / targetData  : ", targetData )
    // state.log && console.log("S-data-A-setNestedData / getters.getSpecialStore (1) : ", getters.getSpecialStore )
    commit( 'setDeepNestedData', targetData )
    // state.log && console.log("S-data-A-setNestedData / getters.getSpecialStore (2) : ", getters.getSpecialStore )

  },

  getDataFromSpecialStoreData( { state, getters }, params ) {
    return getters.getFromSpecialStoreData( params )
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