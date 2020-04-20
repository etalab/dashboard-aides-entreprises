export const configAppRoutes = {
  help: "this file contains the setup for the routes",

  // ROUTES / PAGES
  routes: [
    {
      name: "home",
      help: "route home viewfor ",
      title: { fr: "" },
      titleI18n: "routes.home.title",
      urls: ["/"],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: "navbar-footer-01",
        },
      },
      pageRows: [
        {
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              colName: "Numbers and tables",
              activated: true,
              colClass: "col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4",
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "globalButton",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "pt-0 mt-0",
                  },
                },
                {
                  component: "numbers",
                  activated: true,
                  smallScreenVerticalOrder: 3,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "numbers-01",
                    containerClass: "py-0",
                  },
                },
                {
                  component: "apexchart",
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "apexchart-01",
                    containerClass: "mt-4 pt-3 pb-0",
                  },
                },
                // { component : "apexchart",
                //   activated : true,
                //   smallScreenVerticalOrder : 5,
                //   justify : "center",
                //   align : "center",
                //   settings : {
                //     id : "apexchart-01bis",
                //     containerClass : 'mt-4 pt-3 pb-0',
                //   },
                // },
                // { component : "apexchart",
                //   activated : true,
                //   justify : "center",
                //   align : "center",
                //   settings : {
                //     id : "apexchart-02",
                //     containerClass : 'pb-0',
                //   },
                // },
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-02",
                    containerClass: "pb-0",
                  },
                },
              ],
            },

            {
              colName: "main map",
              activated: true,
              colClass: "col-12 col-sm-12 col-md-6 col-lg-7 col-xl-8",
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "map",
                  activated: true,
                  smallScreenVerticalOrder: 2,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "map-france-metro",
                    containerClass: "pb-0",
                    notShownFor: ["xs", "sm"],
                  },
                },
              ],
            },
          ],
        },
        {
          rowNumber: 2,
          activated: false,
          help: "",
          columns: [
            {
              colName: "text",
              activated: true,
              colClass: "",
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-02",
                    containerClass: "pb-0",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ONLY MAP
    {
      name: "map",
      help: "route map viewfor ",
      title: { fr: "" },
      titleI18n: "routes.map.title",
      urls: ["/map"],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: "navbar-footer-01",
        },
      },
      pageRows: [
        {
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              colName: "map",
              activated: true,
              colClass: "",
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "globalButton",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "pt-0 mt-0",
                  },
                },
                {
                  component: "numbers",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "numbers-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "map",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "map-france-metro",
                    containerClass: "pb-0",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ONLY CHARTS
    {
      name: "charts",
      help: "route for charts view",
      title: { fr: "" },
      titleI18n: "routes.charts.title",
      urls: ["/charts"],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: "navbar-footer-01",
        },
      },
      pageRows: [
        {
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              colName: "chart",
              activated: true,
              colClass: "",
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "globalButton",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "pt-0 mt-0",
                  },
                },
                {
                  component: "numbers",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "numbers-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "apexchart",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "apexchart-01",
                    containerClass: "pb-0",
                  },
                },
                {
                  component: "apexchart",
                  activated: true,
                  smallScreenVerticalOrder: 5,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "apexchart-01bis",
                    containerClass: "mt-4 pt-3 pb-0",
                  },
                },
                {
                  component: "text",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "text-02",
                    containerClass: "pb-0",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ONLY TABLE
    {
      name: "table",
      help: "route for table view",
      title: { fr: "" },
      titleI18n: "routes.table.title",
      urls: ["/table"],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: "navbar-footer-01",
        },
      },
      pageRows: [
        {
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              colName: "table",
              activated: true,
              colClass: "",
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "table",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "table-01",
                    containerClass: "pb-0",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ONLY RAW DATA
    {
      name: "rawData",
      help: "route for rawData view",
      title: { fr: "" },
      titleI18n: "routes.rawData.title",
      urls: ["/rawData"],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: "navbar-footer-01",
        },
      },
      pageRows: [
        {
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              colName: "rawData",
              activated: true,
              colClass: "",
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: "rawData",
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "chart-01",
                    containerClass: "pb-0",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
