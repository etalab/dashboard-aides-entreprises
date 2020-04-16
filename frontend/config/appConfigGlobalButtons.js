
export const configAppGlobalButtons = {
  
  help : "this file contains the setup for the numbers components",

  // GLOBAL BUTTONS

  settingsIds : [

    { id : "global-button-01",
      help : '',
      title : { fr : '' },
      titleI18n : "buttons.button01.title",
      dividers : {
        before : false,
        after : false,
      },

      btnsRowClass : 'align-center justify-center mb-3',

      componentButtons : [

        { id : 'first-button',
          title : { fr : 'données nationales' },
          titleI18n : "buttons.button01.title",
          
          btnClass : 'justify-center',
          block : false,
          icon : undefined,
          outlined : true, 
          fab : false, 
          color : 'primary',
          large : false, 
          small : false, 
          dark : false, 
          tile : true, 
          rounded : false, 
          disabled : false,

          activatedIf : undefined,
          functions : [
    
            { funcName : 'resetStore',
              funcParams  : {
                targets : [
    
                  { from : 'store', 
                    fromPropKey : 'code',
                    fromPropValue : 'national',
                    fromStoreData : 'initData',
                    fromDatasetId : 'taxo-regions',
                    fromDatasetKey : 'reg',
                    fromDatasetField : 'libelle',
                    targetSpecialStoreId : 'levelname', 
                  },
    
                  { from : 'store', 
                    fromPropKey : 'code',
                    fromPropValue : 'national',
                    fromStoreData : 'initData',
                    fromDatasetId : 'regions-aides-raw',
                    fromDatasetKey : 'reg',
                    fromDatasetField : 'nombre',
                    targetSpecialStoreId : 'nombre', 
                  },
    
                  { from : 'store', 
                    fromPropKey : 'code',
                    fromPropValue : 'national',
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
                    fromPropValue : 'national',
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
    
            { funcName : 'resetMapZoom',
              funcParams  : {
                targets : [
    
                  { from : 'store', 
                    fromPropKey : 'zoom',
                    fromPropValue : 8,
                    fromStoreData : undefined,
                    fromDatasetId : undefined,
                    fromDatasetKey : undefined,
                    fromDatasetField : undefined,
                    targetSpecialStoreId : undefined,
                  },
    
                ]
              },
            },
    
    ''
          ],
        }

      ],


    },

  ]


}