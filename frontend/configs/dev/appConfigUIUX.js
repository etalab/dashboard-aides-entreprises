export const configAppUIUX = {
  help: 'this file contains the setup for the UI-UX',

  // GLOBAL
  appTitle: {
    fr: 'Aides aux entreprises'
  },
  appMetas: [],
  appVersion: 'v.1.10',
  appLogo: 'https://',

  // INTERATIONALIZATION
  lang: {
    defaultLocale: 'fr',
    locales: [{ code: 'fr', name: 'Français', file: 'fr-FR.js' }]
  },

  // UX
  UX_config: {
    hasDrawer: false,

    mobileBreakpoints: ['xs', 'sm'],
    overrideIframeMaxHeight: undefined,

    navbar: {
      height: 64, // in pixels
      mobileHeight: 45,

      fixed: true,
      fixedBtn: false,

      clipped: true,
      clippedBtn: false,

      drawer: false,
      drawerBtn: false,

      miniVariant: true,
      miniVariantBtn: false,

      right: false,
      rightBtn: false,

      rightDrawer: false,
      rightDrawerBtn: false,

      // HORIZ BUTTONS
      buttons: [
        {
          to: '/about',
          icon: 'mdi-apps',
          i18nTitle: 'menu.about',
          switch: false
        }
      ],

      // ITEMS IN RIGHT DRAWER
      items: [
        {
          to: '/',
          // icon: "mdi-apps",
          // icon: "fas fa-home",
          icon: 'fas fa-th',
          i18nTitle: 'menu.welcome',
          isVisible: true
        },
        {
          to: '/map',
          icon: 'fas fa-map',
          i18nTitle: 'menu.map',
          isVisible: true
        },
        {
          to: '/charts',
          icon: 'fas fa-chart-bar',
          i18nTitle: 'menu.charts',
          isVisible: true
        },
        // { to: "/table",
        //   icon: "fas fa-table",
        //   i18nTitle: "menu.table",
        //   isVisible : false,
        // },
        {
          to: '/rawData',
          icon: 'fas fa-database',
          i18nTitle: 'menu.data',
          isVisible: false
        }
      ]
    },

    tabsRoutes: {

      isActivated: true,
      grow: true,
      dark: true,
      backgroundColor: 'info',
      hasIcons: false,
      hasSlider: true,
      height: 35,
      slidersClass: 'primary',
      format: 'tabs', // todo : as buttons too
      tabsClass: 'text-none',

      // ITEMS ROUTES TABS
      tabs: [
        {
          to: '/?routeId=fds',
          href: '/fds',
          isVisible: true,
          icon: undefined,
          title: { fr: 'Fonds de solidarité' },
          titleMobile: { fr: 'Fonds de solidarité' },
          // titleMobile: { fr: 'FDS' },
          tooltip: { fr: 'fonds de solidarité' },
          isNuxtLink: false
        },
        {
          to: '/?routeId=pge',
          href: '/pge',
          isVisible: true,
          icon: undefined,
          title: { fr: "Prêts garantis par l'Etat" },
          titleMobile: { fr: "Prêts garantis par l'Etat" },
          // titleMobile: { fr: 'PGE' },
          tooltip: { fr: "prêts garantis par l'Etat" },
          isNuxtLink: false
        },
        {
          to: '/?routeId=reports',
          href: '/reports',
          isVisible: true,
          icon: undefined,
          title: { fr: "Reports d'échéance" },
          titleMobile: { fr: "Reports d'échéance" },
          // titleMobile: { fr: 'REP' },
          tooltip: { fr: "reports d'échéance" },
          isNuxtLink: false
        }

      ]
    },

    filters: {
      isVisible: false
    }
  },

  // UI
  UI_config: {
    isDarkTheme: false,

    navbar: {
      elevation: 0,
      navbarClass: '',
      color: 'primary',
      dark: true,
      titleClass: 'white--text font-weight-black',
      sizeDesktop: 'headline',
      sizeMobile: 'subtitle-1'
    },

    filters: {
      elevation: 0
    },

    themes: {
      light: {
        primary: '#000091',
        accent: '#572a99',
        secondary: '#b1133b',
        info: '#53657D',
        warning: '#ff9947',
        error: '#D1335B;',
        success: '#03BD5B'
      },

      dark: {
        primary: '#000091',
        accent: '#572a99',
        secondary: '#b1133b',
        info: '#53657D',
        warning: '#ff9947',
        error: '#D1335B;',
        success: '#03BD5B'
      }
    },

    map: {
      loader: {
        color: '#000091',
        width: '6px',
        height: '6px'
      }
    },

    typos: {},

    customCSS: [
      {
        class: '.btn-gouv',
        config: `
          background-color: #fff !important;
          border-bottom: 1px solid #000091 !important;
          border-right: 1px solid #000091 !important;
          margin: .3em !important;
        `
      },
      {
        class: '.btn-gouv.selected',
        config: `
          color: #FFF;
          background-color: #000091;
        `
      }
    ]
  }
}
