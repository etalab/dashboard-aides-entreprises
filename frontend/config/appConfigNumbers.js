
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
              colTitle : { fr : '' },
              colClass : '',
              cols : 6,
              numberClass : '',
              legendClass : '',
              unit : { fr : 'M€' },
              legend : { fr : '' },
              textPrefix : { fr : '' },
              textSuffix : { fr : '' },
              displayedData : [
                { 
                  name : 'displayed data : numbers.montant', 
                  title : { fr : "total montant des aides"},
                  titleI18n : 'numbers.numbers01.amount',
                  id : 'infos',
                  field : 'numbers.montant',
                },
              ],
            },

            { colName : '',
              colTitle : { fr : '' },
              colClass : '',
              cols : 6,
              numberClass : '',
              legendClass : '',
              unit : { fr : 'aides' },
              legend : { fr : '' },
              textPrefix : { fr : '' },
              textSuffix : { fr : '' },
              displayedData : [
                { 
                  name : 'displayed data : numbers.aides',
                  title : { fr : "nombre d'aides demandées"},
                  titleI18n : 'numbers.numbers01.total',
                  id : 'infos',
                  field : 'numbers.nombre',
                },
              ],
            },

          ],


        }
      ],


    },

  ]


}