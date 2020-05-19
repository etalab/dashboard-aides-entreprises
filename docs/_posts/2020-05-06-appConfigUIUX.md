---
title : CONFIGURATION FILE - UI-UX
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - global
  - UI
  - UX
toc: true
toc_label: " contents"
toc_sticky: true
---

--------

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

This file contains the settings for :

### Global parameters

- `appTitle` : the title of your app if not specified in `.env` file
- `lang` : the locales you will use in your instance if not specified in the `.env` file

### UX parameters

- `UX_config` : some UX parameters you can play with for the whole ODAMAP instance, such as :
  - `hasDrawer`: 
  - `mobileBreakpoints`: 
  - `overrideIframeMaxHeight`: 
  - `navbar`: 
  - `tabsRoutes`: 
  - `filters`: 

### UX parameters

- `UI_config` : some UX parameters you can play with for the whole ODAMAP instance, such as :
  - `isDarkTheme`: 
  - `navbar`: 
  - `filters`: 
  - `themes`: 
  - `map`: 
  - `typos`: 
  - `customCSS`: 

