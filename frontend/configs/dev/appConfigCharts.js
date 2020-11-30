// const KEY_DIVISION_NAF = 'division_naf'
// const KEY_DIVISION_NAF_LABEL = 'libelle_division_naf'

const KEY_MONTANT = 'montant'

const KEY_ETABLISSEMENTS = 'nombre_etablissements_concernes'
const KEY_MONTH = 'mois'
const KEY_SALARIES = 'nombre_salaries_concernes'
const KEY_HEURES = 'nombre_heures_demandees'
const KEY_DEMANDES = 'nombre_demandes_deposees'

const KEY_SECTION_NACE = 'code_section_nace17'
const KEY_SECTION_NACE_LABEL = 'libelle_section_nace17'

const KEY_SECTION_NAF = 'section_naf'
const KEY_SECTION_NAF_LABEL = 'libelle_section_naf'

const KEY_SECTION_EFFECTIF = 'classe_effectif'
const KEY_SECTION_EFFECTIF_LABEL = 'libelle_classe_effectif'

const KEY_SECTION_CATEGJUR = 'code_cat_juridique'
const KEY_SECTION_CATEGJUR_LABEL = 'libelle_cat_juridique'

const COMMON_FORMATTERS = {

  millionsEuros: {
    type: 'float',
    sepThousands: ' ',
    sepComma: ',',
    unit: 'M€'
  },
  toMillionsWithComma: [
    {
      utilsFnName: 'toMillionsOrElse',
      params: { divider: 1000000, fixed: 1 }
    }
  ],
  toMillionsWithoutComma: [
    {
      utilsFnName: 'toMillionsOrElse',
      params: { divider: 1000000, fixed: 0 }
    }
  ],
  integerEuropeanFormat: [
    {
      utilsFnName: 'toMillionsOrElse',
      params: { divider: 1, fixed: 0 }
    }
  ]
}

const COMMON_SERIES_MAPPERS = {
  NafByMontant: {
    dataFromKey: KEY_MONTANT,
    serieName: 'montant (M€)',
    format: COMMON_FORMATTERS.toMillionsWithComma,
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
    format: COMMON_FORMATTERS.toMillionsWithComma,
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
    format: COMMON_FORMATTERS.toMillionsWithComma,
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
    format: COMMON_FORMATTERS.toMillionsWithComma,
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
  },
  NaceByNombreEntreprise: {
    dataFromKey: KEY_ETABLISSEMENTS,
    serieName: 'Nombre d\'entreprises ',
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_ETABLISSEMENTS,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_NACE, value: 'Autres' }
      }
    },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_NACE_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },
  NaceByNombreSalaries: {
    dataFromKey: KEY_SALARIES,
    serieName: 'Nombre de salariés ',
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_SALARIES,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_NACE, value: 'Autres' }
      }
    },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_NACE_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },
  NaceByNombreHeures: {
    dataFromKey: KEY_HEURES,
    serieName: 'Nombre d\'heures (en millions) ',
    format: COMMON_FORMATTERS.toMillionsWithoutComma,
    sortDataSerieBy: {
      sortByType: 'sortByFieldValue',
      fieldName: KEY_HEURES,
      toNumber: true,
      sortOrder: 'descending',
      exceptions: {
        putLast: { fieldName: KEY_SECTION_NACE, value: 'Autres' }
      }
    },

    buildAxisCategsX: true,
    buildAxisCategsXsettings: {
      fromKey: KEY_SECTION_NACE_LABEL,
      splitBy: [',', ';'],
      splitGlue: '- ',
      capitalize: true
    },

    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },


  // STACK
  NaceByNombreHeuresStack: {
    dataFromKey: KEY_HEURES,
    serieName: 'Nombre d\'heures (en millions) ',
    format: COMMON_FORMATTERS.integerEuropeanFormat,
    sortDataSerieBy: undefined,
    buildAxisCategsX: false,
    // buildAxisCategsXsettings: {
    //   fromKey: KEY_SECTION_NACE_LABEL,
    //   splitBy: [',', ';'],
    //   splitGlue: '- ',
    //   capitalize: true
    // },
    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },
  NaceByNombreSalariesStack: {
    dataFromKey: KEY_SALARIES,
    serieName: 'Nombre de salariés ',
    format: COMMON_FORMATTERS.integerEuropeanFormat,
    sortDataSerieBy: undefined,
    buildAxisCategsX: false,
    // buildAxisCategsXsettings: {
    //   fromKey: KEY_SECTION_NACE_LABEL,
    //   splitBy: [',', ';'],
    //   splitGlue: '- ',
    //   capitalize: true
    // },
    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },
  NaceByNombreDemandesStack: {
    dataFromKey: KEY_DEMANDES,
    serieName: 'Nombre de demandes ',
    format: COMMON_FORMATTERS.integerEuropeanFormat,
    sortDataSerieBy: undefined,
    buildAxisCategsX: false,
    // buildAxisCategsXsettings: {
    //   fromKey: KEY_SECTION_NACE_LABEL,
    //   splitBy: [',', ';'],
    //   splitGlue: '- ',
    //   capitalize: true
    // },
    buildColorsAxisX: true,
    buildColorsAxisXsettings: {
      fromKey: KEY_SECTION_NACE,
      matchWithDatasetId: 'taxo-nace17-colors',
      matchKey: 'code_section_nace17',
      getValueFromKey: 'color_section',
      fallbackColor: '#808080'
    }
  },

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
  },

  // stack
  categHorizH390Stack: {
    // cf : https://apexcharts.com/javascript-chart-demos/bar-charts/stacked/
    chart: {
      type: 'bar',
      height: '350px',
      width: '470px',
      stacked: true,
      stackedType: '100%',
      toolbar: {
        show: false
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 0
    },
    plotOptions: {
      bar: {
        horizontal: true,
        // distributed: true // nerd-pride....
      }
    },
    theme: {
      mode: 'light'
    },

    dataLabels: {
      enabled: false
    },

    xaxis: {
      // type: 'category',
      categories: [
        'mars 2020',
        'avril 2020',
        'mai 2020',
        'juin 2020',
        'juillet 2020',
        'août 2020',
        'septembre 2020',
        'octobre 2020',
      ],
      labels: {
        show: true,
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
        }
      }
    ]
  },
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
          Top 10 des aides du fonds de solidarité
          <br>
          ventilées par
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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

        chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
        format: COMMON_FORMATTERS.millionsEuros
      }
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
          Aides du fonds de solidarité
          <br>
          ventilées par
          <a target="_blank" href="https://www.insee.fr/fr/information/1896448">
            classes d'effectifs</a>
          (en M€)<br>
          <span class='font-weight-light'>
            (uniquement entreprises affiliées au régime général)
          </span>
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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

        chartOptions: COMMON_CHART_OPTIONS.categHorizH300,
        format: COMMON_FORMATTERS.millionsEuros
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
          Top 3 des aides du fonds de solidarité
          <br>
          ventilées par
          <a target="_blank" href="https://www.insee.fr/fr/information/2028129">
            catégories juridiques </a>a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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

        chartOptions: COMMON_CHART_OPTIONS.categHorizH170,
        format: COMMON_FORMATTERS.millionsEuros
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
          Top 3 des aides du fonds de solidarité
          <br>
          ventilées par
          <a target="_blank" href="https://www.insee.fr/fr/information/2028129">
            catégories juridiques </a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center pb-4',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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
      titleSuffixClass: 'accent--text',

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
          <br>
          ventilés par
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
        format: COMMON_FORMATTERS.millionsEuros
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
          <br>
          ventilés par
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
        format: COMMON_FORMATTERS.millionsEuros
      }

    },


    // ============================================================= //
    // CPSTI
    // ============================================================= //
    // BAR HORIZ - APE X MONTANTS
    {
      id: 'apexchart-cpsti',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_naf X montant',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Top 10 des aides CPSTI
          <br>
          ventilés par
          <a target="_blank" href="https://www.insee.fr/fr/information/2406147">
            code section NAF</a>
          (en M€)
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',

      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',

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
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
        format: COMMON_FORMATTERS.millionsEuros
      }

    },

    // ============================================================= //
    // ACTIVITE PARTIELLE
    // ============================================================= //
    // BAR HORIZ - APE X NBR HEURES - STACK
    {
      id: 'apexchart-activitepartielle-time-serie-01',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_nace17 X nombre',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Nombre d'heures d'activité partielle
          <br>
          ventilées par
          <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
            code section NACE 17</a>
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',
      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',
      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },
      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'nace17', // stack
        datasetDataToStackSerie: true,
        fromDatasetKey_serieDataFrom: 'data', // stack
        fromDatasetKey_serieNamesFrom: 'libelle', // stack
        seriesMappers: [
          COMMON_SERIES_MAPPERS.NaceByNombreHeuresStack // stack
        ],
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390Stack, // stack
        format: COMMON_FORMATTERS.integerEuropeanFormat
      }
    },

    // BAR HORIZ - APE X NBR SALARIES - STACK
    {
      id: 'apexchart-activitepartielle-time-serie-02',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_nace17 X nombre',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Nombre de salariés concernés par l'activité partielle
          <br>
          ventilées par
          <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
            code section NACE 17</a>
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',
      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',
      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },
      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'nace17', // stack
        datasetDataToStackSerie: true,
        fromDatasetKey_serieDataFrom: 'data', // stack
        fromDatasetKey_serieNamesFrom: 'libelle', // stack
        seriesMappers: [
          COMMON_SERIES_MAPPERS.NaceByNombreSalariesStack // stack
        ],
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390Stack, // stack
        format: COMMON_FORMATTERS.integerEuropeanFormat
      }
    },
    // BAR HORIZ - APE X NBR SALARIES - STACK
    {
      id: 'apexchart-activitepartielle-time-serie-03',
      serie_id: 'stat-bar-horiz',
      help: 'bar horiz / kpi_top_10_nace17 X nombre',
      titleI18n: 'charts.chart01.title',
      chartTitle: {
        fr: `
          Nombre de demandes dactivité partielle déposées par les entreprises
          <br>
          ventilées par
          <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
            code section NACE 17</a>
          <br><br>
        `
      },
      chartTitleClass: 'subtitle-2 text-center',
      titlePreffixSpecialStoreId: undefined,
      titleSuffixSpecialStoreId: 'levelname',
      titleSuffixClass: 'accent--text',
      dividers: {
        before: false,
        after: true,
        afterHideOnMobile: true
      },
      datasetMappers: {
        specialStoreId: 'focusObject',
        fromDatasetKey: 'nace17', // stack
        datasetDataToStackSerie: true,
        fromDatasetKey_serieDataFrom: 'data', // stack
        fromDatasetKey_serieNamesFrom: 'libelle', // stack
        seriesMappers: [
          COMMON_SERIES_MAPPERS.NaceByNombreDemandesStack // stack
        ],
        chartOptions: COMMON_CHART_OPTIONS.categHorizH390Stack, // stack
        format: COMMON_FORMATTERS.integerEuropeanFormat
      }
    },



    // BAR HORIZ - APE X NBR ENTREPRISES
    // {
    //   id: 'apexchart-activitepartielle',
    //   serie_id: 'stat-bar-horiz',
    //   help: 'bar horiz / kpi_top_10_nace17 X nombre',
    //   titleI18n: 'charts.chart01.title',
    //   chartTitle: {
    //     fr: `
    //       Nombre de demandes d'activité partielle réalisées par les entreprises
    //       <br>
    //       ventilées par
    //       <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
    //         code section NACE 17</a>
    //       <br><br>
    //     `
    //   },
    //   chartTitleClass: 'subtitle-2 text-center',

    //   titlePreffixSpecialStoreId: undefined,
    //   titleSuffixSpecialStoreId: 'levelname',
    //   titleSuffixClass: 'accent--text',

    //   dividers: {
    //     before: false,
    //     after: true,
    //     afterHideOnMobile: true
    //   },

    //   datasetMappers: {
    //     specialStoreId: 'focusObject',
    //     fromDatasetKey: 'kpi_top_10_nace17',
    //     seriesMappers: [
    //       COMMON_SERIES_MAPPERS.NaceByNombreEntreprise
    //     ],
    //     chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
    //     format: COMMON_FORMATTERS.integerEuropeanFormat
    //   }

    // },
    // // BAR HORIZ - APE X NBR SALARIES
    // {
    //   id: 'apexchart-activitepartielle-02',
    //   serie_id: 'stat-bar-horiz',
    //   help: 'bar horiz / kpi_top_10_nace17 X nombre salaries',
    //   titleI18n: 'charts.chart01.title',
    //   chartTitle: {
    //     fr: `
    //       Nombre de salariés concernés par l'activité partielle
    //       <br>
    //       ventilés par
    //       <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
    //         code section NACE 17</a>
    //       <br><br>
    //     `
    //   },
    //   chartTitleClass: 'subtitle-2 text-center',

    //   titlePreffixSpecialStoreId: undefined,
    //   titleSuffixSpecialStoreId: 'levelname',
    //   titleSuffixClass: 'accent--text',

    //   dividers: {
    //     before: false,
    //     after: true,
    //     afterHideOnMobile: true
    //   },

    //   datasetMappers: {
    //     specialStoreId: 'focusObject',
    //     fromDatasetKey: 'kpi_top_10_nace17',
    //     seriesMappers: [
    //       COMMON_SERIES_MAPPERS.NaceByNombreSalaries
    //     ],
    //     chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
    //     format: COMMON_FORMATTERS.integerEuropeanFormat
    //   }

    // },
    // // BAR HORIZ - APE X NBR HEURES
    // {
    //   id: 'apexchart-activitepartielle-03',
    //   serie_id: 'stat-bar-horiz',
    //   help: 'bar horiz / kpi_top_10_nace17 X nombre salaries',
    //   titleI18n: 'charts.chart01.title',
    //   chartTitle: {
    //     fr: `
    //       Nombre d'heures d'activité partielle demandées
    //       <br>
    //       ventilées par
    //       <a target="_blank" href="https://www.acoss.fr/home/observatoire-economique/sources-et-methodologie/nomenclatures/secteurs-dactivite.html">
    //         code section NACE 17</a> (en millions d'heures)
    //       <br><br>
    //     `
    //   },
    //   chartTitleClass: 'subtitle-2 text-center',

    //   titlePreffixSpecialStoreId: undefined,
    //   titleSuffixSpecialStoreId: 'levelname',
    //   titleSuffixClass: 'accent--text',

    //   dividers: {
    //     before: false,
    //     after: true,
    //     afterHideOnMobile: true
    //   },

    //   datasetMappers: {
    //     specialStoreId: 'focusObject',
    //     fromDatasetKey: 'kpi_top_10_nace17',
    //     seriesMappers: [
    //       COMMON_SERIES_MAPPERS.NaceByNombreHeures
    //     ],
    //     chartOptions: COMMON_CHART_OPTIONS.categHorizH390,
    //     format: { ...COMMON_FORMATTERS.integerEuropeanFormat, unit: 'Mh' }
    //   }

    // }

  ]
}
