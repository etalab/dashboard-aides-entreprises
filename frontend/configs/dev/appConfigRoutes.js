const COMMON_TARGETS = {
  setLevelFrom: {},
  setNombreFrom: {},
  setMontantsFrom: {},

  setFocusObjectFDS: {},
  setFocusObjectPGE: {},
  setFocusObjectREPORT: {}

}
const COMMON_URL_FOCUS = {
  setFocusObjects: {
    urlArgs: [
      'datastore',
      'datasetid',
      'field',
      'value'
    ],
    functions: [
      {
        funcName: 'updateData',
        help: 'set store/data/specialStore',
        funcParams: {
          targets: [

            // {
            //   from: 'store',
            //   fromPropKey: 'code',
            //   fromStoreData: 'initData',
            //   fromDatasetId: 'taxo-regions',
            //   fromDatasetKey: 'reg',
            //   fromDatasetField: 'libelle',
            //   targetSpecialStoreId: 'levelname'
            // },
            // {
            //   from: 'store',
            //   fromPropKey: 'code', // use props region code
            //   fromStoreData: 'initData',
            //   fromDatasetId: 'regions-aides-raw',
            //   fromDatasetKey: 'reg',
            //   fromDatasetField: 'nombre',
            //   targetSpecialStoreId: 'nombre'
            // },
            // {
            //   from: 'store',
            //   fromPropKey: 'code', // use props region code
            //   fromStoreData: 'initData',
            //   fromDatasetId: 'regions-aides-raw',
            //   fromDatasetKey: 'reg',
            //   fromDatasetField: 'montant',
            //   targetSpecialStoreId: 'montant',
            //   format: [
            //     {
            //       utilsFnName: 'toMillionsOrElse',
            //       params: { divider: 1000000, fixed: 2 }
            //     }
            //   ]
            // },
            // {
            //   from: 'store',
            //   fromPropKey: 'code', // use props region code
            //   fromStoreData: 'initData',
            //   fromDatasetId: 'regions-aides-raw',
            //   fromDatasetKey: 'reg',
            //   fromDatasetField: undefined,
            //   targetSpecialStoreId: 'focusObject'
            // }

          ]
        }
      }
    ]
  }
}

export const configAppRoutes = {
  help: 'this file contains the setup for the routes',

  // ROUTES / PAGES
  routes: [

    // ============================================================= //
    // HOME / FDS
    // ============================================================= //
    {
      id: 'fds',
      name: 'homepage',
      help: 'route home viewfor ',
      title: { fr: '' },
      titleI18n: 'routes.home.title',
      urls: ['/', '/fds'],
      sourcesIds: [
        'national-aides-raw',
        'regions-aides-raw',
        'departements-aides-raw'
      ],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'Numbers and tables',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4',
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-fds-title',
                    containerClass: 'pt-2 pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'numbers',
                  activated: true,
                  smallScreenVerticalOrder: 3,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'numbers-01',
                    containerClass: 'py-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'globalButtons',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'global-button-fds',
                    containerClass: 'py-0 my-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-fds',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-fds-categ-jur-pie',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-fds-effectifs',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-fds-infos',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            },

            {
              id: 'col2',
              colName: 'main map',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-7 col-xl-8',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'map',
                  activated: true,
                  smallScreenVerticalOrder: 2,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'map-france-aides-metro',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'row2',
          rowNumber: 2,
          activated: false,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'text',
              activated: true,
              colClass: '',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-03',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: false
                  }
                }
              ]
            }
          ]
        }
      ],
      setUpFocus: COMMON_URL_FOCUS.setFocusObjects
    },

    // ============================================================= //
    // PGE
    // ============================================================= //
    {
      id: 'pge',
      name: 'pge page',
      help: 'route view for pge dataset',
      title: { fr: '' },
      titleI18n: 'routes.pge.title',
      urls: ['/pge'],
      sourcesIds: [
        'national-pge-raw',
        'regions-pge-raw',
        'departements-pge-raw'
      ],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'Numbers and tables',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4',
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-pge-title',
                    containerClass: 'pt-2 pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'numbers',
                  activated: true,
                  smallScreenVerticalOrder: 3,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'numbers-01',
                    containerClass: 'py-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'globalButtons',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'global-button-pge',
                    containerClass: 'py-0 my-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-pge',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-pge-infos',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            },

            {
              id: 'col2',
              colName: 'main map',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-7 col-xl-8',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'map',
                  activated: true,
                  smallScreenVerticalOrder: 2,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'map-france-pge-metro',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'row2',
          rowNumber: 2,
          activated: false,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'text',
              activated: true,
              colClass: '',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-03',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: false
                  }
                }
              ]
            }
          ]
        }
      ],
      setUpFocus: COMMON_URL_FOCUS.setFocusObjects
    },

    // ============================================================= //
    // REPORT
    // ============================================================= //
    {
      id: 'reports',
      name: 'report page',
      help: 'route view for report dataset',
      title: { fr: '' },
      titleI18n: 'routes.report.title',
      urls: ['/reports'],
      sourcesIds: [
        'national-report-raw',
        'regions-report-raw',
        'departements-report-raw'
      ],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'Numbers and tables',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4',
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-report-title',
                    containerClass: 'pt-2 pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'numbers',
                  activated: true,
                  smallScreenVerticalOrder: 3,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'numbers-01',
                    containerClass: 'py-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'globalButtons',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'global-button-report',
                    containerClass: 'py-0 my-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 4,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-report',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-report-infos',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            },

            {
              id: 'col2',
              colName: 'main map',
              activated: true,
              colClass: 'col-12 col-sm-12 col-md-6 col-lg-7 col-xl-8',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'map',
                  activated: true,
                  smallScreenVerticalOrder: 2,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'map-france-report-metro',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'row2',
          rowNumber: 2,
          activated: false,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'text',
              activated: true,
              colClass: '',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-03',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: false,
                    desktopIsVisibleDefault: false
                  }
                }
              ]
            }
          ]
        }
      ],
      setUpFocus: COMMON_URL_FOCUS.setFocusObjects

    },

    // ============================================================= //
    // ============================================================= //
    // ============================================================= //

    // ONLY MAP
    {
      id: 'map',
      name: 'map',
      help: 'route map viewfor ',
      title: { fr: '' },
      titleI18n: 'routes.map.title',
      urls: ['/map'],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'map',
              activated: true,
              colClass: '',
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'globalButtons',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'global-button-01',
                    containerClass: 'pt-0 mt-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'numbers',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'numbers-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'map',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'map-france-metro',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ONLY CHARTS
    {
      id: 'charts',
      name: 'charts',
      help: 'route for charts view',
      title: { fr: '' },
      titleI18n: 'routes.charts.title',
      urls: ['/charts'],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'chart',
              activated: true,
              colClass: '',
              hasScrollbar: true,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'globalButtons',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'global-button-01',
                    containerClass: 'pt-0 mt-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'numbers',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'numbers-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'apexchart',
                  activated: true,
                  smallScreenVerticalOrder: 5,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'apexchart-01bis',
                    containerClass: 'mt-4 pt-3 pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                },
                {
                  component: 'text',
                  activated: true,
                  smallScreenVerticalOrder: 1,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'text-02',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ONLY TABLE
    {
      id: 'table',
      name: 'table',
      help: 'route for table view',
      title: { fr: '' },
      titleI18n: 'routes.table.title',
      urls: ['/table'],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01'
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'table',
              activated: true,
              colClass: '',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'table',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'table-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ONLY RAW DATA
    {
      id: 'rawData',
      name: 'rawData',
      help: 'route for rawData view',
      title: { fr: '' },
      titleI18n: 'routes.rawData.title',
      urls: ['/rawData'],
      rawHtml: undefined,
      navbarFooter: {
        activated: true,
        settings: {
          id: 'navbar-footer-01',
          containerClass: '',
          mobileIsVisibleDefault: true,
          desktopIsVisibleDefault: true
        }
      },
      pageRows: [
        {
          id: 'row1',
          rowNumber: 1,
          activated: true,
          help: '',
          columns: [
            {
              id: 'col1',
              colName: 'rawData',
              activated: true,
              colClass: '',
              hasScrollbar: false,
              smallScreenVerticalOrder: undefined,
              colRows: [
                {
                  component: 'rawData',
                  activated: true,
                  smallScreenVerticalOrder: undefined,
                  justify: 'center',
                  align: 'center',
                  settings: {
                    id: 'chart-01',
                    containerClass: 'pb-0',
                    mobileIsVisibleDefault: true,
                    desktopIsVisibleDefault: true
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
