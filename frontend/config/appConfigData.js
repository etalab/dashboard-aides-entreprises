
export const configAppData = {

  help : "this file contains the data setup for the app",

  // DESCRIBE THE BACKEND API
  dataSource : {

    docs : "https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend",
        
    apiBackendUrl : {
      dev :     "http://pad-01.infra.data.gouv.fr:5000/",
      prod :    "http://pad-01.infra.data.gouv.fr:5000/",
      preprod : "http://pad-01.infra.data.gouv.fr:5000/"
    },

    // TO DO ... INTEGRATE TO getDataInit etc...
    apiBackendSchema : [
      {
        arg : "naf",
        id : "list_nafs",
        argType : "const",
        help : "Liste de tous les codes APE/NAF ",
        jsonFile : "nafs.json",
        return : "list",
        subArgs : null
      },

      {
        arg : "departement",
        id : "list_deps",
        argType : "const",
        help : "Liste de tous les départements",
        jsonFile : "departements.json",
        return : "list",
        subArgs : null
      },

      {
        arg : "region",
        id : "list_regs",
        argType : "const",
        help : "Liste de toutes les régions",
        jsonFile : "regions.json",
        return : "list",
        subArgs : null
      },

      {
        arg : "stat/aide",
        id : "list_aides_national",
        argType : "const",
        help : "Liste des aides au niveau national",
        jsonFile : "aides-maille-national.json",
        return : "list",
        subArgs : [
          {
            arg : "reg",
            id : "list_aides_regional",
            argType : "const",
            help : "liste des aides au niveau régional",
            jsonFile : "aides-maille-regional.json",
            return : "list",
            subArgs : [
              {
                arg : "<REG_ID>/dep",
                id : "list_aides_departemental",
                argType : "var/const",
                help : "Liste des aides au niveau départemental",
                jsonFile : "aides-maille-departemental.json",
                return : "list",
                subArgs : null
              }
            ]
          }
        ]
      }

    ],

  },


  // FILTERS 
  filters : [
    
    { arg : "departement",
      filterCode : "DEP",
      filterType : "checkbox",
      isActivated : true,
      name : {
        fr : "départements"
      },
      populate : "from_options", // "from_api"
      options : [
        { value : "0", label : { fr : "dep_1" } },
        { value : "1", label : { fr : "dep_2" } }
      ],
    },
    
    { arg : "effectif",
      filterCode : "EFF",
      filterType : "checkbox",
      isActivated : true,
      name : {
        fr : "catégories effectifs"
      },
      populate : "from_options",
      options : [
        { value : "0", label : { fr : "eff_1" } },
        { value : "1", label : { fr : "eff_2" } }
      ],
    },
    
    { arg : "naf",
      filterCode : "NAF",
      filterType : "checkbox",
      isActivated : true,
      name : {
        fr : "codes naf"
      },
      populate : "from_options",
      options : [
        { value : "0", label : { fr : "naf_1" } },
        { value : "1", label : { fr : "naf_2" } }
      ],
    },

  ],


  // DEFAULT SETUP
  defaultDataSetup : {

    initData : {

      help : "populate 'store.data.state.initData' @ middleware getIniitData.js / from : url | localFile" ,

      store : [
        
        // INFOS 

        { id    : "infos" ,
          help  : "",
          from  : "rawObject" ,
          rawObject : {
            numbers : { 
              montant : undefined, 
              nombre : undefined,
              effectifs : undefined,
              nafs : undefined,
            },
            texts : { 
              levelname : 'échelle nationale',
              levelcode : 'national',
            },
            focusObject : undefined,
            switchers : {
              national : 'échelle nationale',
              regional : 'échelle régionale',
              departement : 'échelle départementale',
            },
          },
          displayed : true,
          copyTo : [
            { fieldToCopy : 'levelname',
              from : { objectRef : 'texts' },
              help : 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore : 'levelname',
              format : undefined ,
            },
            { fieldToCopy : 'levelcode',
              from : { objectRef : 'texts' },
              help : 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore : 'levelcode',
              format : undefined ,
            },
          ]
        },


        // TAXONOMIES 

        { id    : "taxo-nafs" ,
          help  : "",
          from  : "static" , 
          url   : "/datasets/taxonomies/nafs.json",
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/naf" 
          displayed : false,
        },
        {  id    : "taxo-regions" ,
          help  : "",
          from  : "static" , 
          url   : "/datasets/taxonomies/regions.json",
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/region" 
          displayed : false,
        },
        {  id    : "taxo-departements" ,
          help  : "",
          from  : "static" , 
          url   : "/datasets/taxonomies/departements.json",
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/departement" 
          displayed : false,
        },
        {  id    : "taxo-classes-effectifs" ,
          help  : "",
          from  : "static" , 
          url   : "/datasets/taxonomies/classes-effectifs.json",
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/classeeffectif" 
          displayed : false,
        },


        // GEOJSON (NO NEED EXCEPT CENTERS : SOURCES LOADED IN MAPBOX COMPONENT )

        { id    : "centers" ,
          help  : "geo centres régions et départements",
          from  : "static" , 
          url   : "/datasets/geodata/centers.json",
          displayed : true,
        },


        // AIDES

        { id    : "national-aides-raw" ,
          help  : "serie chiffres aides à la maille nationale",
          from  : "static" , 
          url   : "/datasets/aides/200413/aides-maille-national.json",
          displayed : true,
          copyTo : [
            { fieldToCopy : undefined,
              from : { objectRef : 0 },
              help : 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore : 'focusObject',
              format : undefined,
            },
            { fieldToCopy : 'montant',
              from : { objectRef : 0 },
              help : 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore : 'montant',
              format : [
                { utilsFnName : 'toMillionsOrElse',
                  params : { divider: 1000000, fixed:2 },
                },
              ],
            },
            { fieldToCopy : 'nombre',
              from : { objectRef : 0 },
              help : 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore : 'nombre',
              format : undefined ,
            },
          ]
        },
        { id    : "regions-aides-raw" ,
          help  : "serie chiffres aides à la maille regionale",
          from  : "static" , 
          url   : "/datasets/aides/200413/aides-maille-regional.json",
          displayed : true,
        },
        { id    : "departements-aides-raw" ,
          help  : "serie chiffres aides à la maille departementale",
          from  : "static" , 
          url   : "/datasets/aides/200413/aides-maille-departemental.json",
          displayed : false,
        },

      ]
    },

  }



}