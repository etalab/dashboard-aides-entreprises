
export const configAppData = {

  help : "this file contains the setup for the api",

  // DESCRIBE THE BACKEND API
  dataSource : {

    docs : "https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend",
    
    dataType : "api", // either API or JSON ?
    
    sources : {
      dev :     "http://pad-01.infra.data.gouv.fr:5000/",
      prod :    "http://pad-01.infra.data.gouv.fr:5000/",
      preprod : "http://pad-01.infra.data.gouv.fr:5000/"
    },
    sourcesJson : {
      dev :     "~/datasets/json",
      prod :    "~/datasets/json",
      preprod : "~/datasets/json"
    },

    dimensions : [
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
    
    { 
      arg : "departement",
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
    
    { 
      arg : "effectif",
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
    
    { 
      arg : "naf",
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
      help : "populate store.data.state.storedData " ,
      store : [
        { field: "naf" ,            from : "api" , url_suffix : "naf" },
        { field: "region" ,         from : "api" , url_suffix : "region" },
        { field: "departement" ,    from : "api" , url_suffix : "departement" },
        { field: "classeeffectif" , from : "api" , url_suffix : "classeeffectif" },
      ]
    },

    displayedData : {
      help : "populate store.data.state.displayedData " ,
      store : [
        { field: "aides-reg",       from : "api" , url_suffix : "stat/aide/reg" },
      ]
    },

  }



}