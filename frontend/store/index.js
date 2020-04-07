// import { ... } from '~/utils/'



export const state = () => ({

  // GLOABAL APP ENV
  log : process.env.LOG,

  locale: undefined,
  locales: undefined,

  appTitle: process.env.CONFIG_APP.appTitle,

  value : undefined, 

  // NAVBAR - on basis vuetify create-nuxt-app
  navbar : {
    clipped     :  process.env.CONFIG_APP.navbar.clipped, //true,
    drawer      :  process.env.CONFIG_APP.navbar.drawer, //true,
    fixed       :  process.env.CONFIG_APP.navbar.fixed, //false,
    miniVariant :  process.env.CONFIG_APP.navbar.miniVariant, //false,
    right       :  process.env.CONFIG_APP.navbar.right, //true,
    rightDrawer :  process.env.CONFIG_APP.navbar.rightDrawer, //false,
    items       : process.env.CONFIG_APP.navbar.items, // ,
    // items: [
    //   {
    //     icon: 'mdi-apps',
    //     title: 'Welcome',
    //     i18nTitle: 'menu.welcome',
    //     to: '/'
    //   },
    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Inspire',
    //     i18nTitle: 'menu.inspire',
    //     to: '/inspire'
    //   }
    // ],

  }

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

  setFromNavbar(state, value){
    state.log && console.log("S-index-M-setFromNavbar / value : ", value)
    state.navbar[value] = !state.navbar[value]
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

  switchLocale(state , localeObject) {
    state.log && console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
  },

}




export const actions = {

  // setSpecValue({state, commit}, value){

  //   commit('setValue')
  // },


}