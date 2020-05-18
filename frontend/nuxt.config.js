// - - - - - - - - - - - - - - - - - - - - - - - -
// IMPORTS
import { chooseBooleanMode } from './utils/utils.js'
// import colors from 'vuetify/es5/util/colors'
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

console.log(
  '>>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ',
  process.env.NUXT_ENV_APP_TITLE
)

const APP_VERSION = 'v.2.1.0 - adding docs'

// - - - - - - - - - - - - - - - - - - - - - - - -
// CONFIGS FROM...
var configsJS = require('./nuxt_loadConfigs_fromJS.js')
let configsReferences = configsJS.configsReferences

// - - - - - - - - - - - - - - - - - - - - - - - -
// CONFIGS COPIED TO JSON FILES
if (process.env.NUXT_ENV_RUN_MODE === 'dev') {
  console.log('>>> nuxt.config.js / copyConfigsToJSON / ...')
  const staticRoot = './static/configs'
  const staticConfigFolder = process.env.NUXT_ENV_CONFIG_TO_JSON_FOLDER || 'dev'

  const staticConfigPath = `${staticRoot}/${staticConfigFolder}`
  !fs.existsSync(staticConfigPath) && fs.mkdirSync(staticConfigPath)

  const staticJSONpath = `${staticConfigPath}/json`
  !fs.existsSync(staticJSONpath) && fs.mkdirSync(staticJSONpath)

  for (const conf of configsJS.configsReferences) {
    const jsonFilename = conf.field + '.json'
    console.log(
      '>>> nuxt.config.js / copyConfigsToJSON / jsonFilename : ',
      jsonFilename
    )
    try {
      const jsonStr = JSON.stringify(conf.data, null, 2)
      // console.log('>>> nuxt.config.js / copyConfigsToJSON / jsonStr : ', jsonStr)
      fs.writeFileSync(`${staticJSONpath}/${jsonFilename}`, jsonStr, 'utf8')
    } catch (error) {
      console.log(
        '>>> nuxt.config.js / copyConfigsToJSON / ... error : ',
        error
      )
    }
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// CONFIGS FROM...
const staticBaseForConfigJSON = '/configs/json/'
if (process.env.NUXT_ENV_CONFIG_FROM === 'local_json_files') {
  configsReferences = [
    {
      field: 'configAppUIUX',
      url: staticBaseForConfigJSON + 'configAppUIUX.json'
    },
    {
      field: 'configAppRoutes',
      url: staticBaseForConfigJSON + 'configAppRoutes.json'
    },
    {
      field: 'configAppData',
      url: staticBaseForConfigJSON + 'configAppData.json'
    },
    {
      field: 'configAppMap',
      url: staticBaseForConfigJSON + 'configAppMap.json'
    },
    {
      field: 'configAppCharts',
      url: staticBaseForConfigJSON + 'configAppCharts.json'
    },
    {
      field: 'configAppNumbers',
      url: staticBaseForConfigJSON + 'configAppNumbers.json'
    },
    {
      field: 'configAppTexts',
      url: staticBaseForConfigJSON + 'configAppTexts.json'
    },
    {
      field: 'configAppTables',
      url: staticBaseForConfigJSON + 'configAppTables.json'
    },
    {
      field: 'configAppRawData',
      url: staticBaseForConfigJSON + 'configAppRawData.json'
    },
    {
      field: 'configAppNavbarFooters',
      url: staticBaseForConfigJSON + 'configAppNavbarFooters.json'
    },
    {
      field: 'configAppGlobalButtons',
      url: staticBaseForConfigJSON + 'configAppGlobalButtons.json'
    }
  ]
} else if (process.env.NUXT_ENV_CONFIG_FROM === 'distant_json_files') {
  const urlBase = process.env.NUXT_ENV_configs_URLBASE
  configsReferences = [
    {
      field: 'configAppUIUX',
      url: urlBase + process.env.NUXT_ENV_configAppUIUX
    },
    {
      field: 'configAppRoutes',
      url: urlBase + process.env.NUXT_ENV_configAppRoutes
    },
    {
      field: 'configAppData',
      url: urlBase + process.env.NUXT_ENV_configAppData
    },
    {
      field: 'configAppMap',
      url: urlBase + process.env.NUXT_ENV_configAppMap
    },
    {
      field: 'configAppCharts',
      url: urlBase + process.env.NUXT_ENV_configAppCharts
    },
    {
      field: 'configAppNumbers',
      url: urlBase + process.env.NUXT_ENV_configAppNumbers
    },
    {
      field: 'configAppTexts',
      url: urlBase + process.env.NUXT_ENV_configAppTexts
    },
    {
      field: 'configAppTables',
      url: urlBase + process.env.NUXT_ENV_configAppTables
    },
    {
      field: 'configAppRawData',
      url: urlBase + process.env.NUXT_ENV_configAppRawData
    },
    {
      field: 'configAppNavbarFooters',
      url: urlBase + process.env.NUXT_ENV_configAppNavbarFooters
    },
    {
      field: 'configAppGlobalButtons',
      url: urlBase + process.env.NUXT_ENV_configAppGlobalButtons
    }
  ]
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// color themes
const isDarkTheme = chooseBooleanMode(process.env.NUXT_ENV_THEME_IS_DARK) || false
const defaultThemes = {
  light: {
    primary: process.env.NUXT_ENV_THEME_LIGHT_primary || '#000091',
    accent: process.env.NUXT_ENV_THEME_LIGHT_accent || '#572a99',
    secondary: process.env.NUXT_ENV_THEME_LIGHT_secondary || '#b1133b',
    info: process.env.NUXT_ENV_THEME_LIGHT_info || '#53657D',
    warning: process.env.NUXT_ENV_THEME_LIGHT_warning || '#ff9947',
    error: process.env.NUXT_ENV_THEME_LIGHT_error || '#D1335B;',
    success: process.env.NUXT_ENV_THEME_LIGHT_success || '#03BD5B'
  },

  dark: {
    primary: process.env.NUXT_ENV_THEME_DARK_primary || '#000091',
    accent: process.env.NUXT_ENV_THEME_DARK_accent || '#572a99',
    secondary: process.env.NUXT_ENV_THEME_DARK_secondary || '#b1133b',
    info: process.env.NUXT_ENV_THEME_DARK_info || '#53657D',
    warning: process.env.NUXT_ENV_THEME_DARK_warning || '#ff9947',
    error: process.env.NUXT_ENV_THEME_DARK_error || '#D1335B;',
    success: process.env.NUXT_ENV_THEME_DARK_success || '#03BD5B'
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// PORTS
const logAllowed = ['preprod', 'dev', 'mockup']
const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV = parseInt(process.env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD =
    parseInt(process.env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(process.env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// LOCALES
const defaultLoc = 'fr'
const defaultLocs = [
  {
    code: 'fr',
    name: 'Français',
    file: 'fr-FR.js'
  }
]
const buildLocales = (localesString) => {
  if (localesString) {
    const locales = []
    const tempLocales = localesString.split(',')
    for (const loc of tempLocales) {
      const loc_ = loc.split(':')
      const obj = {
        code: loc_[0],
        name: loc_[1],
        file: loc_[2]
      }
      locales.push(obj)
    }
    return locales
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// CONFIG APP OBJECT
const configApp = {
  appVersion: APP_VERSION,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  overrideIframe: chooseBooleanMode(process.env.NUXT_ENV_APP_IFRAME_OVERRIDE),
  overrideRoutesTabs: chooseBooleanMode(process.env.NUXT_ENV_APP_ROUTESTABS_OVERRIDE),
  overrideNopMapScroll: chooseBooleanMode(process.env.NUXT_ENV_APP_NOMAPSCROLL_OVERRIDE),

  // LOADING
  loadingColor: process.env.NUXT_ENV_LOADING_COLOR || '#fff',
  loadingHeight: process.env.NUXT_ENV_LOADING_HEIGHT || 3,
  loadingContinuous: process.env.NUXT_ENV_APP_LOADING_CONTINUOUS || true,

  // CONFIGS
  // configsReferencesBackup: process.env.NUXT_ENV_CONFIG_BACKUP
  //   ? undefined
  //   : configsJS.configsReferences,
  configsReferences: configsReferences,
  configsFrom: process.env.NUXT_ENV_CONFIG_FROM || 'local_js_files',

  // ROUTES
  generateRoutes: process.env.NUXT_ENV_GENERATE_ROUTES.split(','),

  // MATOMO
  matomo_host: process.env.NUXT_ENV_MATOMO_HOST || 'https://stats.data.gouv.fr',
  matomo_siteId: parseInt(process.env.NUXT_ENV_MATOMO_SITE_ID) || 127,

  // INTERNATIONALIZATION
  defaultLocale: process.env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc,
  localesBuild:
    buildLocales(process.env.NUXT_ENV_LANG_DEFAULT_LOCALES) || defaultLocs
}
console.log('>>> nuxt.config.js / configApp : \n', configApp)

// - - - - - - - - - - - - - - - - - - - - - - - -
// MAIN NUXT CONFIG OBJECT
// import webpack from 'webpack'
export default {
  mode: 'spa',
  // mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: process.env.NUXT_ENV_APP_TITLE || 'ODAMAP',
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, height=device-height, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.NUXT_ENV_APP_TITLE || 'ODAMAP'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css', rel: 'stylesheet' }
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
  router: {
    middleware: [
      'getConfigsInit',
      'setConfigsInit',
      'setLocales',
      'getDataInit',
      'getRouteConfig',
      'getRouteData',
      'setRouteViews'
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: configApp.loadingColor,
    height: `${configApp.loadingHeight}px`,
    continuous: configApp.loadingContinuous
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/mapbox', mode: 'client' },
    { src: '~/plugins/apexCharts', mode: 'client' },
    { src: '~/plugins/matomo', mode: 'client' }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
    // '~/modules/objectFromPath',
    '@nuxtjs/device'

  ],

  i18n: {
    defaultLocale: process.env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc, // 'fr',
    locales:
      buildLocales(process.env.NUXT_ENV_LANG_DEFAULT_LOCALES) || defaultLocs,
    vueI18n: {
      fallbackLocale: process.env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc // 'fr',
    },
    lazy: true,
    langDir: 'locales/'
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: isDarkTheme,
      themes: defaultThemes
    }
  },

  /*
   ** Build configuration
  */
  generate: {
    fallback: true,
    routes: configApp.generateRoutes
  },
  build: {
    transpile: ['vue-mapbox'],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
    },

    vendors: ['axios', 'mapbox-gl']
  }
}
