export const configAppNavbarFooters = {
  help: 'this file contains the setup for the numbers components',

  // NAVBAR FOOTERS

  settingsIds: [
    {
      id: 'navbar-footer-01',
      help: '',

      activated: true,

      title: { fr: '' },
      titleI18n: 'navbars.footer.title',
      navbarFooterClass: '',

      height: 70,
      grow: true,
      shift: true,
      // showOnSizes: ['xs', 'sm'],

      defaultBtnNav: 'map',
      redirectAtBreakShow: { path: '/map', btnNav: 'map' },
      redirectAtBreakNoShow: { path: '/', btnNav: 'home' },

      buttons: [
        {
          title: { fr: 'accueil' },
          value: 'home',
          showTitle: true,
          icon: 'fas fa-th',
          action: 'toggleDivs', // goToUrl | scrollTo | toggleDivs
          divsToToggle: [
            {
              routeId: 'fds',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-fds-title',
                'text-fds-infos'
              ]
            },
            {
              routeId: 'fds',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'apexchart-fds',
                'apexchart-fds-categ-juridiques',
                'apexchart-fds-effectifs',
                'map-france-aides-metro'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-pge-title',
                'text-pge-infos'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'apexchart-pge',
                'map-france-pge-metro'
              ]
            },
            {
              routeId: 'report',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'text-report-infos'
              ]
            },
            {
              routeId: 'report',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'apexchart-report',
                'map-france-report-metro'
              ]
            }
          ],
          // toUrl: "/",
          // to : '#text-text-01', // for scrollTo
          offset: 10
        },
        {
          title: { fr: 'carte' },
          value: 'map',
          showTitle: true,
          icon: 'fas fa-map',
          action: 'toggleDivs',
          divsToToggle: [
            {
              routeId: 'fds',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-fds-title',
                'map-france-aides-metro'
              ]
            },
            {
              routeId: 'fds',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-fds-infos',
                'apexchart-fds',
                'apexchart-fds-categ-juridiques',
                'apexchart-fds-effectifs'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-pge-title',
                'map-france-pge-metro'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-pge-infos',
                'apexchart-pge'
              ]
            },
            {
              routeId: 'report',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'map-france-report-metro'
              ]
            },
            {
              routeId: 'report',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-infos',
                'apexchart-report'
              ]
            }
          ],
          // toUrl: "/map",
          // to : '#map-map-france-metro',
          offset: 10
        },
        {
          title: { fr: 'graphiques' },
          value: 'charts',
          showTitle: true,
          icon: 'fas fa-chart-bar',
          action: 'toggleDivs',
          divsToToggle: [
            {
              routeId: 'fds',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-fds-title',
                'apexchart-fds',
                'apexchart-fds-categ-juridiques',
                'apexchart-fds-effectifs'
              ]
            },
            {
              routeId: 'fds',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-fds-infos',
                'map-france-aides-metro'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-pge-title',
                'apexchart-pge'
              ]
            },
            {
              routeId: 'pge',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-pge-infos',
                'map-france-pge-metro'
              ]
            },
            {
              routeId: 'report',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'apexchart-report'
              ]
            },
            {
              routeId: 'report',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-infos',
                'map-france-report-metro'
              ]
            }
          ],
          // toUrl: "/charts",
          // to : '#apexcharts-apexchart-01',
          offset: 10
        }
      ]
    }
  ]
}
