// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PAINT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

// CONSTANTS

// switch between facts on region / departement level
const ZOOM_THRESHOLD = 5.3
// const ZOOM_THRESHOLD_BIS = 5.4

// colors
const FR_GOUV_BLUE = "#000091"
const PRIMARYFILLCOLOR = "#7373FF" // #572a99 #8393A7
const SECONDARYFILLCOLOR = "#526781"
const HIGHLIGHTCOLOR = "#572a99"

const OUTLINECOLOR = "#627BC1"
const OUTLINECOLOR2 = "#6c87ab"

// layer fonts : ["Open Sans Regular","Arial Unicode MS Regular"]

const fillPaint_ = {
  "fill-color": SECONDARYFILLCOLOR,
  "fill-outline-color": OUTLINECOLOR,
  "fill-opacity": [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    0.15,
    0,
  ],
}

const fillPaint = {
  "fill-color": [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    HIGHLIGHTCOLOR,
    SECONDARYFILLCOLOR,
  ],
  "fill-outline-color": OUTLINECOLOR,
  "fill-opacity": [
    "case",
    [
      "boolean",
      ["feature-state", "selected"],
      ["feature-state", "hover"],
      false,
    ],
    0.1,
    0,
  ],
}

const circlePaintAides = {
  "circle-opacity": 0.6,
  "circle-color": PRIMARYFILLCOLOR,
  "circle-radius": [
    "interpolate",
    ["linear"],
    ["*", ["sqrt", ["number", ["get", "montantMillions"]]], 6],
    0,
    10,
    100,
    70,
  ],
}

// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PROPERTIES SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

const aidesProperties = [
  {
    propName: "montantMillions",
    itemField: "montant",
    needFormatting: true,
    format: [
      {
        utilsFnName: "toMillionsOrElse",
        params: { divider: 1000000, fixed: 2 },
      },
    ],
  },
  {
    propName: "montant",
    itemField: "montant",
    needFormatting: true,
    format: [{ utilsFnName: "toFloat", params: undefined }],
  },
  { propName: "nombre", itemField: "nombre" },
]

// - - - - - - - - - - - - - - - - - - - - - //
// MAPBOX COMPONENT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

export const configAppMap = {
  help: "this file contains the setup for the MapboxGL layout / component",

  // MAPS

  settingsIds: [
    // FRANCE METRO
    {
      id: "map-base",
      isActivated: true,
      titleI18n: "maps.map01.title",

      map_options: {
        // ADAPT TO MAPBOX-GL-JS OPTIONS => check `mapboxVectorStyles.js`

        // mapStyle         : "testRasterVoyager", // EtalabFile | testRasterVoyager (ok) | RasterVoyager
        mapStyle: "EtalabUrl", // EtalabFile | testRasterVoyager (ok) | RasterVoyager
        center: [46.2276, 2.2137],
        currentCenter: [46.2276, 2.2137],
        zoom: 5,
        maxZoom: 18,
        minZoom: 2,
      },

      // - - - - - - - - - - - - - - - - - - //
      // SOURCES LOADED AT MAP LOADED
      // - - - - - - - - - - - - - - - - - - //
      sources: [
        // http://etalab-datasets.geo.data.gouv.fr/contours-administratifs/latest/geojson/
        // from : url | store

        // {
        //   id   : 'centers',
        //   help : 'geojson des centres',
        //   from : 'url',
        //   url  : '/datasets/geodata/centers.json',
        //   type : 'geojson',
        //   needTransform : true,
        //   licence : 'open licence',
        //   canChange : false,
        // },

        {
          id: "regions",
          help: "geojson des contours des régions",
          from: "url",
          url: "/datasets/geodata/regions-100m.geojson", // local file in `/static` folder
          // url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/j_front/frontend/datasets/geodata/regions-100m.geojson',
          type: "geojson",
          generateId: true,
          licence: "open licence",
          loadInStore: true,
          popupSettings: true,
        },

        {
          id: "regions-aides",
          help: "montants des aides au niveau regional - as geojson from raw",
          from: "store",
          fromId: "regions-aides-raw",
          type: "geojson",
          generateId: true,
          needTransform: true,
          transformTo: {
            srcKey: "reg",
            geoCanvasId: "centers",
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: "REG-",
              canvasKeySuffix: "",
            },
            properties: aidesProperties,
            geometry: {
              type: "Point",
            },
          },
          licence: "",
        },

        {
          id: "departements",
          help: "geojson des contours des départements",
          from: "url",
          url: "/datasets/geodata/departements-100m.geojson",
          // url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/DVF-app/master/static/donneesgeo/departements-100m.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/j_front/frontend/datasets/geodata/departements-100m.geojson',
          type: "geojson",
          generateId: true,
          licence: "",
          loadInStore: true,
          popupSettings: undefined,
        },

        {
          id: "departements-aides",
          help:
            "montants des aides au niveau départemental - as geojson from raw",
          from: "store",
          fromId: "departements-aides-raw",
          type: "geojson",
          generateId: false,
          needTransform: true,
          transformTo: {
            srcKey: "dep",
            geoCanvasId: "centers",
            canvasKey: {
              keyIsFieldName: true,
              field: undefined,
              canvasKeyPrefix: "DEP-",
              canvasKeySuffix: "",
            },
            properties: aidesProperties,
            geometry: {
              type: "Point",
            },
          },
          licence: "",
        },
      ],

      // - - - - - - - - - - - - - - - - - - //
      // MAPS
      // - - - - - - - - - - - - - - - - - - //
      maps: [
        {
          id: "map-aides-reg",
          name: "Carte aides par région",
          category: "regional",
          properties: "aides",
          data: "aides",
          layers: [
            "regions-fill",
            "regions-lines",
            "regions-aides",
            "regions-aides-montants",
          ],
          clicEvents: [
            {
              event: "click",
              layer: "regions-fill",
              // zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
              functions: [
                { funcName: "toggleSelectedOn", funcParams: {} },
                {
                  funcName: "goToPolygon",
                  funcParams: {
                    zoomRange: {
                      minZoom: undefined,
                      maxZoom: ZOOM_THRESHOLD + 3,
                    },
                    propName: "code",
                  },
                },
                {
                  funcName: "updateDisplayedData",
                  funcParams: {
                    zoomRange: {
                      minZoom: undefined,
                      maxZoom: ZOOM_THRESHOLD - 0.1,
                    },
                    propName: "code",
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
                        from: "store",
                        fromPropKey: "code",
                        fromStoreData: "initData",
                        fromDatasetId: "taxo-regions",
                        fromDatasetKey: "reg",
                        fromDatasetField: "libelle",
                        targetSpecialStoreId: "levelname",
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "regions-aides-raw",
                        fromDatasetKey: "reg",
                        fromDatasetField: "nombre",
                        targetSpecialStoreId: "nombre",
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "regions-aides-raw",
                        fromDatasetKey: "reg",
                        fromDatasetField: "montant",
                        targetSpecialStoreId: "montant",
                        format: [
                          {
                            utilsFnName: "toMillionsOrElse",
                            params: { divider: 1000000, fixed: 2 },
                          },
                        ],
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "regions-aides-raw",
                        fromDatasetKey: "reg",
                        fromDatasetField: undefined,
                        targetSpecialStoreId: "focusObject",
                      },
                    ],
                  },
                },

                // TO DO ...
                {
                  funcName: "setChildrenPolygons",
                  funcParams: {
                    propName: "code",
                    zoomRange: { minZoom: undefined, maxZoom: ZOOM_THRESHOLD },
                    targets: [
                      { targetSource: "departement", targetPropName: "region" },
                    ],
                  },
                },

                // { funcName : 'updateQuery',
                //   funcParams  : {
                //     propName : 'code',
                //     zoomRange : { minZoom : undefined, maxZoom : ZOOM_THRESHOLD },
                //     targets : [
                //       { dataFromSource : 'departement', targetPropName : 'region' },
                //     ]
                //   },
                // },
              ],
            },

            {
              event: "mousemove",
              layer: "regions-fill",
              functions: [{ funcName: "toggleHighlightOn", funcParams: {} }],
            },

            {
              event: "mouseleave",
              layer: "regions-fill",
              functions: [{ funcName: "toggleHighlightOff", funcParams: {} }],
            },
          ],
        },

        {
          id: "map-aides-dep",
          name: "Carte aides par departement",
          category: "departemental",
          properties: "aides",
          data: "aides",
          layers: [
            "departements-fill",
            "departements-lines",
            "departements-aides",
            "departements-aides-montants",
          ],
          clicEvents: [
            {
              event: "click",
              layer: "departements-fill",
              functions: [
                {
                  funcName: "toggleSelectedOn",
                  funcParams: {
                    zoomRange: {
                      minZoom: ZOOM_THRESHOLD,
                      maxZoom: undefined,
                    },
                  },
                },

                // { funcName    : "goToPolygon",
                //   funcParams  : {
                //     zoomRange : { minZoom : ZOOM_THRESHOLD, maxZoom : undefined },
                //     propName : 'code',
                //   },
                // },

                {
                  funcName: "updateDisplayedData",
                  funcParams: {
                    zoomRange: {
                      minZoom: ZOOM_THRESHOLD,
                      maxZoom: undefined,
                    },
                    propName: "code",
                    targets: [
                      {
                        from: "store",
                        fromPropKey: "code",
                        fromStoreData: "initData",
                        fromDatasetId: "taxo-departements",
                        fromDatasetKey: "dep",
                        fromDatasetField: "libelle",
                        targetSpecialStoreId: "levelname",
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "departements-aides-raw",
                        fromDatasetKey: "dep",
                        fromDatasetField: "nombre",
                        targetSpecialStoreId: "nombre",
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "departements-aides-raw",
                        fromDatasetKey: "dep",
                        fromDatasetField: "montant",
                        targetSpecialStoreId: "montant",
                        format: [
                          {
                            utilsFnName: "toMillionsOrElse",
                            params: { divider: 1000000, fixed: 2 },
                          },
                        ],
                      },

                      {
                        from: "store",
                        fromPropKey: "code", // use props region code
                        fromStoreData: "initData",
                        fromDatasetId: "departements-aides-raw",
                        fromDatasetKey: "dep",
                        fromDatasetField: undefined,
                        targetSpecialStoreId: "focusObject",
                      },
                    ],
                  },
                },
              ],
            },

            {
              event: "mousemove",
              layer: "departements-fill",
              functions: [{ funcName: "toggleHighlightOn", funcParams: {} }],
            },

            {
              event: "mouseleave",
              layer: "departements-fill",
              functions: [{ funcName: "toggleHighlightOff", funcParams: {} }],
            },
          ],
        },
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS
      // - - - - - - - - - - - - - - - - - - //
      layers: [
        // REGIONS
        {
          id: "regions-fill",
          type: "fill",
          source: "regions",
          layout: {
            visibility: "visible",
          },
          paint: fillPaint,
        },
        {
          id: "regions-lines",
          type: "line",
          source: "regions",
          layout: {
            visibility: "visible",
          },
          paint: {
            "line-color": OUTLINECOLOR,
            "line-width": 1,
          },
        },
        {
          id: "regions-aides",
          type: "circle",
          source: "regions-aides",
          layout: {
            visibility: "visible",
          },
          maxzoom: ZOOM_THRESHOLD,
          paint: circlePaintAides,
        },
        {
          id: "regions-aides-montants",
          type: "symbol",
          source: "regions-aides",
          layout: {
            visibility: "visible",
            "text-field": "{montantMillions} M€",
            "text-font": ["Open Sans Regular"], // OK
            "text-size": 14,
          },
          maxzoom: ZOOM_THRESHOLD,
        },

        // DEPARTEMENTS
        {
          id: "departements-fill",
          type: "fill",
          source: "departements",
          layout: {
            // visibility: 'none' ,
          },
          paint: fillPaint,
          minzoom: ZOOM_THRESHOLD,
        },
        {
          id: "departements-lines",
          type: "line",
          source: "departements",
          layout: {
            // visibility: 'none' ,
          },
          paint: {
            "line-color": OUTLINECOLOR2,
            "line-width": 1,
            // 'line-gap-width': 1,
            "line-dasharray": [2, 3],
          },
          minzoom: ZOOM_THRESHOLD,
        },
        {
          id: "departements-aides",
          type: "circle",
          source: "departements-aides",
          layout: {
            // visibility: 'none'
          },
          paint: circlePaintAides,
          minzoom: ZOOM_THRESHOLD,
        },
        {
          id: "departements-aides-montants",
          type: "symbol",
          source: "departements-aides",
          layout: {
            // visibility: 'none',
            "text-field": "{montantMillions} M€",
            "text-font": ["Open Sans Regular"],
            "text-size": 14,
          },
          minzoom: ZOOM_THRESHOLD,
        },
      ],

      // - - - - - - - - - - - - - - - - - - //
      // LAYERS VISIBILITY DRAWER
      // - - - - - - - - - - - - - - - - - - //
      maps_visibility: {
        title: { fr: "calques" },
        is_activated: false,
        is_drawer_open: true,
        map_switches: [
          {
            id: "regions",
            mapId: "map-aides-reg",
            label: { fr: "régions" },
            default_visible: true,
          },
          {
            id: "departements",
            mapId: "map-aides-dep",
            label: { fr: "départements" },
            default_visible: false,
          },
        ],
      },
    },

    // FRANCE METRO
    {
      id: "map-france-metro",
      isActivated: true,
      titleI18n: "maps.map01.title",

      map_options: {
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle: "EtalabUrl",
        center: [46.2276, 2.2137],
        currentCenter: [46.2276, 2.2137],
        zoom: 4.8,
        maxZoom: 8,
        minZoom: 2,
      },

      copySettingsFrom: [
        {
          copyFromId: "map-base",
          fieldsToCopy: [
            "sources",
            "notShownFor",
            "maps",
            "layers",
            "maps_visibility",
          ],
        },
      ],
    },

    // GUYANE
    {
      id: "map-guyane",
      isActivated: true,
      titleI18n: "maps.map01.title",

      map_options: {
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle: "EtalabUrl", // Etalab
        center: [46.2276, 2.2137],
        currentCenter: [46.2276, 2.2137],
        zoom: 5,
        maxZoom: 18,
        minZoom: 2,
      },

      maps_visibility: {
        is_activated: false,
      },

      copySettingsFrom: [
        {
          copyFromId: "map-base",
          fieldsToCopy: ["sources", "maps", "layers"],
        },
      ],
    },

    // REUNION
    {
      id: "map-reunion",
      isActivated: true,
      titleI18n: "maps.map01.title",

      map_options: {
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle: "EtalabUrl", // Etalab
        center: [46.2276, 2.2137],
        currentCenter: [46.2276, 2.2137],
        zoom: 5,
        maxZoom: 18,
        minZoom: 2,
      },

      maps_visibility: {
        is_activated: false,
      },

      copySettingsFrom: [
        {
          copyFromId: "map-base",
          fieldsToCopy: ["sources", "maps", "layers"],
        },
      ],
    },

    // AUTRES...
    {
      id: "map-autre",
      isActivated: true,
      titleI18n: "maps.map01.title",

      map_options: {
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle: "EtalabUrl", // Etalab
        center: [46.2276, 2.2137],
        currentCenter: [46.2276, 2.2137],
        zoom: 5,
        maxZoom: 18,
        minZoom: 2,
      },

      maps_visibility: {
        is_activated: false,
      },

      copySettingsFrom: [
        {
          copyFromId: "map-base",
          fieldsToCopy: ["sources", "maps", "layers"],
        },
      ],
    },
  ],
}
