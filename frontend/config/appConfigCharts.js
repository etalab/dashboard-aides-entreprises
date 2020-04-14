
export const configAppCharts = {
  
  help : "this file contains the setup for the apex charts",

  // CHARTS

  settingsIds : [
    
    // TO DO 
    // CHARTS JS
    { id : "chartjs-01",
      help: 'APE chart', 
      chartOptions : {

      },
    },


    // APEX CHARTS
    { // BAR HORIZ - SETTINGS EXAMPLE
      id : "apexchart-01",
      serie_id : "stat-bar-horiz",
      help : "bar horiz / kpi_top_10_naf X montant",
      titleI18n : "charts.chart01.title",
      chartTitle : { fr : 'top 10 des aides par code NAF (en M€)' },
      chartTitleClass : 'subtitle-2',

      datasetMappers : {

        specialStoreId : 'focusObject',
        fromDatasetKey : 'kpi_top_10_naf',

        seriesMappers : [
          { dataFromKey : 'montant',
            format : [
              { utilsFnName : 'toMillionsOrElse',
                params : { divider: 1000000, fixed:2 },
              },
            ],
            buildAxisCategsX : true,
            buildAxisCategsXsettings : {
              fromKey : 'libelle_division_naf',
            }
          }
        ],

        chartOptions: {
          chart: {
            type: 'bar',
            height: '350px',
            width : '450px', 
            toolbar : {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: true
          },
          // xaxis: {
          //   categories: [
          //   ],
          // }
        },
      },

      // TO DO ...

      // loadSeriesFrom : {
      //   preload : false,
      //   sourceType : "json", // json, api, local
      //   sourceName : "...",
      // },

      // loadCategoriesFrom : {
      //   preload : false,
      //   sourceType : "json", // json, api, local
      //   sourceName : "...",
      // },


    },

    { // BAR VERTIC - SETTINGS EXAMPLE
      id : "apexchart-02",
      serie_id : "stat-bar-vertic",
      help : "bar vertic + stacked example",
      titleI18n : "charts.chart02.title",

      loadSeriesFrom : {
        preload : false,
        sourceType : "json", // json, api, local
        sourceName : "...",
      },

      loadCategoriesFrom : {
        preload : false,
        sourceType : "json", // json, api, local
        sourceName : "...",
      },

      series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
      }],

      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          width: 400,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT', 
            '01/02/2011 GMT', 
            '01/03/2011 GMT', 
            '01/04/2011 GMT',
            '01/05/2011 GMT', 
            '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },

    }

  ]


}