// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PAINT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

// CONSTANTS

// switch between facts on region / departement level
const ZOOM_THRESHOLD = 5.3
// const ZOOM_THRESHOLD_BIS = 5.4

// colors
// const FR_GOUV_BLUE = '#000091'
const PRIMARYFILLCOLOR = '#7373FF' // #572a99 #8393A7
const SECONDARYFILLCOLOR = '#526781'
const HIGHLIGHTCOLOR = '#572a99'

const OUTLINECOLOR = '#627BC1'
const OUTLINECOLOR2 = '#6c87ab'

// layer fonts : ["Open Sans Regular","Arial Unicode MS Regular"]

const fillPaintRegions = {
  'fill-color': [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    HIGHLIGHTCOLOR,
    SECONDARYFILLCOLOR
  ],
  'fill-outline-color': OUTLINECOLOR,
  'fill-opacity': [
    'case',
    [
      'boolean',
      ['feature-state', 'selected'],
      ['feature-state', 'hover'],
      false
    ],
    0.15,
    0
  ]
}
const fillPaintDepartements = {
  'fill-color': [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    HIGHLIGHTCOLOR,
    SECONDARYFILLCOLOR
  ],
  'fill-outline-color': OUTLINECOLOR,
  'fill-opacity': [
    'case',
    [
      'boolean',
      ['feature-state', 'selected'],
      ['feature-state', 'hover'],
      false
    ],
    0.35,
    0
  ]
}

const circlePaintAides = {
  'circle-opacity': 0.6,
  'circle-color': PRIMARYFILLCOLOR,
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['*', ['sqrt', ['number', ['get', 'montantMillions']]], 6],
    0,
    10,
    100,
    60
  ]
}

// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PROPERTIES SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

const aidesProperties = [
  {
    propName: 'montantMillions',
    itemField: 'montant',
    needFormatting: true,
    format: [
      {
        utilsFnName: 'toMillionsOrElse',
        params: { divider: 1000000, fixed: 2 }
      }
    ]
  },
  {
    propName: 'montant',
    itemField: 'montant',
    needFormatting: true,
    format: [{ utilsFnName: 'toFloat', params: undefined }]
  },
  { propName: 'nombre', itemField: 'nombre' }
]

// - - - - - - - - - - - - - - - - - - - - - //
// COMMON GEOJSON SOUURCES
// - - - - - - - - - - - - - - - - - - - - - //

const COMMON_SOURCES = {

  FranceRegions: {
    id: 'regions',
    help: 'geojson des contours des régions',
    from: 'url',
    url: '/datasets/geodata/regions-1000m.geojson', // local file in `/static` folder
    // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/static-data/geodata/regions-1000m.geojson',
    // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/frontend/datasets/geodata/regions-1000m.geojson',
    // url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson',
    type: 'geojson',
    generateId: true,
    licence: 'open licence',
    loadInStore: true,
    popupSettings: true
  },

  FranceDepartements: {
    id: 'departements',
    help: 'geojson des contours des départements',
    from: 'url',
    url: '/datasets/geodata/departements-1000m.geojson',
    // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/static-data/geodata/departements-1000m.geojson',
    // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/j_front/frontend/datasets/geodata/departements-1000m.geojson',
    // url  : 'https://raw.githubusercontent.com/etalab/DVF-app/master/static/donneesgeo/departements-100m.geojson',
    // url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson',
    type: 'geojson',
    generateId: true,
    licence: '',
    loadInStore: true,
    popupSettings: undefined
  }
}

// - - - - - - - - - - - - - - - - - - - - - //
// COMMON MAP CONFIGURATIONS ELEMENTS
// - - - - - - - - - - - - - - - - - - - - - //

const COMMON_OPTIONS = {
  FranceMetro: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceGuadeloupe: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceMartinique: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceGuyane: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceReunion: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceMayotte: {
    // ADAPT TO MAPBOX-GL-JS OPTIONS
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  }
}
const COMMON_LAYERS = {

  FranceRegionsFill: {
    id: 'regions-fill',
    type: 'fill',
    source: 'regions',
    layout: {
      visibility: 'visible'
    },
    paint: fillPaintRegions
  },
  FranceRegionsLines: {
    id: 'regions-lines',
    type: 'line',
    source: 'regions',
    layout: {
      visibility: 'visible'
    },
    paint: {
      'line-color': OUTLINECOLOR,
      'line-width': 1
    }
  },

  FranceDepartementsFill: {
    id: 'departements-fill',
    type: 'fill',
    source: 'departements',
    layout: {
      // visibility: 'none' ,
    },
    paint: fillPaintDepartements,
    minzoom: ZOOM_THRESHOLD
  },
  FranceDepartementsLines: {
    id: 'departements-lines',
    type: 'line',
    source: 'departements',
    layout: {
      // visibility: 'none' ,
    },
    paint: {
      'line-color': OUTLINECOLOR2,
      'line-width': 1,
      // 'line-gap-width': 1,
      'line-dasharray': [2, 3]
    },
    minzoom: ZOOM_THRESHOLD
  }

}
const COMMON_SIZES = {

  defaultSizes: {
    desktop: {
      maxHeight: undefined,
      maxHeightIframe: undefined
    },
    mobile: {
      maxHeight: undefined,
      maxHeightIframe: undefined
    }
  }

}
const COMMON_CLICK_EVENTS = {

  toggleSelectedOn: {
    funcName: 'toggleSelectedOn', funcParams: {}
  },
  goToPolygon: {
    funcName: 'goToPolygon',
    funcParams: {
      zoomRange: {
        minZoom: undefined,
        maxZoom: ZOOM_THRESHOLD
      },
      propName: 'code'
    }
  },
  goToPolygonPlus: {
    funcName: 'goToPolygon',
    funcParams: {
      zoomRange: {
        minZoom: undefined,
        maxZoom: ZOOM_THRESHOLD + 3
      },
      propName: 'code'
    }
  },
  toggleHighlightOn: { funcName: 'toggleHighlightOn', funcParams: {} },
  toggleHighlightOff: { funcName: 'toggleHighlightOff', funcParams: {} }
}

// - - - - - - - - - - - - - - - - - - - - - //
// MAIN MAPBOX COMPONENT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

export const configAppMap = {
  help: 'this file contains the setup for the MapboxGL layout / component',

  // MAPS

  settingsIds: [

    // ====================================== //
    // === DATASET : AIDES ================== //
    // ====================================== //

    // FRANCE METRO
    {
      id: 'map-france-aides-metro',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMetro,

      sizes: COMMON_SIZES.defaultSizes,

      // - - - - - - - - - - - - - - - - - - //
      // SOURCES LOADED AT MAP LOADED
      // - - - - - - - - - - - - - - - - - - //
      sources: [

        COMMON_SOURCES.FranceRegions,
        COMMON_SOURCES.FranceDepartements,
        {
          id: 'regions-aides',
          help: 'montants des aides au niveau regional - as geojson from raw',
          from: 'store',
          fromId: 'regions-aides-raw',
          type: 'geojson',
          generateId: true,
          needTransform: true,
          transformTo: {
            srcKey: 'reg',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'REG-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        },
        {
          id: 'departements-aides',
          help:
            'montants des aides au niveau départemental - as geojson from raw',
          from: 'store',
          fromId: 'departements-aides-raw',
          type: 'geojson',
          generateId: false,
          needTransform: true,
          transformTo: {
            srcKey: 'dep',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'DEP-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // MAPS
      // - - - - - - - - - - - - - - - - - - //
      maps: [
        {
          id: 'map-aides-reg',
          name: 'Carte aides par région',
          category: 'regional',
          properties: 'aides',
          data: 'aides',
          layers: [
            'regions-fill',
            'regions-lines',
            'regions-aides',
            'regions-aides-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'regions-fill',
              // zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,
                COMMON_CLICK_EVENTS.goToPolygonPlus,
                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: undefined,
                      maxZoom: ZOOM_THRESHOLD - 0.1
                    },
                    propName: 'code',
                    targets: [
                      // { from : 'store',
                      //   fromPropKey : undefined,
                      //   propValue : 'regional',
                      //   fromStoreData : 'initData',
                      //   fromDatasetId : 'infos',
                      //   fromDatasetKey : 'switchers',
                      //   fromDatasetField : undefined,
                      //   targetSpecialStoreId : 'levelname',
                      // },

                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-regions',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-aides-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-aides-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-aides-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                },

                // TO DO ...
                {
                  funcName: 'setChildrenPolygons',
                  funcParams: {
                    propName: 'code',
                    zoomRange: { minZoom: undefined, maxZoom: ZOOM_THRESHOLD },
                    targets: [
                      { targetSource: 'departement', targetPropName: 'region' }
                    ]
                  }
                }

                // { funcName : 'updateQuery',
                //   funcParams  : {
                //     propName : 'code',
                //     zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
                //     targets : [
                //       { dataFromSource : 'departement', targetPropName : 'region' },
                //     ]
                //   },
                // },
              ]
            },

            {
              event: 'mousemove',
              layer: 'regions-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOn
              ]
            },

            {
              event: 'mouseleave',
              layer: 'regions-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOff
              ]
            }
          ]
        },

        {
          id: 'map-aides-dep',
          name: 'Carte aides par departement',
          category: 'departemental',
          properties: 'aides',
          data: 'aides',
          layers: [
            'departements-fill',
            'departements-lines',
            'departements-aides',
            'departements-aides-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,
                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: ZOOM_THRESHOLD,
                      maxZoom: undefined
                    },
                    propName: 'code',
                    targets: [
                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-departements',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                }
              ]
            },

            {
              event: 'mousemove',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOn
              ]
            },

            {
              event: 'mouseleave',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOff
              ]
            }
          ]
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS
      // - - - - - - - - - - - - - - - - - - //
      layers: [
        // REGIONS
        COMMON_LAYERS.FranceRegionsFill,
        COMMON_LAYERS.FranceRegionsLines,
        {
          id: 'regions-aides',
          type: 'circle',
          source: 'regions-aides',
          layout: {
            visibility: 'visible'
          },
          maxzoom: ZOOM_THRESHOLD,
          paint: circlePaintAides
        },
        {
          id: 'regions-aides-montants',
          type: 'symbol',
          source: 'regions-aides',
          layout: {
            visibility: 'visible',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'], // OK
            'text-size': 14
          },
          maxzoom: ZOOM_THRESHOLD
        },

        // DEPARTEMENTS
        COMMON_LAYERS.FranceDepartementsFill,
        COMMON_LAYERS.FranceDepartementsLines,
        {
          id: 'departements-aides',
          type: 'circle',
          source: 'departements-aides',
          layout: {
            // visibility: 'none'
          },
          paint: circlePaintAides,
          minzoom: ZOOM_THRESHOLD
        },
        {
          id: 'departements-aides-montants',
          type: 'symbol',
          source: 'departements-aides',
          layout: {
            // visibility: 'none',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'],
            'text-size': 14
          },
          minzoom: ZOOM_THRESHOLD
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS VISIBILITY DRAWER
      // - - - - - - - - - - - - - - - - - - //
      maps_visibility: {
        title: { fr: 'calques' },
        is_activated: false,
        is_drawer_open: true,
        map_switches: [
          {
            id: 'regions',
            mapId: 'map-aides-reg',
            label: { fr: 'régions' },
            default_visible: true
          },
          {
            id: 'departements',
            mapId: 'map-aides-dep',
            label: { fr: 'départements' },
            default_visible: false
          }
        ]
      }
    },

    // GUYANE
    {
      id: 'map-france-aides-guyane',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuyane,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-aides-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers'
          ]
        }
      ]
    },

    // ====================================== //
    // === DATASET : PGE ==================== //
    // ====================================== //

    // FRANCE METRO
    {
      id: 'map-france-pge-metro',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMetro,

      sizes: COMMON_SIZES.defaultSizes,

      // - - - - - - - - - - - - - - - - - - //
      // SOURCES LOADED AT MAP LOADED
      // - - - - - - - - - - - - - - - - - - //
      sources: [
        COMMON_SOURCES.FranceRegions,
        COMMON_SOURCES.FranceDepartements,
        {
          id: 'regions-pge',
          help: 'montants des pge au niveau regional - as geojson from raw',
          from: 'store',
          fromId: 'regions-pge-raw',
          type: 'geojson',
          generateId: true,
          needTransform: true,
          transformTo: {
            srcKey: 'reg',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'REG-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        },
        {
          id: 'departements-pge',
          help:
            'montants des pge au niveau départemental - as geojson from raw',
          from: 'store',
          fromId: 'departements-pge-raw',
          type: 'geojson',
          generateId: false,
          needTransform: true,
          transformTo: {
            srcKey: 'dep',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'DEP-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // MAPS
      // - - - - - - - - - - - - - - - - - - //
      maps: [
        {
          id: 'map-pge-reg',
          name: 'Carte PGE par région',
          category: 'regional',
          properties: 'pge',
          data: 'pge',
          layers: [
            'regions-fill',
            'regions-lines',
            'regions-pge',
            'regions-pge-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'regions-fill',
              // zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,
                COMMON_CLICK_EVENTS.goToPolygonPlus,
                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: undefined,
                      maxZoom: ZOOM_THRESHOLD - 0.1
                    },
                    propName: 'code',
                    targets: [

                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-regions',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-pge-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-pge-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-pge-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                },

                // TO DO ...
                {
                  funcName: 'setChildrenPolygons',
                  funcParams: {
                    propName: 'code',
                    zoomRange: { minZoom: undefined, maxZoom: ZOOM_THRESHOLD },
                    targets: [
                      { targetSource: 'departement', targetPropName: 'region' }
                    ]
                  }
                }

                // { funcName : 'updateQuery',
                //   funcParams  : {
                //     propName : 'code',
                //     zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
                //     targets : [
                //       { dataFromSource : 'departement', targetPropName : 'region' },
                //     ]
                //   },
                // },
              ]
            },

            {
              event: 'mousemove',
              layer: 'regions-fill',
              functions: [
                { funcName: 'toggleHighlightOn', funcParams: {} }]
            },

            {
              event: 'mouseleave',
              layer: 'regions-fill',
              functions: [
                { funcName: 'toggleHighlightOff', funcParams: {} }
              ]
            }
          ]
        },

        {
          id: 'map-pge-dep',
          name: 'Carte PGE par departement',
          category: 'departemental',
          properties: 'pge',
          data: 'pge',
          layers: [
            'departements-fill',
            'departements-lines',
            'departements-pge',
            'departements-pge-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,
                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: ZOOM_THRESHOLD,
                      maxZoom: undefined
                    },
                    propName: 'code',
                    targets: [
                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-departements',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-aides-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                }
              ]
            },

            {
              event: 'mousemove',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOn
              ]
            },

            {
              event: 'mouseleave',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOff
              ]
            }
          ]
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS
      // - - - - - - - - - - - - - - - - - - //
      layers: [

        // REGIONS
        COMMON_LAYERS.FranceRegionsFill,
        COMMON_LAYERS.FranceRegionsLines,
        {
          id: 'regions-pge',
          type: 'circle',
          source: 'regions-pge',
          layout: {
            visibility: 'visible'
          },
          maxzoom: ZOOM_THRESHOLD,
          paint: circlePaintAides
        },
        {
          id: 'regions-pge-montants',
          type: 'symbol',
          source: 'regions-pge',
          layout: {
            visibility: 'visible',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'], // OK
            'text-size': 14
          },
          maxzoom: ZOOM_THRESHOLD
        },

        // DEPARTEMENTS
        COMMON_LAYERS.FranceDepartementsFill,
        COMMON_LAYERS.FranceDepartementsLines,
        {
          id: 'departements-pge',
          type: 'circle',
          source: 'departements-pge',
          layout: {
            // visibility: 'none'
          },
          paint: circlePaintAides,
          minzoom: ZOOM_THRESHOLD
        },
        {
          id: 'departements-pge-montants',
          type: 'symbol',
          source: 'departements-pge',
          layout: {
            // visibility: 'none',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'],
            'text-size': 14
          },
          minzoom: ZOOM_THRESHOLD
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS VISIBILITY DRAWER
      // - - - - - - - - - - - - - - - - - - //
      maps_visibility: {
        title: { fr: 'calques' },
        is_activated: false,
        is_drawer_open: true,
        map_switches: [
          {
            id: 'regions',
            mapId: 'map-pge-reg',
            label: { fr: 'régions' },
            default_visible: true
          },
          {
            id: 'departements',
            mapId: 'map-pge-dep',
            label: { fr: 'départements' },
            default_visible: false
          }
        ]
      }
    },

    // ====================================== //
    // === DATASET : REPORTS ================ //
    // ====================================== //

    // FRANCE METRO
    {
      id: 'map-france-report-metro',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMetro,

      sizes: COMMON_SIZES.defaultSizes,

      // - - - - - - - - - - - - - - - - - - //
      // SOURCES LOADED AT MAP LOADED
      // - - - - - - - - - - - - - - - - - - //
      sources: [
        COMMON_SOURCES.FranceRegions,
        COMMON_SOURCES.FranceDepartements,
        {
          id: 'regions-report',
          help: 'montants des reports au niveau regional - as geojson from raw',
          from: 'store',
          fromId: 'regions-report-raw',
          type: 'geojson',
          generateId: true,
          needTransform: true,
          transformTo: {
            srcKey: 'reg',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'REG-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        },
        {
          id: 'departements-report',
          help:
            'montants des reports au niveau départemental - as geojson from raw',
          from: 'store',
          fromId: 'departements-report-raw',
          type: 'geojson',
          generateId: false,
          needTransform: true,
          transformTo: {
            srcKey: 'dep',
            geoCanvasId: 'centers',
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: 'DEP-',
              canvasKeySuffix: ''
            },
            properties: aidesProperties,
            geometry: {
              type: 'Point'
            }
          },
          licence: ''
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // MAPS
      // - - - - - - - - - - - - - - - - - - //
      maps: [
        {
          id: 'map-report-reg',
          name: 'Carte reports par région',
          category: 'regional',
          properties: 'report',
          data: 'report',
          layers: [
            'regions-fill',
            'regions-lines',
            'regions-report',
            'regions-report-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'regions-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,
                COMMON_CLICK_EVENTS.goToPolygonPlus,
                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: undefined,
                      maxZoom: ZOOM_THRESHOLD - 0.1
                    },
                    propName: 'code',
                    targets: [

                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-regions',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-report-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-report-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'regions-report-raw',
                        fromDatasetKey: 'reg',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                },

                // TO DO ...
                {
                  funcName: 'setChildrenPolygons',
                  funcParams: {
                    propName: 'code',
                    zoomRange: { minZoom: undefined, maxZoom: ZOOM_THRESHOLD },
                    targets: [
                      { targetSource: 'departement', targetPropName: 'region' }
                    ]
                  }
                }

                // { funcName : 'updateQuery',
                //   funcParams  : {
                //     propName : 'code',
                //     zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
                //     targets : [
                //       { dataFromSource : 'departement', targetPropName : 'region' },
                //     ]
                //   },
                // },
              ]
            },

            {
              event: 'mousemove',
              layer: 'regions-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOn
              ]
            },

            {
              event: 'mouseleave',
              layer: 'regions-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOff
              ]
            }
          ]
        },

        {
          id: 'map-report-dep',
          name: 'Carte reports par departement',
          category: 'departemental',
          properties: 'report',
          data: 'report',
          layers: [
            'departements-fill',
            'departements-lines',
            'departements-report',
            'departements-report-montants'
          ],
          clicEvents: [
            {
              event: 'click',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleSelectedOn,

                {
                  funcName: 'updateDisplayedData',
                  funcParams: {
                    zoomRange: {
                      minZoom: ZOOM_THRESHOLD,
                      maxZoom: undefined
                    },
                    propName: 'code',
                    targets: [
                      {
                        from: 'store',
                        fromPropKey: 'code',
                        fromStoreData: 'initData',
                        fromDatasetId: 'taxo-departements',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'libelle',
                        targetSpecialStoreId: 'levelname'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-report-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-report-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'montant',
                        targetSpecialStoreId: 'montant',
                        format: [
                          {
                            utilsFnName: 'toMillionsOrElse',
                            params: { divider: 1000000, fixed: 2 }
                          }
                        ]
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-report-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                }
              ]
            },

            {
              event: 'mousemove',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOn
              ]
            },

            {
              event: 'mouseleave',
              layer: 'departements-fill',
              functions: [
                COMMON_CLICK_EVENTS.toggleHighlightOff
              ]
            }
          ]
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS
      // - - - - - - - - - - - - - - - - - - //
      layers: [
        // REGIONS
        COMMON_LAYERS.FranceRegionsFill,
        COMMON_LAYERS.FranceRegionsLines,
        {
          id: 'regions-report',
          type: 'circle',
          source: 'regions-report',
          layout: {
            visibility: 'visible'
          },
          maxzoom: ZOOM_THRESHOLD,
          paint: circlePaintAides
        },
        {
          id: 'regions-report-montants',
          type: 'symbol',
          source: 'regions-report',
          layout: {
            visibility: 'visible',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'], // OK
            'text-size': 14
          },
          maxzoom: ZOOM_THRESHOLD
        },

        // DEPARTEMENTS
        COMMON_LAYERS.FranceDepartementsFill,
        COMMON_LAYERS.FranceDepartementsLines,
        {
          id: 'departements-report',
          type: 'circle',
          source: 'departements-report',
          layout: {
            // visibility: 'none'
          },
          paint: circlePaintAides,
          minzoom: ZOOM_THRESHOLD
        },
        {
          id: 'departements-report-montants',
          type: 'symbol',
          source: 'departements-report',
          layout: {
            // visibility: 'none',
            'text-field': '{montantMillions} M€',
            'text-font': ['Open Sans Regular'],
            'text-size': 14
          },
          minzoom: ZOOM_THRESHOLD
        }
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS VISIBILITY DRAWER
      // - - - - - - - - - - - - - - - - - - //
      maps_visibility: {
        title: { fr: 'calques' },
        is_activated: false,
        is_drawer_open: true,
        map_switches: [
          {
            id: 'regions',
            mapId: 'map-report-reg',
            label: { fr: 'régions' },
            default_visible: true
          },
          {
            id: 'departements',
            mapId: 'map-report-dep',
            label: { fr: 'départements' },
            default_visible: false
          }
        ]
      }
    }

  ]
}
