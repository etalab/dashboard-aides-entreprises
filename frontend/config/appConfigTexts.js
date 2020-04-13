
export const configAppTexts = {
  
  help : "this file contains the setup for the texts components",

  // NUMBERS



  settingsIds : [

    { id : "text-01",
      help : '',
      title : { fr : '' },
      titleI18n : "texts.text01.title",
      dividers : {
        before : false,
        after : true,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [
          
            { colName : '',
              colTitle : { fr : '' },
              colClass : '',
              cols : 6,
              numberClass : '',
              legendClass : '',
              textPrefix : { fr : 'Aides versées - ' },
              textSuffix : { fr : '' },
              displayedData : [
                { name : 'displayed data : level.montant', 
                  title : { fr : "texte"},
                  titleI18n : 'texts.text01.titre',
                  id : 'infos',
                  field : 'texts.levels.name',
                }
              ],
            },
          
          ]
        }

      ],
    },

    { id : "text-02",
      help : '',
      title : { fr : '' },
      titleI18n : "texts.text01.title",
      dividers : {
        before : false,
        after : true,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [
                    
          ]
        }

      ],

    },


  ]


}