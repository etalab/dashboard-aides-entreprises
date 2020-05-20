---
title : CONFIGURATION - TEXTS
classes: wide
categories:
  - configfiles
tags:
  - tutorial
  - configuration
  - dataviz
  - UI
  - texts
  - schema
  - data
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
        └─── appConfigTexts.js

```

## The TEXTS configuration file

The `appConfigTexts.js` file manages the texts you will display in your instance.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-texts-01.png" alt="" %}

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`.

The Text component will display contents as html. Those contents could be defined in the settings itself, but they also could be loaded from a distant `.txt` or `.html` files (for instance on Github).

The Text component can also add dynamic text to the static content you want to display. For this purpose you can specify the id of a data in the special store you want to fetch and add to your text...

To have a complete example for chart configuration you can directly check : 

 - a `dynamic` text example : [described below here]({{site.baseurl}}/configfiles/appConfigTexts/#a-dynamic-text-example).
 - a `static and distant` texts example : [described below here]({{site.baseurl}}/configfiles/appConfigTexts/#a-static-and-distant-texts-example).


### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : [
    ### **list** of <text settings>
    ### see below for more examples

    ### ...
    {
      "id" : "text-fds-title",
      "help": "",
      "title": {
        "fr": ""
      },
      "titleI18n": "texts.text01.title",
      "dividers": {
        "before": false,
        "after": false
      },
      "componentRows": []
    },
    ...

  ]
}

```


### A dynamic text example

```json
{
  ### example of a simple text defined here in the settings
  "id": "text-fds-title",
  "help": "",
  "title": {
    "fr": ""
  },
  "titleI18n": "texts.text01.title",
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
            "fr": ""
          },
          "colTitleClass": "",
          "cols": 12,
          "textClass": "",
          "subTextClass": "",
          "sizeDesktop": "headline mb-0",
          "sizeMobile": "subtitle-1",
          "textPrefix": {
            "fr": "Fonds de solidarité : "
          },
          "textPrefixClass": "font-weight-regular",
          "textSuffix": {
            "fr": ""
          },
          "textsHtml": undefined,

          ### dynamically get the text value from the store
          "specialStoreId": "levelname",
          "specialStoreIdClass": "font-weight-medium"
        }
      ]
    }
  ]
}

```

### A static and distant texts example

```json
{
  ### example of html text, static and distant
  "id": "text-fds-infos",
  "help": "",
  "title": {
    "fr": ""
  },
  "titleI18n": "texts.text01.title",
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
            "fr": "Le fonds de solidarité"
          },
          "colTitleClass": "my-5",
          "cols": 12,
          "textClass": "",
          "subTextClass": "",
          "sizeDesktop": "",
          "sizeMobile": "body-2",
          "textPrefix": {},
          "textSuffix": {},
          "textsHtml": [

            ### text added statically
            {
              "id": "dashboard-intro",
              "textClass": "text-left mx-4 pt-4 pb-5 mb-5",
              "textContent": {
                "fr": "\nCe tableau de bord a été créé par le département Etalab de la\n<a target=\"_blank\" href=\"https://www.numerique.gouv.fr\">\nDirection Interministérielle du Numérique (DINUM)</a>\net son\n<a target=\"_blank\" href=\"https://github.com/etalab/dashboard-aides-entreprises\">\ncode source est libre</a>.\n"
              },
              "fromUrl": {}
            },

            ### text added after fetching a distant file
            {
              "id": "miseAJour",
              "textClass": "justify-center mx-4 pt-3 pb-5 mb-5",
              "fromUrl": {
                "fr": "https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/aides/last_update_data.txt"
              }
            }

          ]
        }
      ]
    }
  ]
}

```
