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
                'apexchart-fds-categ-jur-pie',
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
              routeId: 'reports',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'text-report-infos'
              ]
            },
            {
              routeId: 'reports',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'apexchart-report',
                'map-france-report-metro'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-cpsti-title',
                'text-cpsti-infos'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'apexchart-cpsti',
                'map-france-cpsti-metro'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-activitepartielle-title',
                'text-activitepartielle-note',
                'text-activitepartielle-infos'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'map-france-activitepartielle-metro',
                'apexchart-activitepartielle-time-serie-01',
                'apexchart-activitepartielle-time-serie-02',
                // 'apexchart-activitepartielle',
                // 'apexchart-activitepartielle-02',
                // 'apexchart-activitepartielle-03'
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
                'apexchart-fds-categ-jur-pie',
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
              routeId: 'reports',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'map-france-report-metro'
              ]
            },
            {
              routeId: 'reports',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-infos',
                'apexchart-report'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-cpsti-title',
                'map-france-cpsti-metro'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-cpsti-infos',
                'apexchart-cpsti'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-activitepartielle-title',
                'text-activitepartielle-note',
                'map-france-activitepartielle-metro'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-activitepartielle-infos',
                // 'text-activitepartielle-note',
                'apexchart-activitepartielle-time-serie-01',
                'apexchart-activitepartielle-time-serie-02',
                // 'apexchart-activitepartielle',
                // 'apexchart-activitepartielle-02',
                // 'apexchart-activitepartielle-03'
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
                'apexchart-fds-categ-jur-pie',
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
              routeId: 'reports',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-title',
                'apexchart-report'
              ]
            },
            {
              routeId: 'reports',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-report-infos',
                'map-france-report-metro'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-cpsti-title',
                'apexchart-cpsti'
              ]
            },
            {
              routeId: 'cpsti',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-cpsti-infos',
                'map-france-cpsti-metro'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'on',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-activitepartielle-title',
                'text-activitepartielle-note',
                'apexchart-activitepartielle-time-serie-01',
                'apexchart-activitepartielle-time-serie-02',
                // 'apexchart-activitepartielle',
                // 'apexchart-activitepartielle-02',
                // 'apexchart-activitepartielle-03'
              ]
            },
            {
              routeId: 'activitepartielle',
              toggle: 'off',
              toggleVisibility: ['isVisibleMobile'],
              divIds: [
                'text-activitepartielle-infos',
                'map-france-activitepartielle-metro'
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
