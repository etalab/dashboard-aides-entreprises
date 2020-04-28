const KEY_DIVISION_NAF = "division_naf"
const KEY_DIVISION_NAF_LABEL = "libelle_division_naf"

const KEY_SECTION_NAF = "code_type"
const KEY_SECTION_NAF_LABEL = "libelle_type"

export const configAppCharts = {
  help: "this file contains the setup for the apex charts",

  // CHARTS

  settingsIds: [
    // TO DO
    // CHARTS JS
    { id: "chartjs-01", help: "APE chart", chartOptions: {} },

    // APEX CHARTS
    // BAR HORIZ - APE X tonnageS
    {
      id: "apexchart-01",
      serie_id: "stat-bar-horiz",
      help: "bar horiz / kpi_top_10_naf X tonnage",
      titleI18n: "charts.chart01.title",
      chartTitle: {
        fr: `
        Type de déchets (Poids par Habitants en Kg)<br>
      `,
      },
      chartTitleClass: "subtitle-2 text-center",

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: "levelname",

      dividers: {
        before: false,
        after: true,
      },

      datasetMappers: {
        specialStoreId: "focusObject",
        fromDatasetKey: "infos_per_type",

        seriesMappers: [
          {
            dataFromKey: "kg_par_habitant",
            serieName: "Poids par Habitant (en Kilos) ",
            format: [
              {
                utilsFnName: "toMillionsOrElse",
                params: { divider: 1, fixed: 0 },
              },
            ],
            sortDataSerieBy: {
              sortByType: "sortByFieldValue",
              fieldName: "kg_par_habitant",
              toNumber: true,
              sortOrder: "descending",
              exceptions: {
                putLast: { fieldName: KEY_SECTION_NAF, value: "Autres" },
              },
            },
            buildAxisCategsX: true,
            buildAxisCategsXsettings: {
              fromKey: KEY_SECTION_NAF_LABEL,
            },
          },
        ],

        chartOptions: {
          chart: {
            type: "bar",
            height: "390px",
            width: "450px",
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true, // nerd-pride....
            },
          },
          theme: {
            mode: "light",
            palette: "palette1", // upto palette10
          },

          dataLabels: {
            enabled: true,
          },

          xaxis: {
            type: "category",
          },
        },
      },

    },

    // APEX CHARTS
    // BAR VERTIC - APE X kg_par_habitantS
    {
      id: "apexchart-01bis",
      serie_id: "stat-bar-horiz",
      help: "bar horiz / kpi_top_10_naf X tonnage",
      titleI18n: "charts.chart01.title",
      chartTitle: { fr: "Top 10 des aides par kg_par_habitant de demandes <br>" },
      chartTitleClass: "subtitle-2 text-center",

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: "levelname",

      dividers: {
        before: false,
        after: true,
      },

      datasetMappers: {
        specialStoreId: "focusObject",
        fromDatasetKey: "infos_per_type",

        seriesMappers: [
          {
            dataFromKey: "kg_par_habitant",
            serieName: "kg_par_habitant d'aides",
            // format : [
            //   { utilsFnName : 'toMillionsOrElse',
            //     params : { divider: 1000000, fixed:2 },
            //   },
            // ],
            sortDataSerieBy: {
              sortByType: "sortByFieldValue",
              fieldName: "kg_par_habitant",
              toNumber: true,
              sortOrder: "descending",
              exceptions: {
                putLast: { fieldName: KEY_SECTION_NAF, value: "Autres" },
              },
            },
            buildAxisCategsX: true,
            buildAxisCategsXsettings: {
              fromKey: KEY_SECTION_NAF_LABEL,
            },
          },
        ],

        chartOptions: {
          chart: {
            type: "bar",
            height: "700px",
            width: "490px",
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              distributed: true, // nerd-pride....
            },
          },

          theme: {
            mode: "light",
            palette: "palette2", // upto palette10
            monochrome: {
              enabled: true,
              color: "#000091",
              shadeTo: "light", //'light' | 'dark'
              shadeIntensity: 0.65,
            },
          },

          dataLabels: {
            enabled: true,
            style: {
              fontSize: "10px",
            },
          },

          xaxis: {
            type: "category",
            labels: {
              show: true,
              rotate: -75,
              maxHeight: 500,
            },
          },
        },
      },
    },

    // BAR VERTIC - SETTINGS EXAMPLE
    {
      id: "apexchart-02",
      serie_id: "stat-bar-vertic",
      help: "bar vertic + stacked example",
      titleI18n: "charts.chart02.title",

      loadSeriesFrom: {
        preload: false,
        sourceType: "json", // json, api, local
        sourceName: "...",
      },

      loadCategoriesFrom: {
        preload: false,
        sourceType: "json", // json, api, local
        sourceName: "...",
      },

      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],

      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          width: 400,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    },
  ],
}
