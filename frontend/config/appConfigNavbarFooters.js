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
          action: "goToUrl", // goToUrl | scrollTo
          // to : '#text-text-01',
          toUrl: "/",
          offset: 10,
        },
        {
          title: { fr: "carte" },
          value: "map",
          showTitle: true,
          icon: "fas fa-map",
          action: "goToUrl",
          // to : '#map-map-france-metro',
          toUrl: "/map",
          offset: 10,
        },
        {
          title: { fr: "graphiques" },
          value: "charts",
          showTitle: true,
          icon: "fas fa-chart-bar",
          action: "goToUrl",
          // to : '#apexcharts-apexchart-01',
          toUrl: "/charts",
          offset: 10,
        },
      ],
    },
  ],
}
