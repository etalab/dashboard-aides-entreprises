export const configAppMap = {

  help : "this file contains the setup for the MapboxGL layout",

  // MAPS 

  settingsIds : [


    // FRANCE METRO
    { 
      id : "map-01",
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

      // SOURCES LOADED AT MAP LOADED
      sources : [

        // http://etalab-datasets.geo.data.gouv.fr/contours-administratifs/latest/geojson/

        {
          id   : 'regions',
          help : 'geojson des contours des régions',
          from : 'url', // url | file 
          url  : 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson',
          type : 'geojson',
          licence : 'open licence',
          canChange      : false,
          hasPopup       : true,
          cluster        : false,
          clusterMaxZoom : 14,
          clusterRadius  : 75,
        },

        {
          id   : 'departements',
          help : 'geojson des contours des départements',
          from : 'url',
          url  : 'https://raw.githubusercontent.com/etalab/DVF-app/master/static/donneesgeo/departements-100m.geojson',
          type : 'geojson',
          licence : '',
          canChange      : false,
          hasPopup       : false,
          cluster        : false,
          clusterMaxZoom : 14,
          clusterRadius  : 75,
        },

      ],
      
      // MAPS
      maps : [
    
        {
          id : "map-aides-reg",
          name: 'Carte aides par région',
          category: 'regional',
          properties: 'aides',
          data: "aides",
          layers: [
            "regions-fill", 
            "regions-lines"
          ]
        },

        {
          id : "map-aides-dep",
          name: 'Carte aides par departement',
          category: 'departemental',
          properties: 'aides',
          data: "aides",
          layers: [
            "departements-fill", 
            "departements-lines"
          ]
        },

      ],

      // LAYERS
      layers : [

        // REGIONS
        {
          id: 'regions-fill',
          type: 'fill',
          source: 'regions',
          layout: {
            visibility: 'visible' ,
          },
          paint: {
            'fill-color': '#2a4ba9',
            'fill-outline-color': '#627BC1',
            'fill-opacity': 0.2
          }
        },
        {
          id: 'regions-lines',
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

        // DEPARTEMENTS
        {
          id: 'departements-fill',
          type: 'fill',
          source: 'departements',
          layout: {
            visibility: 'none' ,
          },
          paint: {
            'fill-color': '#2a4ba9',
            'fill-outline-color': '#627BC1',
            'fill-opacity': 0.2
          }
        },
        {
          id: 'departements-lines',
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
      ],
      
      // VISIBILITY
      maps_visibility :{
        is_activated : true,
        is_drawer_open : true,
        map_switches : [ 
          { 
            id : "regions",    
            label : { fr : "régions" } ,  
            mapId : "map-aides-reg",
            default_visible : true 
          }, 
          { 
            id : "departements",
            label : { fr : "départements"  }, 
            mapId : "map-aides-dep",
            default_visible : false 
          }, 
        ],
      },

    },


    // DOM TOM
    { 
      id : 'map-Guyane',
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
          copyFromId : 'map-01',
          fieldsToCopy : [
            'sources', 
            'maps', 
            'layers', 
            'layers_visibility'
          ],
        }
      ]

    }

  ]


}