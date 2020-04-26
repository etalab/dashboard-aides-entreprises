// import colors from 'vuetify/es5/util/colors'

const dotenv = require("dotenv")
dotenv.config()
console.log(
  ">>> nuxt.config.js (start) / process.env.NUXT_ENV_APP_TITLE : ",
  process.env.NUXT_ENV_APP_TITLE
)

import { configAppUIUX } from "./config/appConfigUIUX.js"
// console.log('>>> nuxt.config.js / configAppUIUX : \n', configAppUIUX)

import { configAppRoutes } from "./config/appConfigRoutes.js"
// console.log('>>> nuxt.config.js / configAppRoutes : \n', configAppRoutes)

import { configAppData } from "./config/appConfigData.js"
// console.log('>>> nuxt.config.js / configAppData : \n', configAppData)

import { configAppMap } from "./config/appConfigMap.js"
// console.log('>>> nuxt.config.js / configAppMap : \n', configAppMap)

import { configAppCharts } from "./config/appConfigCharts.js"
// console.log('>>> nuxt.config.js / configAppCharts : \n', configAppCharts)

import { configAppNumbers } from "./config/appConfigNumbers.js"
// console.log('>>> nuxt.config.js / configAppNumbers : \n', configAppNumbers)

import { configAppTexts } from "./config/appConfigTexts.js"
// console.log('>>> nuxt.config.js / configAppTexts : \n', configAppTexts)

import { configAppTables } from "./config/appConfigTables.js"
// console.log('>>> nuxt.config.js / configAppTables : \n', configAppTables)

import { configAppRawData } from "./config/appConfigRawData.js"
// console.log('>>> nuxt.config.js / configAppRawData : \n', configAppRawData)

import { configAppNavbarFooters } from "./config/appConfigNavbarFooters.js"
// console.log('>>> nuxt.config.js / configAppNavbarFooters : \n', configAppNavbarFooters)

import { configAppGlobalButtons } from "./config/appConfigGlobalButtons.js"
// console.log('>>> nuxt.config.js / configAppGlobalButtons : \n', configAppGlobalButtons)

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

const chooseBackend = (ENVPROD) => {
  return configAppData.dataSource.apiBackendUrl[ENVPROD]
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

  // DATA :init and backends
  backendApi: chooseBackend(process.env.NUXT_ENV_RUN_MODE),
  dataSource: configAppData.dataSource,
  defaultDataSetup: configAppData.defaultDataSetup,
  filters: configAppData.filters,

  // UX - ROUTES
  UX_config: configAppUIUX.UX_config,
  ROUTES_config: configAppRoutes.routes,
  UX_navbarFooters: configAppNavbarFooters,
  UX_globalButtons: configAppGlobalButtons,

  // UI
  UI_config: configAppUIUX.UI_config,

  // MAP SETTINGS
  MAP_config: configAppMap,

  // CHARTS SETTINGS
  CHARTS_config: configAppCharts,

  // NUMBERS SETTINGS
  NUMBERS_config: configAppNumbers,

  // TABLES SETTINGS
  TABLES_config: configAppTables,

  // TEXTS SETTINGS
  TEXTS_config: configAppTexts,

  // TEXTS SETTINGS
  RAWDATA_config: configAppRawData,
}

console.log(">>> nuxt.config.js / configApp : \n", configApp)

// import webpack from 'webpack'

export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.NUXT_ENV_APP_TITLE || "Aides aux entreprises : fonds de solidarité",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, height=device-height, viewport-fit=cover" },
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
    middleware: ["setLocales", "getDataInit", "getRouteConfig"],
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

  i18n: {
    defaultLocale: configAppUIUX.lang.defaultLocale, //'fr',
    locales: configAppUIUX.lang.locales,
    vueI18n: {
      fallbackLocale: configAppUIUX.lang.defaultLocale, //'fr',
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
