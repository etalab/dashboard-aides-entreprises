---
title : CONFIGURE YOUR ODAMAP INSTANCE
categories:
  - configuration
tags:
  - documentation
  - tutorial
  - configuration
  - installation
toc: true
toc_label: " contents"
toc_sticky: true
---

--------

## Configure your ODAMAP instance
 
### What you have to know

The `.env` file manages the first level of customization. It allows you to override some parameters, set the running mode of your app, set some default colors, set the languages you want, etc...

Those variables are loaded indirectly in `nuxt.config.js`, via the `nuxt_loadConfigs_fromJS.js` file, and then pass through several processes : 

- each `.js`config file is translated into a `.json` file and copied in `/frontend/static/configs/` folder ;
- they are stored in `process.env.CONFIG_APP`, to be usable in the vuex store ;


### ODAMAP folders structure

```shell
frontend
│   README.md
│   .env
│   nuxt.config.js
│
└─── static
│   │
│   └─── configs
│       │ ... <config files production / JSON files>
│
└─── configs
    │
    └─── dev
        │
        └─── appConfigCharts.js
        └─── appConfigData.js
        └─── appConfigGlobalButtons.js
        └─── appConfigMap.js
        └─── appConfigNavbarFooters.js
        └─── appConfigRawData.js
        └─── appConfigRoutes.js
        └─── appConfigTables.js
        └─── appConfigTexts.js
        └─── appConfigUIUX.js

```


------

## Charts

The `appConfigCharts.js` file manages the Charts you will need to display in your instance.

------

## Data

The `appConfigData.js` file manages the Data you will need to display in your instance.

------

## GlobalButtons

The `appConfigGlobalButtons.js` file manages the GlobalButtons you will need to display in your instance.

------

## Map

The `appConfigMap.js` file manages the Map you will need to display in your instance.

------

## NavbarFooters

The `appConfigNavbarFooters.js` file manages the NavbarFooters you will need to display in your instance.

------

## RawData

The `appConfigRawData.js` file manages the RawData you will need to display in your instance.

------

## Routes

The `appConfigRoutes.js` file manages the Routes you will need to display in your instance.

------

## Tables

The `appConfigTables.js` file manages the Tables you will need to display in your instance.

------

## Texts

The `appConfigTexts.js` file manages the Texts you will need to display in your instance.

------

## UIUX

The `appConfigUIUX.js` file manages the UIUX you will need to display in your instance.



------------

<br>
<br>
