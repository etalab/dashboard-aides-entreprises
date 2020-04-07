// import colors from 'vuetify/es5/util/colors'


const dotenv = require('dotenv')
dotenv.config()
console.log('>>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ', process.env.NUXT_ENV_APP_TITLE)


const configAppFileUxUi = require('./config/appConfigUIUX.json')
console.log('>>> nuxt.config.js / configAppFileUxUi : \n', configAppFileUxUi)

const configAppFileData = require('./config/appConfigData.json')
console.log('>>> nuxt.config.js / configAppFileData : \n', configAppFileData)

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
  return configAppFileData.dataSource.sources[ ENVPROD ]
}

const configApp = {

  /// APP INFOS
  appTitle: configAppFileUxUi.appTitle,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // INTERNATIONALIZATION
  defaultLocale: configAppFileUxUi.lang.defaultLocale,
  localesBuild: configAppFileUxUi.lang.locales,

  // DATA : 
  backendApi : chooseBackend(process.env.NUXT_ENV_RUN_MODE),
  filters: configAppFileData.filters, 

  // UX
  navbar : configAppFileUxUi.navbar,

  // UI
  UI_config : {
    dark : configAppFileUxUi.UI_config.darkTheme,
    colors : {
      primary   : configAppFileUxUi.UI_config.mainColors.primary, 
      accent    : configAppFileUxUi.UI_config.mainColors.accent, 
      secondary : configAppFileUxUi.UI_config.mainColors.secondary, 
      info      : configAppFileUxUi.UI_config.mainColors.info, 
      warning   : configAppFileUxUi.UI_config.mainColors.warning, 
      error     : configAppFileUxUi.UI_config.mainColors.error, 
      success   : configAppFileUxUi.UI_config.mainColors.success, 
    },
    typos : {

    }
  }

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
      'initDataSetup',
      'getData',
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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

    defaultLocale: configAppFileUxUi.lang.defaultLocale, //'fr',
    locales : configAppFileUxUi.lang.locales,
    vueI18n: {
      fallbackLocale: configAppFileUxUi.lang.defaultLocale, //'fr',
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
      dark: configApp.UI_config.dark,
      themes: {
        dark: {
          primary   : configApp.UI_config.colors.primary ,  
          accent    : configApp.UI_config.colors.accent ,  
          secondary : configApp.UI_config.colors.secondary ,  
          info      : configApp.UI_config.colors.info , 
          warning   : configApp.UI_config.colors.warning , 
          error     : configApp.UI_config.colors.error , 
          success   : configApp.UI_config.colors.success , 
        }
      }
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
