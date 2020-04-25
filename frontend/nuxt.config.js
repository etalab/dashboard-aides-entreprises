// import colors from 'vuetify/es5/util/colors'

const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()
console.log(
  ">>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ",
  process.env.NUXT_ENV_APP_TITLE
)

// - - - - - - - - - - - - - - - - - - - - - - - -
// import { configAppUIUX } from "./config/appConfigUIUX.js"
// import { configAppRoutes } from "./config/appConfigRoutes.js"
// import { configAppData } from "./config/appConfigData.js"
// import { configAppMap } from "./config/appConfigMap.js"
// import { configAppCharts } from "./config/appConfigCharts.js"
// import { configAppNumbers } from "./config/appConfigNumbers.js"
// import { configAppTexts } from "./config/appConfigTexts.js"
// import { configAppTables } from "./config/appConfigTables.js"
// import { configAppRawData } from "./config/appConfigRawData.js"
// import { configAppNavbarFooters } from "./config/appConfigNavbarFooters.js"
// import { configAppGlobalButtons } from "./config/appConfigGlobalButtons.js"

var configsJS = require("./nuxt_loadConfigs_fromJS.js")
let configsReferences = configsJS.configsReferences

if (process.env.NUXT_ENV_CONFIG_FROM == "local_json_files") {
  configsReferences = [
    {
      field: "configAppUIUX",
      data: undefined,
      url: "/configs/json/appConfigUIUX.json",
    },
    {
      field: "configAppRoutes",
      data: undefined,
      url: "/configs/json/appConfigRoutes.json",
    },
    {
      field: "configAppData",
      data: undefined,
      url: "/configs/json/appConfigData.json",
    },
    {
      field: "configAppMap",
      data: undefined,
      url: "/configs/json/appConfigMap.json",
    },
    {
      field: "configAppCharts",
      data: undefined,
      url: "/configs/json/appConfigCharts.json",
    },
    {
      field: "configAppNumbers",
      data: undefined,
      url: "/configs/json/appConfigNumbers.json",
    },
    {
      field: "configAppTexts",
      data: undefined,
      url: "/configs/json/appConfigTexts.json",
    },
    {
      field: "configAppTables",
      data: undefined,
      url: "/configs/json/appConfigTables.json",
    },
    {
      field: "configAppRawData",
      data: undefined,
      url: "/configs/json/appConfigRawData.json",
    },
    {
      field: "configAppNavbarFooters",
      data: undefined,
      url: "/configs/appConfigNavbarFooters.json",
    },
    {
      field: "configAppGlobalButtons",
      data: undefined,
      url: "/configs/appConfigGlobalButtons.json",
    },
  ]
} else if (process.env.NUXT_ENV_CONFIG_FROM == "distant_json_files") {
  const urlBase = process.env.NUXT_ENV_configs_URLBASE
  configsReferences = [
    {
      field: "configAppUIUX",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppUIUX,
    },
    {
      field: "configAppRoutes",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppRoutes,
    },
    {
      field: "configAppData",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppData,
    },
    {
      field: "configAppMap",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppMap,
    },
    {
      field: "configAppCharts",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppCharts,
    },
    {
      field: "configAppNumbers",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppNumbers,
    },
    {
      field: "configAppTexts",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppTexts,
    },
    {
      field: "configAppTables",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppTables,
    },
    {
      field: "configAppRawData",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppRawData,
    },
    {
      field: "configAppNavbarFooters",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppNavbarFooters,
    },
    {
      field: "configAppGlobalButtons",
      data: undefined,
      url: urlBase + process.env.NUXT_ENV_configAppGlobalButtons,
    },
  ]
}

// - - - - - - - - - - - - - - - - - - - - - - - -
// copy config JS const to files if needed

if (process.env.NUXT_ENV_CONFIG_TO_JSON == "yes") {
  for (let conf of configsReferences) {
    let jsonFilename = conf.field + ".json"
    console.log(">>> nuxt.config.js / jsonFilename : ", jsonFilename)
    try {
      let jsonStr = JSON.stringify(conf.data, null, 2)
      // console.log('>>> nuxt.config.js / jsonStr : ', jsonStr)
      fs.writeFileSync(`./static/configs/json/${jsonFilename}`, jsonStr, "utf8")
    } catch (error) {
      console.log(">>> nuxt.config.js / ... error : ", error)
    }
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - -

const logAllowed = ["preprod", "dev", "mockup"]

const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV = parseInt(process.env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD =
    parseInt(process.env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(process.env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === "dev") {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === "preprod") {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === "prod") {
    return NUXT_ENV_PORT_PROD
  }
}

// const chooseBackend = (ENVPROD) => {
//   return configAppData.dataSource.apiBackendUrl[ENVPROD]
// }

const defaultLoc = "fr"
const defaultLocs = [
  {
    code: "fr",
    name: "Français",
    file: "fr-FR.js",
  },
]

const buildLocales = (localesString) => {
  let locales = []
  let tempLocales = localesString.split(",")
  for (let loc of tempLocales) {
    let loc_ = loc.split(":")
    let obj = {
      code: loc_[0],
      name: loc_[1],
      file: loc_[2],
    }
    locales.push(obj)
  }
  return locales
}

// - - - - - - - - - - - - - - - - - - - - - - - -
const configApp = {
  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // CONFIGS
  configsReferences: configsReferences,
  configsFrom: process.env.NUXT_ENV_CONFIG_FROM,
  configsToJSON: process.env.NUXT_ENV_CONFIG_TO_JSON,

  // APP INFOS
  // appTitle: configAppUIUX.appTitle,

  // // INTERNATIONALIZATION
  // defaultLocale: configAppUIUX.lang.defaultLocale,
  // localesBuild: configAppUIUX.lang.locales,

  // // DATA :init and backends
  // backendApi: chooseBackend(process.env.NUXT_ENV_RUN_MODE),
  // dataSource: configAppData.dataSource,
  // defaultDataSetup: configAppData.defaultDataSetup,
  // filters: configAppData.filters,

  // // UX - ROUTES
  // UX_config: configAppUIUX.UX_config,
  // ROUTES_config: configAppRoutes.routes,
  // UX_navbarFooters: configAppNavbarFooters,
  // UX_globalButtons: configAppGlobalButtons,

  // // UI
  // UI_config: configAppUIUX.UI_config,

  // // MAP SETTINGS
  // MAP_config: configAppMap,

  // // CHARTS SETTINGS
  // CHARTS_config: configAppCharts,

  // // NUMBERS SETTINGS
  // NUMBERS_config: configAppNumbers,

  // // TABLES SETTINGS
  // TABLES_config: configAppTables,

  // // TEXTS SETTINGS
  // TEXTS_config: configAppTexts,

  // // TEXTS SETTINGS
  // RAWDATA_config: configAppRawData,
}

console.log(">>> nuxt.config.js / configApp : \n", configApp)

// - - - - - - - - - - - - - - - - - - - - - - - -
// import webpack from 'webpack'
export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: process.env.npm_package_name,
    title: "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, height=device-height, viewport-fit=cover",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 3000
    host: configApp.host, // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: configApp.mode,
    LOG: logAllowed.includes(configApp.mode),
    CONFIG_APP: configApp,
  },

  /*
   ** Routes and middlewares to load before loading routes
   */
  router: {
    middleware: [
      "getConfigsInit",
      "setConfigsInit",
      "setLocales",
      "getDataInit",
      "getRouteConfig",
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '~/plugins/utils',
    // '~/plugins/vuetify',

    { src: "~/plugins/mapbox", mode: "client" },
    // { src: '~/plugins/mapboxgl', mode: 'client' },

    { src: "~/plugins/apexCharts", mode: "client" },
    { src: "~/plugins/matomo", mode: "client" },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "nuxt-i18n",
    // '~/modules/objectFromPath',
    "@nuxtjs/device",
  ],

  // i18n: {
  //   defaultLocale: configAppUIUX.lang.defaultLocale, //'fr',
  //   locales: configAppUIUX.lang.locales,
  //   vueI18n: {
  //     fallbackLocale: configAppUIUX.lang.defaultLocale, //'fr',
  //   },
  //   lazy: true,
  //   langDir: "locales/",
  // },
  i18n: {
    defaultLocale: process.env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc, //'fr',
    locales:
      buildLocales(process.env.NUXT_ENV_LANG_DEFAULT_LOCALES) || defaultLocs,
    vueI18n: {
      fallbackLocale: process.env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc, //'fr',
    },
    lazy: true,
    langDir: "locales/",
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
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: configApp.UI_config.isDarkTheme,
      themes: configApp.UI_config.themes,
    },
  },

  /*
   ** Build configuration
   */
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     mapboxgl: 'mapbox-gl'
    //   })
    // ],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
    },

    vendors: ["axios", "mapbox-gl"],
  },
}
