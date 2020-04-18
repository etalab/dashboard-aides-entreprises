
export const configAppNumbers = {
  
  help : "this file contains the setup for the numbers components",

  // NUMBERS

  settingsIds : [

    { id : "numbers-01",
      help : '',
      title : { fr : '' },
      titleI18n : "numbers.numbers01.title",
      dividers : {
        before : false,
        after : true,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [

            { colName : '',
              colTitle : { fr : 'montant total' },
              titleI18n : 'numbers.numbers01.amount',
              colClass : '',
              cols : 6,
              titleClass : '',
              numberClass : 'title font-weight-bold',
              legendClass : '',
              unit : { fr : 'M€' },
              legend : { fr : '' },
              textPrefix : { fr : '' },
              textSuffix : { fr : '' },
              specialStoreId : 'montant',
            },

            { colName : '',
              colTitle : { fr : "nombre" },
              titleI18n : 'numbers.numbers01.total',
              colClass : '',
              cols : 6,
              titleClass : '',
              numberClass : 'title font-weight-bold',
              legendClass : '',
              unit : { fr : 'aides' },
              legend : { fr : '' },
              textPrefix : { fr : '' },
              textSuffix : { fr : '' },
              specialStoreId : 'nombre',
            },

          ],


        }
      ],


    },

  ]


}