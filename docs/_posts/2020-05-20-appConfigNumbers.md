---
title : CONFIGURATION - NUMBERS
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - dataviz
  - numbers
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
        └─── appConfigNumbers.js

```

## The NUMBERS configuration file

The `appConfigNumbers.js` file manages the maps you will display in your instance.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-numbers-01.png" alt="" %}

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`.

The Number component will display numbers from the data store, and if necessary reformat it before display.

### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : [
    ### **list** of <number settings>

    ### example of a number settings
    {
      "id": "numbers-01",
      "help": "",
      "title": {
        "fr": ""
      },
      "titleI18n": "numbers.numbers01.title",
      "dividers": {
        "before": false,
        "after": false
      },
      "componentRows": [
        {
          "rowNumber": 1,
          "help": "",
          "columns": [
            {
              "colName": "",
              "colTitle": {
                "fr": "montant"
              },
              "titleI18n": "numbers.numbers01.amount",
              "colClass": "",
              "cols": 6,
              "titleClass": "",
              "numberClass": "font-weight-bold",
              "sizeDesktop": "title",
              "sizeMobile": "mb-1 body-2",
              "legendClass": "",
              "unit": {
                "fr": "M€"
              },
              "legend": {
                "fr": ""
              },
              "textPrefix": {
                "fr": ""
              },
              "textSuffix": {
                "fr": ""
              },
              "specialStoreId": "montant",
              "format": {
                "type": "float",
                "sepThousands": " ",
                "sepComma": ","
              }
            },
            {
              "colName": "",
              "colTitle": {
                "fr": "nombre"
              },
              "titleI18n": "numbers.numbers01.total",
              "colClass": "",
              "cols": 6,
              "titleClass": "",
              "numberClass": "font-weight-bold",
              "sizeDesktop": "title",
              "sizeMobile": "mb-1 body-2",
              "legendClass": "",
              "unit": {
                "fr": "aides"
              },
              "legend": {
                "fr": ""
              },
              "textPrefix": {
                "fr": ""
              },
              "textSuffix": {
                "fr": ""
              },
              "specialStoreId": "nombre",
              "format": {
                "type": "integer",
                "sepThousands": " "
              }
            }
          ]
        }
      ]
    }

  ]
}

```
