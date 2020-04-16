
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
      { code: "fr",
        name: "Français",
        file: "fr-FR.js" 
      }
    ]
  },

  // UX 
  UX_config : {

    navbar : {

      height : 64, // in pixels

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
        { to: "/about",
          icon: "mdi-apps",
          i18nTitle: "menu.about",
          switch: false,
        },
      ],

      // ITEMS IN RIGHT DRAWER
      items: [
        { to: "/",
          // icon: "mdi-apps",
          // icon: "fas fa-home",
          icon: "fas fa-th",
          i18nTitle: "menu.welcome",
          isVisible : true,
        },
        { to: "/map",
          icon: "fas fa-map",
          i18nTitle: "menu.map",
          isVisible : true,
        },
        { to: "/charts",
          icon: "fas fa-chart-bar",
          i18nTitle: "menu.charts",
          isVisible : true,
        },
        // { to: "/table",
        //   icon: "fas fa-table",
        //   i18nTitle: "menu.table",
        //   isVisible : false,
        // },
        { to: "/rawData",
          icon: "fas fa-database",
          i18nTitle: "menu.data",
          isVisible : false,
        },
      ]
  
    },

    filters : {
      isVisible : false, 
    },

  },

  // UI
  UI_config : {

    isDarkTheme : false,

    navbar : {
      elevation: 0, 
      navbarClass : '',
      color : 'primary',
      dark : true,
      titleClass : 'white--text font-weight-black display-1',
    },

    filters : {
      elevation: 0,
    },

    themes : {

      light : {
        primary   : "#000091",
        accent    : "#572a99",
        secondary : "#b1133b",
        info      : "#53657D",
        warning   : "#ff9947",
        error     : "#D1335B;",
        success   : "#03BD5B"
      },

      dark : {
        primary   : "#000091",
        accent    : "#572a99",
        secondary : "#b1133b",
        info      : "#53657D",
        warning   : "#ff9947",
        error     : "#D1335B;",
        success   : "#03BD5B"
      },

    },

    map : {
      loader : {
        color : '#000091',
        width: '6px',
        height: '6px',
      },
    },

    typos : {
    },

    customCSS : [

      { field : 'button-container',
        class : '.',
        config: `
          background-color: #fff;
          border-bottom: 1px solid #000091;
          border-right: 1px solid #000091;
          margin: .3em;
        `,
      },
      { field : 'btn-selected',
        class : '.',
        config: `
          color: #FFF;
          background-color: #000091;
        `,
      },

    ]

  },



}