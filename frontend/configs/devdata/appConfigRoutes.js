export const configAppRoutes = {
  help: "this file contains the setup for the routes",

  // ROUTES / PAGES
  routes: [
    {
      id: "home",
      name: "homepage",
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
          id: "row1",
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              id: "col1",
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
                    containerClass: "pt-2 pb-0",
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
                  },
                },
                {
                  component: "globalButtons",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "py-0 my-0",
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true,
                  },
                },
              ],
            },

            {
              id: "col2",
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
                  },
                },
              ],
            },
          ],
        },
        {
          id: "row2",
          rowNumber: 2,
          activated: false,
          help: "",
          columns: [
            {
              id: "col1",
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
                    id: "text-03",
                    containerClass: "pb-0",
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: false,
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
      id: "map",
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
          id: "row1",
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              id: "col1",
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
                  },
                },
                {
                  component: "globalButtons",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "pt-0 mt-0",
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
      id: "charts",
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
          id: "row1",
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              id: "col1",
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
                  },
                },
                {
                  component: "globalButtons",
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: "center",
                  align: "center",
                  settings: {
                    id: "global-button-01",
                    containerClass: "pt-0 mt-0",
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
      id: "table",
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
          id: "row1",
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              id: "col1",
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
      id: "rawData",
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
          containerClass: "",
          mobileIsVisibleDefault: true,
          desktopIsVisibleDefault: true,
        },
      },
      pageRows: [
        {
          id: "row1",
          rowNumber: 1,
          activated: true,
          help: "",
          columns: [
            {
              id: "col1",
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
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true,
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
