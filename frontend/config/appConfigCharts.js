
export const configAppCharts = {
  
  help : "this file contains the setup for the apex charts",

  // CHARTS

  settingsIds : [

    { // BAR HORIZ - SETTINGS EXAMPLE
      id : "chart-01",
      serie_id : "stat-bar-horiz",
      help : "bar horiz + stacked example",
      
      loadFrom : {
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
          width : 500, 
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
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



  ]


}