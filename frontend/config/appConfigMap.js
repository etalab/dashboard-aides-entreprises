export const configAppMap = {


  help : "this file contains the setup for the MapboxGL layout",

  map_options   : {
    
    ////// TO ADAPT TO MAPBOX-GL-JS OPTIONS
    url              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains       : 'abcd',
    mapStyle         : "testRasterVoyager",
    center           : [46.2276, 2.2137],
    currentCenter    : [46.2276, 2.2137],
    zoom             : 5,
    maxZoom          : 18,
    minZoom          : 2,
    useMarkerCluster : true,
    pinIconUrl       : "/static/icons/icon_pin_plein_violet.svg",
    pinIconSize      : { "highlighted" : [46, 46], "normal" : [29, 29]},

    mapbox_layers : {

      ////// all points source and layer
      all_points_layer : {
        "is_activated"        : true,
        "source_id"           : "allPointsSource",
        "layer_id"            : "all-points",
        "is_default_visible"  : true,
        "is_source_distant"   : false,

        "is_live_data"        : false,
        "refresh_delay"       : 3000,

        "is_clickable"        : true,

        "radius_min"          : 1,
        "radius_max"          : 10,
        "max_zoom"            : 14,
        "min_zoom"            : 4,
        "circle_color"        : '#004494',
        "circle_stroke_color" : '#fff',
        "circle_opacity"      : 0.8,
      },

      ////// clusters source and layer
      cluster_circles_layer : {
        "is_activated"     : true,
        "source_id"           : "clusterSource",
        "layer_id"            : "cluster-circles",
        "is_default_visible"  : false,

        "is_source_distant"   : false, ////// clusters all points sources by default
        "is_clickable"        : true,

        "circle_color"     : '#e5ecf4', 
        "circle_color_100" : '#b2c6de', 
        "circle_color_250" : '#668ebe', 
        "circle_color_500" : '#3269a9', 
        "circle_color_750" : '#004494', 

        "circle_radius"     : 15, 
        "circle_radius_100" : 20, 
        "circle_radius_250" : 25, 
        "circle_radius_500" : 30, 
        "circle_radius_750" : 35, 

        "circle_stroke_color" : '#fff',
        "circle_stroke_width" : 1,
      },

      cluster_count_layer : {
        "is_activated"        : true,
        "source_id"           : "clusterSource",
        "layer_id"            : "cluster-counts",
        "is_default_visible"  : false,
        "is_source_distant"   : false,
        "is_clickable"        : true,

        "text_size"    : 11,
        "text_color"   : '#ffffff'
      },

      cluster_unclustered_layer : {
        "is_activated"        : false,
        "source_id"           : "clusterSource",
        "layer_id"            : "unclustered-point",
        "is_default_visible"  : true,
        "is_source_distant"   : false,
        "is_clickable"        : true,

        "circle_color"        : '#fff', 
        "circle_stroke_color" : '#004494',
        "circle_radius"       : 5, 
        "circle_stroke_width" : 5, 
      },

      ////// choropleth source and layer
      choropleth_layer : {

        "is_activated"        : true,
        // "source_id"           : "choroSource",
        // "layer_id"            : "choropleth",
        "is_live_data"        : false,
        "refresh_delay"       : 3000,

        "is_drawer_open"      : true,

        "is_source_distant"   : true,
        "distant_source_url" : "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson", 
        // "distant_source_url"  : "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes-avec-outre-mer.geojson", 
        
        "change_source_by_zoom" : true,
        "is_clickable"        : false,

        ////// list of choropleth sources
        sources : [

          { ////// FR - departements
            "is_activated" : true,
            "source_id" : "chorosource-departements",
            "layer_id"  : "chorolayer-departements",
            "is_default_visible" : true,
            "max_zoom" : 9,
            "min_zoom" : 0,

            // "next_layer_id"  : "chorolayer-communes",
            "source_url" : "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson", 
            "update_src_from_previous_layer" : false,

            "need_aggregation" : true,
            "polygon_prop_id" : "code",
            // "agregate_data_from_source" : "allPointsSource",
            "join_polygon_id_to_field"  : "DEPARTEMENT",
            "agregated_data_field"      : "count_dep",
            // "fill_color"          : '#888888",
            'fill_color': [
              'interpolate',
              ['linear'],
              ['get', 'count_dep' ],
              0,  '#888888',
              1,  '#EED322',
              3,  '#E6B71E',
              5,  '#DA9C20',
              10, '#CA8323',
              20, '#B86B25',
              35, '#A25626',
              50, '#8B4225',
              100, '#723122'
            ],
            "fill_opacity"        : 0.4,
            "fill_outline_color"  : '#004494',

            "has_popup" : true, 
            "popup_config" : {
              "action" : 'mousemove',
              "fields" : [
                { 'position' : 'field_title' ,      'field' : 'nom',       'prefix' : undefined,       'suffix' : undefined },
                { 'position' : 'field_title_post' , 'field' : 'code',      'prefix' : ' (',       'suffix' : ')' },
                { 'position' : 'field_value' ,      'field' : 'count_dep', 'prefix' : 'total : ', 'suffix' : ' lieux' }
              ],
            },
            "legend" : {
              "position" : "bottom-right", 
              "title" : "Tiers-lieux / département",
              "scales" : [
                { 'value' : '>100 lieux', 'color' : '#723122'},
                { 'value' : '50 lieux',   'color' : '#8B4225'},
                { 'value' : '35 lieux',   'color' : '#A25626'},
                { 'value' : '20 lieux',   'color' : '#B86B25'},
                { 'value' : '10 lieux',   'color' : '#CA8323'},
                { 'value' : '5 lieux',    'color' : '#DA9C20'},
                { 'value' : '3 lieux',    'color' : '#E6B71E'},
                { 'value' : '1 lieu',    'color' : '#EED322'},
                { 'value' : '0 lieu',    'color' : '#888888'},
              ]
            }

          },

          { ////// FR - communes
            "is_activated" : false,
            "source_id" : "chorosource-communes",
            "layer_id"  : "chorolayer-communes",
            "is_default_visible" : true,
            "max_zoom" : 18,
            "min_zoom" : 8,

            // "next_layer_id"  : "chorolayer-cadaste",
            "source_url" : "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes-avec-outre-mer.geojson", 
            "update_src_from_previous_source" : true,
            "update_src_options" : [ 
              { 
                "url_base" : "https://geo.api.gouv.fr/departements/<dep_code>/communes?geometry=contour&format=geojson&type=commune-actuelle", 
                "response_format" : "geojson",
                "upper_load_method" : "zoom",
                "upper_load_feat" : "only_center",
                "upper_main_matching_prop" : "code",
                "upper_source_id" : "chorosource-departements", 
                "upper_layer_id" : "chorolayer-departements", 
                "slugs_map" : [
                  {
                    "value_property" : "code", ////// field in property to retrieve
                    "value_slug_code" : "dep_code" , 
                  }
                ],
              },
            ],

            "need_aggregation" : true,
            "polygon_prop_id" : "code",
            // "agregate_data_from_source" : "allPointsSource",
            "join_polygon_id_to_field"  : "INSEECOM",
            "agregated_data_field"      : "count_com",
            // "fill_color"          : '#888888",
            'fill_color': [
              'interpolate',
              ['linear'],
              ['get', 'count_com' ],
              0,  '#888888',
              1,  '#EED322',
              2,  '#DA9C20',
              5,  '#B86B25',
              7,  '#8B4225',
              10, '#723122'
            ],
            "fill_opacity"        : 0.5,
            "fill_outline_color"  : 'rgb(256,256,256)',
            "has_popup" : true, 
            "popup_config" : {
              "action" : 'mousemove',
              "fields" : [
                { 'position' : 'field_title' ,      'field' : 'nom',       'prefix' : undefined,       'suffix' : undefined },
                { 'position' : 'field_title_post' , 'field' : 'code',      'prefix' : ' (',       'suffix' : ')' },
                { 'position' : 'field_value' ,      'field' : 'count_com', 'prefix' : 'total : ', 'suffix' : ' lieux' }
              ],
            },
            "legend" : {
              "position" : "bottom-right", 
              "title" : "Tiers-lieux / communes",
              "scales" : [
                { 'value' : '>10 lieux', 'color' : '#723122'},
                { 'value' : '7 lieux',   'color' : '#8B4225'},
                { 'value' : '5 lieux',   'color' : '#B86B25'},
                { 'value' : '2 lieux',   'color' : '#DA9C20'},
                { 'value' : '1 lieu',    'color' : '#EED322'},
                { 'value' : '0 lieu',    'color' : '#888888'},
              ]
            }
          },


        ],
        

        // "fill_color"          : '#888888",
        // "fill_opacity"        : 0.5,
        // "fill_outline_color"  : "rgb(256,256,256)",

      },

      ////// heatmap source and layer
      heatmap_layer : {
        "is_activated"        : true,
        "is_default_visible"  : false,
        "source_id"           : "allPointsSource",
        "layer_id"            : "heatmap-layer",
        "source"              : "all-points",
        "prop_weight"         : "weight",
        "max_zoom"            : 18,
        "radius_min"          : 6,
        "radius_max"          : 25,
      },

    },
  
    layers_visibility :{
      is_activated : true,
      is_drawer_open : false,
      layers_switches : [ 
        { "label" : "lieux",         "layers" : [ "all-points" ], "default_visible" : true }, 
        { "label" : "clusters" ,     "layers" : [ "cluster-circles", "cluster-counts" ], "default_visible" : false }, 
        // { "label" : "départements" , "layers" : [ "chorolayer-departements" ], "default_visible" : true }, 
        // { "title" : "communes" ,   "layers" : [ "chorolayer-communes" ], "default_visible" : false }, 
        // { "title" : "cadastre" ,   "layers" : [ "chorolayer-cadastre" ], "default_visible" : false }, 
        { "label" : "radar" ,        "layers" : [ "heatmap-layer" ], "default_visible" : false }
      ],
    },


  },


  lat_long_fields : {
    latitude : "lat",
    longitude : "lon"
  },


  contents_fields  : [

    { "field" : "sd_id",
      "field_format" : { "trim" : undefined, "type" : "object", "retrieve" : [0] },
      "is_visible" : true,
      "position" : "block_id",
      
      "custom_title" : "to do",
      "locale" : "fr"
    },
    { "field" : "ville", 
      "field_format" : { "trim" : undefined, "type" : "object", "retrieve" : [0] },
      "is_visible" : true,
      "position" : "block_address",
      // "trim" : 20,
      "custom_title" : "to do",
      "locale" : "fr"
    },
    { "field" : "result_city",
      "field_format" : { "trim" : undefined, "type" : "object", "retrieve" : [0] },
      "is_visible" : true,
      "position" : "block_city",
      // "trim" : 20,
      "custom_title" : "to do",
      "locale" : "fr"
    },
    { "field" : "titre_initiative", 
      "field_format" : { "trim" : undefined, "type" : "object", "retrieve" : [0] },
      "is_visible" : true,
      "position" : "block_title",
      // "trim" : 20,
      "custom_title" : "to do",
      "locale" : "fr"
    },
    { "field" : "url_illustration",
      "field_format" : { "trim" : undefined, "type" : "object", "retrieve" : [0] },
      "is_visible" : true,
      "position" : "block_image",
      // "trim" : 20,
      "custom_title" : "to do",
      "locale" : "fr"
    },

  ],


}