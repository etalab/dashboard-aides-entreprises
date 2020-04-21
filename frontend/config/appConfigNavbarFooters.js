export const configAppNavbarFooters = {
  help: "this file contains the setup for the numbers components",

  // NAVBAR FOOTERS

  settingsIds: [
    {
      id: "navbar-footer-01",
      help: "",

      activated: true,

      title: { fr: "" },
      titleI18n: "navbars.footer.title",
      navbarFooterClass: "",

      height: 56,
      grow: true,
      shift: true,
      showOnSizes: ["xs", "sm"],

      defaultBtnNav: "map",
      redirectAtBreakShow: { path: "/map", btnNav: "map" },
      redirectAtBreakNoShow: { path: "/", btnNav: "home" },

      buttons: [
        {
          title: { fr: "accueil" },
          value: "home",
          showTitle: true,
          icon: "fas fa-th",
          action: "toggleDivs", // goToUrl | scrollTo | toggleDivs
          divsToToggle : [ 
            { routeId: 'home',
              toggle : 'on',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'text-01', 
                'text-02', 
              ],
            },
            { routeId: 'home',
              toggle : 'off',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'map-france-metro',
                'apexchart-01', 
              ],
            }
          ],
          // toUrl: "/",
          // to : '#text-text-01', // for scrollTo
          offset: 10,
        },
        {
          title: { fr: "carte" },
          value: "map",
          showTitle: true,
          icon: "fas fa-map",
          action: "toggleDivs",
          divsToToggle : [ 
            { routeId: 'home',
              toggle : 'on',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'map-france-metro',
              ],
            },
            { routeId: 'home',
              toggle : 'off',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'text-01', 
                'text-02',
                'apexchart-01', 
              ],
            }
          ],
          // toUrl: "/map",
          // to : '#map-map-france-metro',
          offset: 10,
        },
        {
          title: { fr: "graphiques" },
          value: "charts",
          showTitle: true,
          icon: "fas fa-chart-bar",
          action: "toggleDivs",
          divsToToggle : [ 
            { routeId: 'home',
              toggle : 'on',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'text-01', 
                'apexchart-01', 
              ],
            },
            { routeId: 'home',
              toggle : 'off',
              toggleVisibility : ['isVisibleMobile'],
              divIds : [
                'map-france-metro',
              ],
            }
          ],
          // toUrl: "/charts",
          // to : '#apexcharts-apexchart-01',
          offset: 10,
        },
      ],
    },
  ],
}
