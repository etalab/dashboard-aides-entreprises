// import { ... } from '~/utils/'



export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  locale: undefined,
  locales: undefined,

  appTitle: process.env.CONFIG_APP.appTitle,

  // NAVBAR - on basis vuetify create-nuxt-app
  navbar : process.env.CONFIG_APP.UX_config.navbar,
  // navbar : {
  //   clipped     :  process.env.CONFIG_APP.navbar.clipped, 
  //   drawer      :  process.env.CONFIG_APP.navbar.drawer, 
  //   fixed       :  process.env.CONFIG_APP.navbar.fixed, 
  //   miniVariant :  process.env.CONFIG_APP.navbar.miniVariant, 
  //   right       :  process.env.CONFIG_APP.navbar.right, 
  //   rightDrawer :  process.env.CONFIG_APP.navbar.rightDrawer, 
  //   items       : process.env.CONFIG_APP.navbar.items, 

  // },

  configUX : process.env.CONFIG_APP.UX_config,
  configUI : process.env.CONFIG_APP.UI_config,
  configMap : process.env.CONFIG_APP.MAP_config,

})


export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    // state.log && console.log("S-index-G-getDefaultLocale ...")
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    // state.log && console.log("S-index-G-getCurrentLocale / state.locale : ", state.locale)
    return state.locale ? state.locale : getters.getDefaultLocale
  },
}


export const mutations = {

  // NAVBAR
  setFromNavbar(state, value){
    state.log && console.log("S-index-M-setFromNavbar / value : ", value)
    state.navbar[value] = !state.navbar[value]
  },
  switchLocale(state , localeObject) {
    state.log && console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
  },
  
  // INTERNATIONALIZATION
  initLocales(state) {
    
    state.log && console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale

  },


}




export const actions = {

  // setSpecValue({state, commit}, value){

  //   commit('setValue')
  // },


}