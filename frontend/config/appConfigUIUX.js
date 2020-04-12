
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
      clippedBtn : false, 

      drawer: false,
      drawerBtn : true, 

      fixed: false,
      fixedBtn : false, 

      miniVariant: true,
      miniVariantBtn : false, 

      right: true,
      rightBtn : false, 

      rightDrawer: false,
      rightDrawerBtn : false, 

      
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
          isVisible : true,
          to: "/"
        },
        {
          icon: "fas fa-map",
          i18nTitle: "menu.map",
          isVisible : true,
          to: "/map"
        },
        {
          icon: "fas fa-chart-bar",
          i18nTitle: "menu.charts",
          isVisible : true,
          to: "/charts"
        },
        // {
        //   icon: "fas fa-table",
        //   i18nTitle: "menu.table",
        //   isVisible : false,
        //   to: "/table"
        // },
        {
          icon: "fas fa-database",
          i18nTitle: "menu.data",
          isVisible : true,
          to: "/rawData"
        },
      ]
  
    },

    filters : {
      isVisible : true, 
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

    map : {
      loader : {
        color : '#de4a5b',
        width: '6px',
        height: '6px',
      },
    },

    typos : {
    }

  },



}