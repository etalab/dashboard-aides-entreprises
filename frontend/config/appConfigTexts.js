
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
              colTitleClass : '',
              cols : 12,
              textClass : 'headline',
              subTextClass : '',
              textPrefix : { fr : 'Aides versées : ' },
              textSuffix : { fr : '' },
              specialStoreId : 'levelname',
              specialStoreIdClass : 'font-weight-medium',
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
          
            { colName : '',
              colTitle : { fr : "Plus d'informations sur les aides" },
              colTitleClass : '',
              cols : 12,
              textClass : '',
              subTextClass : '',
              textPrefix : { fr : undefined },
              textSuffix : { fr : undefined },
              specialStoreId : undefined,
              specialStoreIdClass : undefined,
              textsHtml : [
                { id : 'intro',
                  textContent : { fr : "Texte d'information sur les aides aux entreprises ..." },
                  textClass : 'text-left mx-4 py-3',
                  fromUrl : undefined,
                },
                { id : 'intro-02',
                  textContent : { fr : "Lorem ipsum <br> etc ..." },
                  textClass : 'text-left mx-4 pb-5',
                  fromUrl : undefined,
                },
              ] 
            },
          
          ]
        }

      ],
    },


  ]


}