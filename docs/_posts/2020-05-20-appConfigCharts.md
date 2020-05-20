---
title : CONFIGURATION - CHARTS
classes: wide
categories:
  - configfiles
tags:
  - tutorial
  - configuration
  - dataviz
  - charts
  - UI
  - schema
  - apexchart
toc: false
toc_label: " contents"
toc_sticky: true
---

--------

## Config files

[Back to config files list]({{site.baseurl}}/configuration/config-configs)

## File location

```shell
frontend
│   README.md
│   .env
│   nuxt.config.js
│
└─── configs
    │
    └─── dev
        │
        └─── appConfigCharts.js

```

## The CHARTS configuration file

The `appConfigCharts.js` file manages the charts you will display in your instance.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-charts-01.png" alt="" %}

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`

The ODAMAP's Map component heavily relies on [Apecharts API](https://apexcharts.com/docs/) and uses the [vue-apexcharts wrapper](https://apexcharts.com/docs/vue-charts/) for Vue.js. Please read their documentation.

The main idea here is use the ApexChart vue compoenent, and to set dynamically a complete apexchart configuration from this file. This allows us to add some custom ODAMAP parameters, for instance to fetch the data to display from the store, or even reformat the data...

To have a complete example for chart configuration you can directly check : 

 - a `horizontal-bar` chart example : [described below here]({{site.baseurl}}/configfiles/appConfigCharts/#a-horizontal-bar-chart-example).
 - a `donut` chart example : [described below here]({{site.baseurl}}/configfiles/appConfigCharts/#a-donut-chart-example).


### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : [
    ### **list** of <chart settings>

    ### example of a bar settings
    {
      "id": "apexchart-fds",
      "serie_id": "stat-bar-horiz",
      "help": "bar horiz / kpi_top_10_naf X montant",
      "titleI18n": "charts.chart01.title",
      "chartTitle": {
        "fr": "\nTop 10 des aides du fonds de solidarité \n<br>\nventilées par \n<a target=\"_blank\" href=\"https://www.insee.fr/fr/information/2406147\">\ncode section NAF</a>\n(en M€)\n<br><br>\n"
      },
      "chartTitleClass": "subtitle-2 text-center",
      "titleSuffixSpecialStoreId": "levelname",
      "titleSuffixClass": "accent--text",
      "dividers": {
        ### add <hr> html divider after or before your chart 
        "before": false,
        "after": true,
        "afterHideOnMobile": true
      },

      "datasetMappers": {
        ### to remap the data injected to your chart 

        "specialStoreId": "focusObject",
        "fromDatasetKey": "kpi_top_10_naf",
        "seriesMappers": [
          {
            "dataFromKey": "montant",
            "serieName": "montant (M€)",
            "format": [
              {
                "utilsFnName": "toMillionsOrElse",
                "params": {
                  "divider": 1000000,
                  "fixed": 2
                }
              }
            ],
            "sortDataSerieBy": {
              "sortByType": "sortByFieldValue",
              "fieldName": "montant",
              "toNumber": true,
              "sortOrder": "descending",
              "exceptions": {
                "putLast": {
                  "fieldName": "section_naf",
                  "value": "Autres"
                }
              }
            },
            "buildAxisCategsX": true,
            "buildAxisCategsXsettings": {
              "fromKey": "libelle_section_naf",
              "splitBy": [
                ",",
                ";"
              ],
              "splitGlue": "- ",
              "capitalize": true
            },
            "buildColorsAxisX": true,
            "buildColorsAxisXsettings": {
              "fromKey": "section_naf",
              "matchWithDatasetId": "taxo-nafs-colors",
              "matchKey": "code_section",
              "getValueFromKey": "color_section",
              "fallbackColor": "#808080"
            }
          }
        ],
        "chartOptions": {
          ### ApexCharts options 
          ### read the ApexCharts documentation for this part
          ### or check the complete examples below
        }
      }
    },

  ]
}
```

### A horizontal-bar chart example

```json
{
  "id": "apexchart-fds",
  "serie_id": "stat-bar-horiz",
  "help": "bar horiz / kpi_top_10_naf X montant",
  "titleI18n": "charts.chart01.title",
  "chartTitle": {
    "fr": "\nTop 10 des aides du fonds de solidarité \n<br>\n          ventilées par \n<a target=\"_blank\" href=\"https://www.insee.fr/fr/information/2406147\">\ncode section NAF</a>\n(en M€)\n<br><br>\n"
  },
  "chartTitleClass": "subtitle-2 text-center",
  "titleSuffixSpecialStoreId": "levelname",
  "titleSuffixClass": "accent--text",
  "dividers": {
    "before": false,
    "after": true,
    "afterHideOnMobile": true
  },
  "datasetMappers": {
    "specialStoreId": "focusObject",
    "fromDatasetKey": "kpi_top_10_naf",
    "seriesMappers": [
      {
        "dataFromKey": "montant",
        "serieName": "montant (M€)",
        "format": [
          {
            "utilsFnName": "toMillionsOrElse",
            "params": {
              "divider": 1000000,
              "fixed": 2
            }
          }
        ],
        "sortDataSerieBy": {
          "sortByType": "sortByFieldValue",
          "fieldName": "montant",
          "toNumber": true,
          "sortOrder": "descending",
          "exceptions": {
            "putLast": {
              "fieldName": "section_naf",
              "value": "Autres"
            }
          }
        },
        "buildAxisCategsX": true,
        "buildAxisCategsXsettings": {
          "fromKey": "libelle_section_naf",
          "splitBy": [
            ",",
            ";"
          ],
          "splitGlue": "- ",
          "capitalize": true
        },
        "buildColorsAxisX": true,
        "buildColorsAxisXsettings": {
          "fromKey": "section_naf",
          "matchWithDatasetId": "taxo-nafs-colors",
          "matchKey": "code_section",
          "getValueFromKey": "color_section",
          "fallbackColor": "#808080"
        }
      }
    ],
    "chartOptions": {
      "chart": {
        "type": "bar",
        "height": "390px",
        "width": "390px",
        "toolbar": {
          "show": false
        }
      },
      "legend": {
        "show": false
      },
      "plotOptions": {
        "bar": {
          "horizontal": true,
          "distributed": true
        }
      },
      "theme": {
        "mode": "light"
      },
      "dataLabels": {
        "enabled": true
      },
      "xaxis": {
        "type": "category",
        "labels": {
          "show": false,
          "style": {
            "fontSize": "9px"
          }
        }
      },
      "responsive": [
        {
          "breakpoint": 960,
          "options": {
            "chart": {
              "width": "350px"
            },
            "xaxis": {
              "type": "numeric",
              "labels": {
                "show": false,
                "style": {
                  "fontSize": "9px"
                }
              }
            }
          }
        }
      ]
    }
  }
}

```


### A donut chart example

```json
{
  "id": "apexchart-fds-categ-jur-pie",
  "serie_id": "stat-bar-horiz",
  "help": "bar horiz / kpi_categorie_juridique X montant",
  "titleI18n": "charts.chart01.title",
  "chartTitle": {
    "fr": "\nTop 3 des aides du fonds de solidarité \n<br>\nventilées par \n<a target=\"_blank\" href=\"https://www.insee.fr/fr/information/2028129\">\ncatégories juridiques </a>\n(en M€)\n<br><br>\n"
  },
  "chartTitleClass": "subtitle-2 text-center pb-4",
  "titleSuffixSpecialStoreId": "levelname",
  "titleSuffixClass": "accent--text",
  "dividers": {
    "before": false,
    "after": true,
    "afterHideOnMobile": true
  },
  "datasetMappers": {
    "specialStoreId": "focusObject",
    "fromDatasetKey": "kpi_categorie_juridique",
    "seriesMappers": [
      {
        "dataFromKey": "montant",
        "serieName": "montant (M€)",
        "format": [
          {
            "utilsFnName": "toMillionsOrElse",
            "params": {
              "divider": 1000000,
              "fixed": 2
            }
          }
        ],
        "sortDataSerieBy": {
          "sortByType": "sortByFieldValue",
          "fieldName": "montant",
          "toNumber": true,
          "sortOrder": "descending",
          "exceptions": {
            "putLast": {
              "fieldName": "code_cat_juridique",
              "value": "Autres"
            }
          }
        },
        "buildAxisCategsX": false,
        "buildAxisCategsXsettings": {
          "fromKey": "libelle_cat_juridique",
          "splitBy": [
            ",",
            ";"
          ],
          "splitGlue": "- ",
          "capitalize": true
        },
        "buildLabels": true,
        "buildLabelsSettings": {
          "fromKey": "libelle_cat_juridique",
          "splitBy": [
            ",",
            ";"
          ],
          "splitGlue": "- ",
          "capitalize": true
        },
        "buildColorsAxisX": false,
        "buildColorsAxisXsettings": {
          "fromKey": "code_cat_juridique",
          "matchWithDatasetId": "taxo-categ-juridiques",
          "matchKey": "code",
          "getValueFromKey": "color",
          "fallbackColor": "#808080"
        }
      }
    ],
    "chartOptions": {
      "chart": {
        "type": "donut",
        "height": "250px",
        "width": "390px",
        "toolbar": {
          "show": false
        }
      },
      "legend": {
        "position": "bottom"
      },
      "theme": {
        "palette": "palette7",
        "mode": "light"
      },
      "dataLabels": {
        "enabled": true
      },
      "plotOptions": {
        "pie": {
          "donut": {
            "size": "45%"
          }
        }
      },
      "responsive": [
        {
          "breakpoint": 960,
          "options": {
            "chart": {
              "width": "350px"
            }
          }
        }
      ]
    }
  }
}

```
