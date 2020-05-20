---
title : CONFIGURATION - UI-UX
classes: wide
categories:
  - configfiles
tags:
  - tutorial
  - configuration
  - global
  - UI
  - UX
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
        └─── appConfigUIUX.js

```

## The UIUX configuration file

The `appConfigUIUX.js` file manages the UIUX you will display in your instance.

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`

In the folowing paragraphs you will find an explanation for each of the main fields constituting the UI-UX's ODAMAP settings object.


```json
{
  ### Global parameters
 "appTitle" : the title of your app if not specified in `.env` file,
 "lang" : the locales you will use in your instance if not specified in the `.env` file,

  ### UX parameters
  "UX_config" : {
    # some UX parameters you can play with for the whole ODAMAP instance such as =>

    "hasDrawer" : left drawer **- in development**,
    "mobileBreakpoints" : Vuetify breakpoint names list to switch to mobile,
    "overrideIframeMaxHeight" : set the max height of the app in iframe mode **- in development**,
    "navbar" : Those settings will be processed by the `frontend/components/UX/Navbar.vue` component,
    "tabsRoutes" : defines the tabs to switch routes (upper navbar). Those settings will be processed by the `frontend/components/UX/TabsRoutes.vue` component,
    "filters" : hide / display filters **- in development**
  },

  ### UX parameters
  "UI_config" : {
    # some UX parameters you can play with for the whole ODAMAP instance such as

    "isDarkTheme" : set as dark theme for Vuetify ,
    "navbar" : defines the UI of the navbar. Check the Navbar confiig documentation for more,
    "filters" : UI parameters for the filters **- in development** ,
    "themes" : drak and light themes Vuetify compatible ,
    "map" : some UI parameters for the map component (loader mainly) ,
    "typos" : fonts to use **- in development** ,
    "customCSS" : some custom CSS classes you want to add. Those settings will be processed by the `frontend/components/UI/DynamicCSS.vue` component,
  }
}

```
