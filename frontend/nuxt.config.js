import colors from 'vuetify/es5/util/colors'



const dotenv = require('dotenv')
dotenv.config()
console.log('>>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ', process.env.NUXT_ENV_APP_TITLE)


const configAppFileRaw = require('./config/appConfigUIUX.json')
console.log('>>> nuxt.config.js / configAppFileRaw : \n', configAppFileRaw)



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
  if (ENVPROD === 'dev') {
    return process.env.NUXT_BACKEND_API_DEV
  } else if (ENVPROD === 'preprod') {
    return process.env.NUXT_BACKEND_API_PREPROD
  } else if (ENVPROD === 'prod') {
    return process.env.NUXT_BACKEND_API_PROD
  }
}

// const buildLocales = () => {
//   let locales = [] 
//   for ( const locale of process.env.NUXT_ENV_LOCALES.split(',') ) {
//     let localeData = locale.split(':')
//     let localeObj = {
//       name: localeData[0],
//       code: localeData[1],
//       iso: localeData[2],
//       file: localeData[2] + '.json'
//     }
//     locales.push(localeObj)
//   }
//   return locales
// }

const configApp = {

  /// APP INFOS
  // appTitle: process.env.NUXT_ENV_APP_TITLE,
  appTitle: configAppFileRaw.appTitle,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // isProtected: chooseBooleanMode(process.env.NUXT_ENV_IS_PROTECTED),

  // INTERNATIONALIZATION
  // defaultLocale: process.env.NUXT_ENV_LOCALE_DEFAULT,
  defaultLocale: configAppFileRaw.lang.defaultLocale,
  localesBuild: configAppFileRaw.lang.locales, //buildLocales(),

  // DATA : 
  backendApi : chooseBackend(process.env.NUXT_ENV_RUN_MODE),

  // UI
  UI_config : {
    dark : configAppFileRaw.UI_config.darkTheme,
    colors : {
      primary   : configAppFileRaw.UI_config.mainColors.primary, // process.env.VUETIFY_primary,
      accent    : configAppFileRaw.UI_config.mainColors.accent, // process.env.VUETIFY_accent,
      secondary : configAppFileRaw.UI_config.mainColors.secondary, // process.env.VUETIFY_secondary,
      info      : configAppFileRaw.UI_config.mainColors.info, // process.env.VUETIFY_info,
      warning   : configAppFileRaw.UI_config.mainColors.warning, // process.env.VUETIFY_warning,
      error     : configAppFileRaw.UI_config.mainColors.error, // process.env.VUETIFY_error,
      success   : configAppFileRaw.UI_config.mainColors.success, // process.env.VUETIFY_success
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
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
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
      // 'i18n',
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

    defaultLocale: configAppFileRaw.lang.defaultLocale, //'fr',
    locales : configAppFileRaw.lang.locales,
    // locales: [
    //    {
    //      code: 'fr',
    //      name: 'Français',
    //      file: 'fr-FR.js' 
    //    },
    //  ],
    vueI18n: {
      fallbackLocale: configAppFileRaw.lang.defaultLocale, //'fr',
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
          primary   : configApp.UI_config.colors.primary ,  // colors.blue.darken2,
          accent    : configApp.UI_config.colors.accent ,  // colors.grey.darken3,
          secondary : configApp.UI_config.colors.secondary ,  // colors.amber.darken3,
          info      : configApp.UI_config.colors.info ,  // colors.teal.lighten1,
          warning   : configApp.UI_config.colors.warning ,  // colors.amber.base,
          error     : configApp.UI_config.colors.error ,  // colors.deepOrange.accent4,
          success   : configApp.UI_config.colors.success ,  // colors.green.accent3
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
