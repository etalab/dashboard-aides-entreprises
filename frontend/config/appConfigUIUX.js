
export const configAppUIUX = {
  
  help : "this file contains the setup for the UI-UX",

  // GLOBAL
  appTitle : {
    fr : "Covid / Aides aux entreprises",
  },
  appMetas : [],
  appVersion : "V.0.1",
  appLogo : "https://",

  // INTERATIONALIZATION
  lang : {
    defaultLocale : "fr",
    locales: [
      {
        code: "fr",
        name: "Français",
        file: "fr-FR.js" 
      }
    ]
  },

  // UX 
  UX_config : {

    navbar : {

      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      
      // HORIZ BUTTONS
      buttons : [
        {
          icon: "mdi-apps",
          i18nTitle: "menu.about",
          switch: false,
          to: "/about"
        },
      ],

      // ITEEMS IN RIIGHT DRAWER
      items: [
        {
          // icon: "mdi-apps",
          // icon: "fas fa-home",
          icon: "fas fa-th",
          i18nTitle: "menu.welcome",
          to: "/"
        },
        {
          icon: "fas fa-map",
          i18nTitle: "menu.map",
          to: "/map"
        },
        {
          icon: "fas fa-chart-bar",
          i18nTitle: "menu.charts",
          to: "/charts"
        },
        {
          icon: "fas fa-table",
          i18nTitle: "menu.table",
          to: "/table"
        },
        {
          icon: "fas fa-database",
          i18nTitle: "menu.data",
          to: "/rawData"
        },
      ]
  
    },


  },

  // UI
  UI_config : {

    isDarkTheme : false,

    navbar : {
      elevation: 0, 
    },

    filters : {
      elevation: 0,
    },

    themes : {

      light : {
        primary   : "#2e2265",
        accent    : "#572a99",
        secondary : "#de4a5b",
        info      : "#cbc8d8",
        warning   : "#FFC107",
        error     : "#FF5252",
        success   : "#00BCD4"
      },

      dark : {
        primary   : "#2e2265",
        accent    : "#572a99",
        secondary : "#de4a5b",
        info      : "#cbc8d8",
        warning   : "#FFC107",
        error     : "#FF5252",
        success   : "#00BCD4"
      },

    },


    typos : {
    }

  },



}