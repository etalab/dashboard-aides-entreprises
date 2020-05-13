// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PAINT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

// CONSTANTS

// switch between facts on region / departement level
const ZOOM_THRESHOLD = 5.3
// const ZOOM_THRESHOLD_BIS = 5.4

// colors
// const FR_GOUV_BLUE = '#000091'
const PRIMARYFILLCOLOR = '#7373FF'
const SECONDARYFILLCOLOR = '#526781'
const HIGHLIGHTCOLOR = '#572a99'

const OUTLINECOLOR = '#627BC1'
const OUTLINECOLOR2 = '#6c87ab'

const FILLCOLOR_FDS = '#7373FF'
const FILLCOLOR_PGE = '#00A17F'
const FILLCOLOR_REPORT = '#D66200'

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

const circlePaintFDS = {
  'circle-opacity': 0.6,
  'circle-color': FILLCOLOR_FDS,
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
const circlePaintPGE = {
  'circle-opacity': 0.6,
  'circle-color': FILLCOLOR_PGE,
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['*', ['sqrt', ['number', ['get', 'montantMillions']]], 6],
    0,
    10,
    100,
    40
  ]
}
const circlePaintREPORT = {
  'circle-opacity': 0.6,
  'circle-color': FILLCOLOR_REPORT,
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['*', ['sqrt', ['number', ['get', 'montantMillions']]], 6],
    0,
    10,
    100,
    50
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
// ADAPT TO MAPBOX-GL-JS OPTIONS

const COMMON_OPTIONS = {
  FranceMetro: {
    mapStyle: 'EtalabUrl',
    center: [46.2276, 2.2137],
    currentCenter: [46.2276, 2.2137],
    bbox: [41.277, -5.317, 51.234, 9.689],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceGuadeloupe: {
    mapStyle: 'EtalabUrl',
    center: [16.172, -61.406],
    currentCenter: [16.172, -61.406],
    bbox: [15.833, -61.81, 16.511, -61.003],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceMartinique: {
    mapStyle: 'EtalabUrl',
    center: [14.637, -61.02],
    currentCenter: [14.637, -61.02],
    bbox: [-14.395, 61.229, 14.879, -60.811],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceGuyane: {
    mapStyle: 'EtalabUrl',
    center: [3.931, -53.119],
    currentCenter: [3.931, -53.119],
    bbox: [2.111, -54.603, 5.751, -51.635],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceReunion: {
    mapStyle: 'EtalabUrl',
    center: [-21.13, 55.527],
    currentCenter: [-21.13, 55.527],
    bbox: [-21.389, 55.216, -20.872, 55.837],
    zoom: 4.8,
    maxZoom: 9.5,
    minZoom: 2
  },
  FranceMayotte: {
    mapStyle: 'EtalabUrl',
    center: [-12.818, 45.158],
    currentCenter: [-12.818, 45.158],
    bbox: [-13, 45.018, -12.637, 45.298],
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
    funcName: 'toggleSelectedOn',
    help: 'toggle selected polygon as on',
    funcParams: {}
  },
  goToPolygon: {
    funcName: 'goToPolygon',
    help: 'fly to polygon',
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
    help: 'fly to polygon with a slightly different zoom level',
    funcParams: {
      zoomRange: {
        minZoom: undefined,
        maxZoom: ZOOM_THRESHOLD + 3
      },
      propName: 'code'
    }
  },
  toggleHighlightOn: {
    funcName: 'toggleHighlightOn',
    help: 'highlight polygon / geo element as on',
    funcParams: {}
  },
  toggleHighlightOff: {
    funcName: 'toggleHighlightOff',
    help: 'highlight polygon / geo element as off',
    funcParams: {}
  },
  updateUrlPathRegions: {
    funcName: 'updateUrlPath',
    help: 'update url path without reloading page for constant focus object form dataset to dataset',
    funcParams: {
      zoomRange: {
        minZoom: undefined,
        maxZoom: ZOOM_THRESHOLD - 0.1
      },
      propName: 'code',
      targets: [
        {
          from: 'prop',
          urlArgs: {
            datasetid: 'regions',
            field: 'code',
            value: 'prop',
            zoom: undefined,
            highlight: undefined
          }
        }
      ]
    }
  },
  updateUrlPathDepartements: {
    funcName: 'updateUrlPath',
    help: 'update url path without reloading page for constant focus object form dataset to dataset',
    funcParams: {
      zoomRange: {
        minZoom: ZOOM_THRESHOLD - 0.1,
        maxZoom: undefined
      },
      propName: 'code',
      targets: [
        {
          from: 'prop',
          urlArgs: {
            datasetid: 'departements',
            field: 'code',
            value: 'prop',
            zoom: undefined,
            highlight: undefined
          }
        }
      ]
    }
  }

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

      // - - - - - - - - - - - - - - - - - - - - - - //
      // SOURCES LOADED AT MAP LOADED
      // - - - - - - - - - - - - - - - - - - - - - - //
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

      // - - - - - - - - - - - - - - - - - - - - - - //
      // MAPS : GROUPS OF LAYERS + CLICK EVENTS
      // - - - - - - - - - - - - - - - - - - - - - - //
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
                  help: 'update several data (targets) from store',
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
                COMMON_CLICK_EVENTS.updateUrlPathRegions,

                // TO DO ...
                {
                  funcName: 'setChildrenPolygons',
                  help: 'to do still',
                  funcParams: {
                    propName: 'code',
                    zoomRange: { minZoom: undefined, maxZoom: ZOOM_THRESHOLD },
                    targets: [
                      { targetSource: 'departement', targetPropName: 'region' }
                    ]
                  }
                }

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
                  help: 'update several data (targets) from store',
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
                },
                COMMON_CLICK_EVENTS.updateUrlPathDepartements
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

      // - - - - - - - - - - - - - - - - - - - - - - //
      // LAYERS : MAPBOX LAYERS
      // - - - - - - - - - - - - - - - - - - - - - - //
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
          paint: circlePaintFDS
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
          paint: circlePaintFDS,
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

      // - - - - - - - - - - - - - - - - - - - - - - //
      // LAYERS VISIBILITY DRAWER
      // - - - - - - - - - - - - - - - - - - - - - - //
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
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // GUADELOUPE
    {
      id: 'map-france-aides-guadeloupe',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuadeloupe,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-aides-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MARTINIQUE
    {
      id: 'map-france-aides-martinique',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMartinique,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-aides-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // LA REUNION
    {
      id: 'map-france-aides-la-reunion',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceReunion,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-aides-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MAYOTTE
    {
      id: 'map-france-aides-mayotte',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMayotte,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-aides-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
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
          name: 'Carte pge par région',
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
                  help: 'update several data (targets) from store',
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
                COMMON_CLICK_EVENTS.updateUrlPathRegions

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
                  help: 'update several data (targets) from store',
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
                        fromDatasetId: 'departements-pge-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: 'nombre',
                        targetSpecialStoreId: 'nombre'
                      },

                      {
                        from: 'store',
                        fromPropKey: 'code', // use props region code
                        fromStoreData: 'initData',
                        fromDatasetId: 'departements-pge-raw',
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
                        fromDatasetId: 'departements-pge-raw',
                        fromDatasetKey: 'dep',
                        fromDatasetField: undefined,
                        targetSpecialStoreId: 'focusObject'
                      }
                    ]
                  }
                },
                COMMON_CLICK_EVENTS.updateUrlPathDepartements
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
          paint: circlePaintPGE
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
          paint: circlePaintPGE,
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
    // GUYANE
    {
      id: 'map-france-pge-guyane',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuyane,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-pge-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // GUADELOUPE
    {
      id: 'map-france-pge-guadeloupe',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuadeloupe,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-pge-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MARTINIQUE
    {
      id: 'map-france-pge-martinique',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMartinique,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-pge-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // LA REUNION
    {
      id: 'map-france-pge-la-reunion',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceReunion,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-pge-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MAYOTTE
    {
      id: 'map-france-pge-mayotte',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMayotte,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-pge-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
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
                  help: 'update several data (targets) from store',
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
                COMMON_CLICK_EVENTS.updateUrlPathRegions

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
                  help: 'update several data (targets) from store',
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
                },
                COMMON_CLICK_EVENTS.updateUrlPathDepartements
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
          paint: circlePaintREPORT
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
          paint: circlePaintREPORT,
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
    },
    // GUYANE
    {
      id: 'map-france-report-guyane',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuyane,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-report-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // GUADELOUPE
    {
      id: 'map-france-report-guadeloupe',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceGuadeloupe,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-report-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MARTINIQUE
    {
      id: 'map-france-report-martinique',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMartinique,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-report-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // LA REUNION
    {
      id: 'map-france-report-la-reunion',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceReunion,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-report-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    },
    // MAYOTTE
    {
      id: 'map-france-report-mayotte',
      isActivated: true,
      titleI18n: 'maps.map01.title',

      map_options: COMMON_OPTIONS.FranceMayotte,

      maps_visibility: {
        is_activated: false
      },

      copySettingsFrom: [
        {
          copyFromId: 'map-france-report-metro',
          fieldsToCopy: [
            'sources',
            'maps',
            'layers',
            'maps_visibility'
          ]
        }
      ]
    }

  ]
}
