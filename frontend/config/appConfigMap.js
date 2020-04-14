
// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PAINT SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

  const fillPaint = {
    'fill-color': '#2a4ba9',
    'fill-outline-color': '#627BC1',
    'fill-opacity': ['case',
      ['boolean', ['feature-state', 'hover'], false],
      0.2,
      0
    ]
  }

  const circlePaintAides = {
    'circle-opacity': 0.4,
    'circle-color': '#000091',
    'circle-radius': [
      'interpolate', ['linear'],
      ['*', ['sqrt', ['number', ['get', 'montantMillions']]], 6],
      0, 10,
      100, 70
    ]
  }


// - - - - - - - - - - - - - - - - - - - - - //
// COMMON PROPERTIES SETTINGS
// - - - - - - - - - - - - - - - - - - - - - //

  const aidesProperties = [
    { propName : "montantMillions",  
      itemField : "montant",
      needFormatting : true,
      format : [
        { utilsFnName : 'toMillionsOrElse',
          params : { divider: 1000000, fixed: 2 },
        },
      ]
    },
    { propName : "montant",
      itemField : "montant",
      needFormatting : true,
      format : [
        { utilsFnName : 'toFloat',
          params : undefined,
        },
      ]
    },
    { propName : "nombre",
      itemField : "nombre",
    },
  ]


// - - - - - - - - - - - - - - - - - - - - - //
// MAPBOX COMPONENT SETTINGS 
// - - - - - - - - - - - - - - - - - - - - - //

export const configAppMap = {

  help : "this file contains the setup for the MapboxGL layout / component",

  // MAPS 

  settingsIds : [


    // FRANCE METRO
    { id : "map-base",
      isActivated : true,
      titleI18n : "maps.map01.title",

      map_options   : {
    
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle         : "testRasterVoyager", // EtalabFile | testRasterVoyager (ok) | RasterVoyager
        center           : [46.2276, 2.2137],
        currentCenter    : [46.2276, 2.2137],
        zoom             : 5,
        maxZoom          : 18,
        minZoom          : 2,

      },

      // SOURCES LOADED AT MAP LOADED
      sources : [

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

        { id   : 'regions',
          help : 'geojson des contours des régions',
          from : 'url',   
          url  : '/datasets/geodata/regions-100m.geojson', // local file in `/static` folder
          // url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/j_front/frontend/datasets/geodata/regions-100m.geojson',
          type : 'geojson',
          generateId: true,
          licence : 'open licence',
          loadInStore    : true,
          popupSettings  : true,
        },

        { id   : 'regions-aides',
          help : 'montants des aides au niveau regional - as geojson from raw',
          from : 'store',
          fromId : 'regions-aides-raw',
          type : 'geojson',
          generateId: true,
          needTransform : true,
          transformTo : {
            srcKey : 'reg',
            geoCanvasId : 'centers',
            canvasKey : { 
              keyIsFieldName : true,
              field : undefined, 
              canvasKeyPrefix : 'REG-',
              canvasKeySuffix : '' 
            },
            properties : aidesProperties,
            geometry : {
              type : 'Point'
            },
          },
          licence : '',
        },

        { id   : 'departements',
          help : 'geojson des contours des départements',
          from : 'url',
          url  : '/datasets/geodata/departements-100m.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/DVF-app/master/static/donneesgeo/departements-100m.geojson',
          // url  : 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/j_front/frontend/datasets/geodata/departements-100m.geojson',
          type : 'geojson',
          generateId: true,
          licence : '',
          loadInStore    : false,
          popupSettings  : undefined,
        },

        { id   : 'departements-aides',
          help : 'montants des aides au niveau départemental - as geojson from raw',
          from : 'store',
          fromId : 'departements-aides-raw',
          type : 'geojson',
          generateId: false,
          needTransform : true,
          transformTo : {
            srcKey : 'dep',
            geoCanvasId : 'centers',
            canvasKey : { 
              keyIsFieldName : true,
              field : undefined, 
              canvasKeyPrefix : 'DEP-',
              canvasKeySuffix : '' 
            },
            properties : aidesProperties,
            geometry : {
              type : 'Point'
            },
          },
          licence : '',
        },

      ],
      
      // MAPS
      maps : [
    
        { id : "map-aides-reg",
          name: 'Carte aides par région',
          category: 'regional',
          properties: 'aides',
          data: "aides",
          layers: [
            "regions-fill", 
            "regions-lines",
            "regions-aides",
            "regions-aides-montants",
          ],
          clicEvents : [
            { 
              event : 'click',
              layer : 'regions-fill',
              functions : [ 
                { funcName    : "goToPolygon",
                  funcParams  : { 
                    propName : 'code',
                  },
                }, 
                { funcName : 'updateDisplayedData',
                  funcParams  : { 
                    propName : 'code', 
                    targets : [

                      { from : 'store', 
                        fromPropKey : undefined,
                        propValue : 'regional',
                        fromStoreData : 'initData',
                        fromDatasetId : 'infos',
                        fromDatasetKey : 'switchers',
                        fromDatasetField : undefined,
                        targetSpecialStoreId : 'levelname', 
                      },

                      { from : 'store',
                        fromPropKey : 'code', // use props region code
                        fromStoreData : 'initData',
                        fromDatasetId : 'regions-aides-raw',
                        fromDatasetKey : 'reg',
                        fromDatasetField : 'nombre',
                        targetSpecialStoreId : 'nombre', 
                      },

                      { from : 'store',
                        fromPropKey : 'code', // use props region code
                        fromStoreData : 'initData',
                        fromDatasetId : 'regions-aides-raw',
                        fromDatasetKey : 'reg',
                        fromDatasetField : 'montant',
                        targetSpecialStoreId : 'montant', 
                        format : [
                          { utilsFnName : 'toMillionsOrElse',
                            params : { divider: 1000000, fixed:2 },
                          },
                        ],
                      },

                      { from : 'store',
                        fromPropKey : 'code', // use props region code
                        fromStoreData : 'initData',
                        fromDatasetId : 'regions-aides-raw',
                        fromDatasetKey : 'reg',
                        fromDatasetField : undefined,
                        targetDatasetId : 'infos', 
                        targetSpecialStoreId : 'focusObject', 
                      },

                    ]
                  },
                },


                { funcName : 'setChildrenPolygons',
                  funcParams  : { 
                    propName : 'code', 
                    targets : [ 
                      { targetSource : 'departement', 
                        targetPropName : 'region' 
                      },
                    ],
                  }
                },


                // { funcName : 'updateQuery',
                //   funcParams  : { 
                //     propName : 'code',
                //     targets : [
                //       { dataFromSource : 'departement', targetPropName : 'region' },
                //     ]
                //   },
                // },
              ],
            },
            { 
              event : 'mousemove',
              layer : "regions-fill",
              functions : [ 
                { funcName : "toggleHighlightOn",
                }, 
              ],
            },
            { 
              event : 'mouseleave',
              layer : "regions-fill",
              functions : [ 
                { funcName : "toggleHighlightOff",
                }, 
              ],
            },
          ]
        },

        { id : "map-aides-dep",
          name: 'Carte aides par departement',
          category: 'departemental',
          properties: 'aides',
          data: "aides",
          layers: [
            "departements-fill", 
            "departements-lines",
            "departements-aides",
            "departements-aides-montants",
          ],
          clicEvents : [
            { 
              event : 'click',
              layer : "departements-fill",
              functions : [ 
                { funcName    : "goToPolygon",
                  funcParams  : { propName : 'code' },
                },
              ],
            },
            { 
              event : 'mousemove',
              layer : "departements-fill",
              functions : [ 
                { funcName    : "toggleHighlightOn",
                }, 
              ],
            },
            { 
              event : 'mouseleave',
              layer : "departements-fill",
              functions : [ 
                { funcName    : "toggleHighlightOff",
                }, 
              ],
            },
          ]
        },

      ],

      // LAYERS
      layers : [

        // REGIONS
        { id: 'regions-fill',
          type: 'fill',
          source: 'regions',
          layout: {
            visibility: 'visible' ,
          },
          paint: fillPaint
        },
        { id: 'regions-lines',
          type: 'line',
          source: 'regions',
          layout: {
            visibility: 'visible' ,
          },
          paint: {
            'line-color': '#627BC1',
            'line-width': 1
          }
        },
        { id: 'regions-aides',
          type: 'circle',
          source: 'regions-aides',
          layout: {
            visibility: 'visible' ,
          },
          paint: circlePaintAides
        },
        { id: 'regions-aides-montants',
          type: 'symbol',
          source: 'regions-aides',
          layout: {
            visibility: 'visible' ,
            'text-field': '{montantMillions} M€',
            "text-font": ["Open Sans Regular"], // OK
            'text-size': 14
          }
        },




        // DEPARTEMENTS
        { id: 'departements-fill',
          type: 'fill',
          source: 'departements',
          layout: {
            visibility: 'none' ,
          },
          paint: fillPaint
        },
        { id: 'departements-lines',
          type: 'line',
          source: 'departements',
          layout: {
            visibility: 'none' ,
          },
          paint: {
            'line-color': '#627BC1',
            'line-width': 1
          }
        },
        { id: 'departements-aides',
          type: 'circle',
          source: 'departements-aides',
          layout: {
            visibility: 'none'
          },
          paint: circlePaintAides
        },
        { id: 'departements-aides-montants',
          type: 'symbol',
          source: 'departements-aides',
          layout: {
            visibility: 'none',
            'text-field': '{montantMillions} M€',
            "text-font": ["Open Sans Regular"],
            'text-size': 14,
          }
        },


      ],
      
      // VISIBILITY
      maps_visibility : {
        title : { fr : "calques" },
        is_activated : true,
        is_drawer_open : true,
        map_switches : [ 
          { 
            id : "regions",    
            mapId : "map-aides-reg",
            label : { fr : "régions" } ,  
            default_visible : true 
          }, 
          { 
            id : "departements",
            mapId : "map-aides-dep",
            label : { fr : "départements"  }, 
            default_visible : false 
          }, 
        ],
      },

    },

    // FRANCE METRO
    { id : 'map-france-metro',
      isActivated : true,
      titleI18n : "maps.map01.title",

      map_options   : {
    
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle         : "testRasterVoyager", // Etalab
        center           : [46.2276, 2.2137],
        currentCenter    : [46.2276, 2.2137],
        zoom             : 5,
        maxZoom          : 18,
        minZoom          : 2,

      },

      copySettingsFrom : [
        { 
          copyFromId : 'map-base',
          fieldsToCopy : [
            'sources', 
            'maps', 
            'layers', 
            'maps_visibility'
          ],
        }
      ]

    },

    // GUYANE
    { id : 'map-guyane',
      isActivated : true,
      titleI18n : "maps.map01.title",

      map_options   : {
    
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle         : "testRasterVoyager", // Etalab
        center           : [46.2276, 2.2137],
        currentCenter    : [46.2276, 2.2137],
        zoom             : 5,
        maxZoom          : 18,
        minZoom          : 2,

      },

      maps_visibility :{
        is_activated : false,
      },

      copySettingsFrom : [
        { 
          copyFromId : 'map-base',
          fieldsToCopy : [
            'sources', 
            'maps', 
            'layers', 
          ],
        }
      ]

    },

    // REUNION
    { id : 'map-reunion',
      isActivated : true,
      titleI18n : "maps.map01.title",

      map_options   : {
    
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle         : "testRasterVoyager", // Etalab
        center           : [46.2276, 2.2137],
        currentCenter    : [46.2276, 2.2137],
        zoom             : 5,
        maxZoom          : 18,
        minZoom          : 2,

      },

      maps_visibility :{
        is_activated : false,
      },

      copySettingsFrom : [
        { 
          copyFromId : 'map-base',
          fieldsToCopy : [
            'sources', 
            'maps', 
            'layers', 
          ],
        }
      ]

    },

    // AUTRES... 
    { id : 'map-autre',
      isActivated : true,
      titleI18n : "maps.map01.title",

      map_options   : {
    
        // ADAPT TO MAPBOX-GL-JS OPTIONS
        mapStyle         : "testRasterVoyager", // Etalab
        center           : [46.2276, 2.2137],
        currentCenter    : [46.2276, 2.2137],
        zoom             : 5,
        maxZoom          : 18,
        minZoom          : 2,

      },

      maps_visibility :{
        is_activated : false,
      },

      copySettingsFrom : [
        { 
          copyFromId : 'map-base',
          fieldsToCopy : [
            'sources', 
            'maps', 
            'layers', 
          ],
        }
      ]

    },

  ]


}