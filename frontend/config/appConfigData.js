
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
      dev :     "~/dataJson/data.json",
      prod :    "~/dataJson/data.json",
      preprod : "~/dataJson/data.json"
    },

    dimensions : [
      {
        arg : "naf",
        argType : "const",
        help : "Liste de tous les codes APE/NAF ",
        return : "list",
        subArgs : null
      },

      {
        arg : "departement",
        argType : "const",
        help : "Liste de tous les départements",
        return : "list",
        subArgs : null
      },

      {
        arg : "region",
        argType : "const",
        help : "Liste de toutes les régions",
        return : "list",
        subArgs : null
      },

      {
        arg : "stat/aide",
        argType : "const",
        help : "Obtenir des informations nationales",
        return : "list",
        subArgs : [
          {
            arg : "reg",
            argType : "const",
            help : "Obtenir des informations régionales",
            return : "list",
            subArgs : [
              {
                arg : "<REG_ID>/dep",
                argType : "var/const",
                help : "Liste de toutes les régions",
                return : "list",
                subArgs : null
              }
            ]
          }
        ]
      }

    ]

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
      populate : "from_options",
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
        { field: "naf" ,            url_suffix : "naf" },
        { field: "region" ,         url_suffix : "region" },
        { field: "departement" ,    url_suffix : "departement" },
        { field: "classeeffectif" , url_suffix : "classeeffectif" },
      ]
    },

    displayedData : {
      help : "populate store.data.state.displayedData " ,
      store : [
        { field: "aides-reg" , url_suffix : "stat/aide/reg" },
      ]
    },

  }



}