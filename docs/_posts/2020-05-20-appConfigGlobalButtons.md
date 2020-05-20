---
title : CONFIGURATION - GLOBAL BUTTONS
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - global
  - UX
  - buttons
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
        └─── appConfigGlobalButtons.js

```

## The GLOBAL BUTTONS configuration file

The `appConfigGlobalButtons.js` file manages the global buttons you will display in your instance.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-globalbuttons-01.png" alt="" %}

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`.

The GlobalButton component allows you to describe a button which can have an action globally on the app, more specifically on the app store.

For instance you can associate the clic event on a button a serie of functions, from which some could reset the store, change the zoom on the map, etc...

### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : [
    ### **list** of <chart settings>

    {
      "id": "global-button-fds",
      "help": "",
      "title": {
        "fr": ""
      },
      "titleI18n": "buttons.button01.title",
      "dividers": {
        "before": false,
        "after": false
      },
      "btnsRowClass": "align-center justify-center",
      "btnsRowClassMobile": "mt-0 pt-0 mb-2",
      "componentButtons": [

        {
          "id": "first-button",
          "title": {
            "fr": "retour au niveau national"
          },
          "titleI18n": "buttons.button01.title",
          "btnClass": "justify-center btn-gouv",
          "block": false,
          "outlined": true,
          "fab": false,
          "color": "primary",
          "large": false,
          "small": false,
          "dark": false,
          "tile": true,
          "rounded": false,
          "disabled": false,
          "functions": [
            ### **list** of the functions 
            ### you associate this button click with

            ### example of a function
            {
              "funcName": "resetMapZoom",
              "funcParams": {
                "targets": [
                  {
                    "from": "store",
                    "fromPropValue": 8
                  }
                ]
              }
            },

          ]
        }
      ]

    }

  ]
}

```

