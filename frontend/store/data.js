// import { ... } from '~/utils/'



export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  value: undefined,

  // API BACKEND
  backendApi : process.env.CONFIG_APP.backendApi, 


  // DATASETS
  // ... 


})


export const getters = {

  // INTERNATIONALIZATION
  getBackendApi : (state, getters) => {
    // state.log && console.log("S-data-G-getBackendApi ...")
    return state.backendApi
  },

}


export const mutations = {

  setValue(state, value){
    state.value = value
  },

}




export const actions = {

  setSpecValue({state, commit}, value){
    commit('setValue', value)
  },


}