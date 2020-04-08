// import colors from 'vuetify/es5/util/colors'


const dotenv = require('dotenv')
dotenv.config()
console.log('>>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ', process.env.NUXT_ENV_APP_TITLE)


import { configAppUIUX } from './config/appConfigUIUX.js'
// console.log('>>> nuxt.config.js / configAppUIUX : \n', configAppUIUX)

import { configAppData } from './config/appConfigData.js'
// console.log('>>> nuxt.config.js / configAppData : \n', configAppData)

import { configAppMap } from './config/appConfigMap.js'
// console.log('>>> nuxt.config.js / configAppMap : \n', configAppMap)



const trueStrings = ['yes', 'Yes', 'YES', 'y', 'Y', 'true', 'True', 'TRUE', 't', 'T']
const falseStrings = ['no', 'No', 'NO', 'n', 'N', 'false', 'False', 'FALSE', 'f', 'F']
const logAllowed = ['preprod', 'dev', 'mockup']


// SELECTOR FUNCTIONS FROM ENV VAR
const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}
const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV     = parseInt(process.env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD = parseInt(process.env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD    = parseInt(process.env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}

const chooseBackend = (ENVPROD) => {
  return configAppData.dataSource.sources[ ENVPROD ]
}

const configApp = {

  /// APP INFOS
  appTitle: configAppUIUX.appTitle,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // INTERNATIONALIZATION
  defaultLocale: configAppUIUX.lang.defaultLocale,
  localesBuild: configAppUIUX.lang.locales,

  // DATA : 
  backendApi : chooseBackend(process.env.NUXT_ENV_RUN_MODE),
  dataSource: configAppData.dataSource, 
  filters: configAppData.filters, 
  defaultDataSetup: configAppData.defaultDataSetup, 

  // UX
  UX_config : configAppUIUX.UX_config,
  routes_config : configAppUIUX.routes,

  // UI
  UI_config : configAppUIUX.UI_config,

  // MAP SETTINGS
  MAP_config : configAppMap,


}


console.log('>>> nuxt.config.js / configApp : \n', configApp)


export default {

  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: process.env.npm_package_name,
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 3000
    host: configApp.host // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: configApp.mode,
    LOG: logAllowed.includes(configApp.mode),
    CONFIG_APP: configApp
  },

  /*
  ** Routes and middlewares to load before loading routes
  */
  router : {
    middleware: [
      'setLocales',
      'getDataInit',
      'getRouteConfig',
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/mapbox', mode: 'client' },
    { src: '~/plugins/apexCharts', mode: 'client' },
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],
  
  i18n: {

    defaultLocale: configAppUIUX.lang.defaultLocale, //'fr',
    locales : configAppUIUX.lang.locales,
    vueI18n: {
      fallbackLocale: configAppUIUX.lang.defaultLocale, //'fr',
    },
    lazy: true,
    langDir : "locales/",
  },


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: configApp.UI_config.isDarkTheme,
      themes: configApp.UI_config.theme,
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
