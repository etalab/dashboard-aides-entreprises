
export const configAppCharts = {
  
  help : "this file contains the setup for the apex charts",

  // CHARTS

  settingsIds : [

    { // BAR HORIZ - SETTINGS EXAMPLE
      id : "chart-01",
      serie_id : "stat-bar-horiz",
      help : "bar horiz + stacked example",
      titleI18n : "charts.chart01.title",
      
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

      series: [
        {
          data: [
            400, 
            430, 
            448, 
            470, 
            540, 
            580, 
            690, 
            1100, 
            1200, 
            1380
          ]
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          width : 400, 
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: [
            'South Korea', 
            'Canada', 
            'United Kingdom', 
            'Netherlands', 
            'Italy', 
            'France', 
            'Japan',
            'United States', 
            'China', 
            'Germany'
          ],
        }
      },

    },

    { // BAR VERTIC - SETTINGS EXAMPLE
      id : "chart-02",
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