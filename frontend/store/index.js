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

  configRoutes : process.env.CONFIG_APP.routes_config,
  localRouteConfig : undefined,

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


  // ROUTES
  getLocalRouteConfig : (state) => {
    return state.localRouteConfig
  },

  getCurrentRouteConfig : (state) => (currentRoute) => {
    try {
      return state.configRoutes.find(function(r) {
        return r.urls.indexOf(currentRoute) !== -1;
      });
    } catch (e) {
      state.log && console.log('err',e);
      return undefined
    }
  },

}


export const mutations = {

  // NAVBAR
  setFromNavbar(state, value){
    // state.log && console.log("S-index-M-setFromNavbar / value : ", value)
    state.navbar[value] = !state.navbar[value]
  },

  // ROUTES CONFIG
  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-index-M-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    state.log && console.log("S-index-M-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },


  // INTERNATIONALIZATION
  switchLocale(state , localeObject) {
    // state.log && console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
  },

  setLocale(state, loc){
    // state.log && console.log("S-index-M-setLocale / loc :", loc )
    state.locale = loc
  },

  initLocales(state) {
    
    // state.log && console.log("S-index-M-initLocales ... ")

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