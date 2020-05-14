// const KEY_DIVISION_NAF = 'division_naf'
// const KEY_DIVISION_NAF_LABEL = 'libelle_division_naf'

const KEY_MONTANT = 'montant'

const KEY_SECTION_NAF = 'section_naf'
const KEY_SECTION_NAF_LABEL = 'libelle_section_naf'

const KEY_SECTION_EFFECTIF = 'classe_effectif'
const KEY_SECTION_EFFECTIF_LABEL = 'libelle_classe_effectif'

const KEY_SECTION_CATEGJUR = 'code_cat_juridique'
const KEY_SECTION_CATEGJUR_LABEL = 'libelle_cat_juridique'

const COMMON_SERIES_MAPPERS = {
  NafByMontant: {
    dataFromKey: KEY_MONTANT,
    serieName: 'montant (M€)',
    format: [
      {
        utilsFnName: 'toMillionsOrElse',
        params: { divider: 1000000, fixed: 2 }
      }
    ],
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_MONTANT,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_NAF, value: 'Autres' }
      }
    },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_NAF_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NAF,
      matchWithDatasetId: 'taxo-nafs-colors',
      matchKey: 'code_section',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },
  EffectifByMontant: {
    dataFromKey: KEY_MONTANT,
    serieName: 'montant (M€)',
    format: [
      {
        utilsFnName: 'toMillionsOrElse',
        params: { divider: 1000000, fixed: 2 }
      }
    ],
    sortDataSerieBy: undefined,
    // sortDataSerieBy: {
    //   sortByType: 'sortByFieldValue',
    //   fieldName: KEY_MONTANT,
    //   toNumber: true,
    //   sortOrder: 'descending',
    //   exceptions: {
    //     putLast: { fieldName: KEY_SECTION_EFFECTIF, value: 'Autres' }
    //   }
    // },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_EFFECTIF_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_EFFECTIF,
      matchWithDatasetId: 'taxo-classes-effectifs',
      matchKey: 'denomination',
      getValueFromKey: 'color',
      fallbackColor: '#808080'
    }
  },
  CategjurByMontant: {
    dataFromKey: KEY_MONTANT,
    serieName: 'montant (M€)',
    format: [
      {
        utilsFnName: 'toMillionsOrElse',
        params: { divider: 1000000, fixed: 2 }
      }
    ],
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_MONTANT,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_CATEGJUR, value: 'Autres' }
      }
    },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_CATEGJUR_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_CATEGJUR,
      matchWithDatasetId: 'taxo-categ-juridiques',
      matchKey: 'code',
      getValueFromKey: 'color',
      fallbackColor: '#808080'
    }
  },
  CategjurByMontantPie: {
    dataFromKey: KEY_MONTANT,
    serieName: 'montant (M€)',
    format: [
      {
        utilsFnName: 'toMillionsOrElse',
        params: { divider: 1000000, fixed: 2 }
      }
    ],
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_MONTANT,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_CATEGJUR, value: 'Autres' }
      }
    },

    buildAxisCategsX: false,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_CATEGJUR_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildLabels: true,
    buildLabelsSettings: {
      fromKey: KEY_SECTION_CATEGJUR_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: false,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_CATEGJUR,
      matchWithDatasetId: 'taxo-categ-juridiques',
      matchKey: 'code',
      getValueFromKey: 'color',
      fallbackColor: '#808080'
    }
  }
}
const COMMON_CHART_OPTIONS = {
  categHorizH300: {
    chart: {
      type: 'bar',
      height: '300px',
      width: '390px',
      toolbar: {
        show: false
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true // nerd-pride....
      }
    },
    theme: {
      mode: 'light'
    },

    dataLabels: {
      enabled: true
    },

    xaxis: {
      type: 'category',
      labels: {
        show: false,
        style: {
          fontSize: '9px'
        }
      }
    },

    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            // height: "370px",
            width: '350px'
          },
          xaxis: {
            type: 'numeric',
            labels: {
              show: false,
              style: {
                fontSize: '9px'
              }
            }
          }
        }
      }
    ]
  },
  categHorizH390: {
    chart: {
      type: 'bar',
      height: '390px',
      width: '390px',
      toolbar: {
        show: false
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true // nerd-pride....
      }
    },
    theme: {
      mode: 'light'
    },

    dataLabels: {
      enabled: true
    },

    xaxis: {
      type: 'category',
      labels: {
        show: false,
        style: {
          fontSize: '9px'
        }
      }
    },

    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            // height: "370px",
            width: '350px'
          },
          xaxis: {
            type: 'numeric',
            labels: {
              show: false,
              style: {
                fontSize: '9px'
              }
            }
          }
        }
      }
    ]
  },
  categHorizH170: {
    chart: {
      type: 'bar',
      height: '170px',
      width: '390px',
      toolbar: {
        show: false
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true // nerd-pride....
      }
    },
    theme: {
      mode: 'light'
    },

    dataLabels: {
      enabled: true
    },

    xaxis: {
      type: 'category',
      labels: {
        show: false,
        style: {
          fontSize: '9px'
        }
      }
    },

    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            // height: "370px",
            width: '350px'
          },
          xaxis: {
            type: 'numeric',
            labels: {
              show: false,
              style: {
                fontSize: '9px'
              }
            }
          }
        }
      }
    ]
  },
  categPieH250: {
    chart: {
      type: 'donut',
      height: '250px',
      width: '390px',
      toolbar: {
        show: false
      }
    },
    legend: {
      position: 'bottom'
    },
    theme: {
      palette: 'palette7',
      mode: 'light'
    },

    dataLabels: {
      enabled: true
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%'
        }
      }
    },
    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            // height: "370px",
            width: '350px'
          }
        }
      }
    ]
  }
}

export const configAppCharts = {
  help: 'this file contains the setup for the apex charts',

  // CHARTS

  settingsIds: [
    // APEX CHARTS

    // ============================================================= //
    // HOME / FDS
    // ============================================================= //
    // BAR HORIZ - APE X MONTANTS
    {
      id: 'apexchart-fds',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_naf X montant',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Top 10 des aides du fonds de solidarité <br>
          ventilés par 
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€) <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_top_10_naf',

        seriesMappers: [
          COMMON_SERIES_MAPPERS.NafByMontant
        ],

        chartOptions: COMMON_CHART_OPTIONS.categHorizH390
      }

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
    // BAR HORIZ - CLASSE EFFECTIFS X MONTANTS
    {
      id: 'apexchart-fds-effectifs',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_categorie_juridique X montant',
      titleI18n: 'charts.chart01.title',
      // <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/methodologie/effectifs-salaries.html">
      chartTitle: {
        fr: `
          Aides par 
          <a target="_blank" href="https://www.insee.fr/fr/information/1896448">
            classes d'effectifs</a>
          (en M€)<br>
         <span class='font-weight-light'>
          (uniquement entreprises affiliées au régime général)
         </span>
         <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_classe_effectif',

        seriesMappers: [
          COMMON_SERIES_MAPPERS.EffectifByMontant
        ],

        chartOptions: COMMON_CHART_OPTIONS.categHorizH300
      }
    },
    // BAR HORIZ - CATEG JURIDIQUE X MONTANTS
    {
      id: 'apexchart-fds-categ-jur',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_categorie_juridique X montant',
      titleI18n: 'charts.chart01.title',
      // <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/categories-juridiques.html">
      chartTitle: {
        fr: `
          Top 3 des aides par 
          <a target="_blank" href="https://www.insee.fr/fr/information/2028129">
            catégories juridiques </a>a>
          (en M€) <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_categorie_juridique',

        seriesMappers: [
          COMMON_SERIES_MAPPERS.CategjurByMontant
        ],

        chartOptions: COMMON_CHART_OPTIONS.categHorizH170
      }
    },
    // PIE - CATEG JURIDIQUE X MONTANTS
    {
      id: 'apexchart-fds-categ-jur-pie',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_categorie_juridique X montant',
      titleI18n: 'charts.chart01.title',
      // <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/categories-juridiques.html">
      chartTitle: {
        fr: `
          Top 3 des aides par 
          <a target="_blank" href="https://www.insee.fr/fr/information/2028129">
            catégories juridiques </a>
          (en M€) <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_categorie_juridique',

        seriesMappers: [
          COMMON_SERIES_MAPPERS.CategjurByMontantPie
        ],

        chartOptions: COMMON_CHART_OPTIONS.categPieH250
      }
    },
    // BAR VERTIC - APE X NOMBRES
    {
      id: 'apexchart-01bis',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_naf X montant',
      titleI18n: 'charts.chart01.title',
      chartTitle: { fr: 'Top 10 des aides par nombre de demandes <br>' },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_top_10_naf',

        seriesMappers: [
          {
            dataFromKey: 'nombre',
            serieName: "nombre d'aides",
            // format : [
            //   { utilsFnName : 'toMillionsOrElse',
            //     params : { divider: 1000000, fixed:2 },
            //   },
            // ],
            sortDataSerieBy: {
              sortByType: 'sortByFieldValue',
              fieldName: 'nombre',
              toNumber: true,
              sortOrder: 'descending',
              exceptions: {
                putLast: { fieldName: KEY_SECTION_NAF, value: 'Autres' }
              }
            },
            buildAxisCategsX: true,
            buildAxisCategsXsettings: {
              fromKey: KEY_SECTION_NAF_LABEL
            }
          }
        ],

        chartOptions: {
          chart: {
            type: 'bar',
            height: '700px',
            width: '490px',
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              horizontal: false,
              distributed: true // nerd-pride....
            }
          },

          theme: {
            mode: 'light',
            palette: 'palette2', // upto palette10
            monochrome: {
              enabled: true,
              color: '#000091',
              shadeTo: 'light', // 'light' | 'dark'
              shadeIntensity: 0.65
            }
          },

          dataLabels: {
            enabled: true,
            style: {
              fontSize: '10px'
            }
          },

          xaxis: {
            type: 'category',
            labels: {
              show: true,
              rotate: -75,
              maxHeight: 500
            }
          }
        }
      }
    },

    // ============================================================= //
    // PGE
    // ============================================================= //
    // BAR HORIZ - APE X MONTANTS
    {
      id: 'apexchart-pge',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_naf X montant',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Top 10 des prêts garantis par l'Etat 
          <br>ventilés par 
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€) <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_top_10_naf',
        seriesMappers: [
          COMMON_SERIES_MAPPERS.NafByMontant
        ],
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390
      }

    },

    // ============================================================= //
    // REPORT
    // ============================================================= //
    // BAR HORIZ - APE X MONTANTS
    {
      id: 'apexchart-report',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_naf X montant',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Top 10 des reports d'échéances fiscales 
          <br>ventilés par 
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€) <br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'text-uppercase',

      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },

      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'kpi_top_10_naf',
        seriesMappers: [
          COMMON_SERIES_MAPPERS.NafByMontant
        ],
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390
      }

    }

  ]
}
