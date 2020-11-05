export const configAppNumbers = {
  help: 'this file contains the setup for the numbers components',

  // NUMBERS

  settingsIds: [
    {
      id: 'numbers-00',
      help: '',
      title: { fr: '' },
      titleI18n: 'numbers.numbers01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: 'montant' },
              titleI18n: 'numbers.numbers01.amount',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 body-2 text-center',
              breakMobile: true,
              legendClass: '',
              unit: { fr: 'M€' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'montant',
              format: { type: 'float', sepThousands: ' ', sepComma: ',' }
            },

            {
              colName: '',
              colTitle: { fr: "nombre d'aides" },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 body-2 text-center',
              breakMobile: true,
              legendClass: '',
              unit: { fr: '' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre',
              format: { type: 'integer', sepThousands: ' ' }
            },

            {
              colName: '',
              colTitle: { fr: "nombre d'entreprises" },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 body-2 text-center',
              breakMobile: true,
              legendClass: '',
              unit: { fr: '' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre_siren',
              format: { type: 'integer', sepThousands: ' ' }
            }

          ]
        }
      ]
    },

    {
      id: 'numbers-01',
      help: '',
      title: { fr: '' },
      titleI18n: 'numbers.numbers01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: 'montant' },
              titleI18n: 'numbers.numbers01.amount',
              colClass: '',
              cols: 6,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 body-2 text-center',
              legendClass: '',
              unit: { fr: 'M€' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'montant',
              format: { type: 'float', sepThousands: ' ', sepComma: ',' }
            },

            {
              colName: '',
              colTitle: { fr: 'nombre' },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 6,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 body-2 text-center',
              legendClass: '',
              unit: { fr: 'aides' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre',
              format: { type: 'integer', sepThousands: ' ' }
            }
          ]
        }
      ]
    },

    {
      id: 'numbers-02',
      help: '',
      title: { fr: '' },
      titleI18n: 'numbers.numbers02.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: 'Nombre de demandes' },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 caption text-center',
              breakDesktop: false,
              breakMobile: true,
              legendClass: '',
              unit: { fr: '' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre_demandes_deposees',
              format: { type: 'integer', sepThousands: ' ' }
            },
            {
              colName: '',
              colTitle: { fr: 'Nombre de salariés' },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 caption text-center',
              breakDesktop: false,
              breakMobile: true,
              legendClass: '',
              unit: { fr: '' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre_salaries_concernes',
              format: { type: 'integer', sepThousands: ' ' }
            },
            {
              colName: '',
              colTitle: { fr: 'Heures demandées' },
              titleI18n: 'numbers.numbers01.total',
              colClass: '',
              cols: 4,
              titleClass: '',
              numberClass: 'font-weight-bold',
              sizeDesktop: 'title',
              sizeMobile: 'mb-1 caption text-center',
              breakDesktop: false,
              breakMobile: true,
              legendClass: '',
              unit: { fr: 'h' },
              legend: { fr: '' },
              textPrefix: { fr: '' },
              textSuffix: { fr: '' },
              specialStoreId: 'nombre_heures_demandees',
              format: { type: 'float', sepThousands: ' ', sepComma: ',' }
            }

          ]
        }
      ]
    }
  ]
}
