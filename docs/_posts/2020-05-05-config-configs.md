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
- they are then stored in `process.env.CONFIG_APP`, to be usable in the vuex store ;


### ODAMAP `configs/dev` folder structure

```shell
frontend
│   README.md
│   .env
│   nuxt.config.js
│   nuxt_loadConfigs_fromJS.js
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
        └─── appConfigNumbers.js
        └─── appConfigRawData.js
        └─── appConfigRoutes.js
        └─── appConfigTables.js
        └─── appConfigTexts.js
        └─── appConfigUIUX.js

```

Those files are loaded altogether when you run `npm run dev` and loaded at the `nuxt.config.js` file level.

They will populate the configuration for the several features ODAMAP can count on :

------

## Global configuration files

### UIUX

The `appConfigUIUX.js` file manages the UIUX you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigUIUX)

### Routes

The `appConfigRoutes.js` file manages the Routes you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigRoutes)

### NavbarFooters

The `appConfigNavbarFooters.js` file manages the NavbarFooters you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigNavbarFooters)
```shell
### TO BE WRITTEN ###
```

### GlobalButtons

The `appConfigGlobalButtons.js` file manages the GlobalButtons you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigGlobalButtons)
```shell
### TO BE WRITTEN ###
```

------

## Data configuration files

### Data

The `appConfigData.js` file manages the Data you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigData)
```shell
### TO BE WRITTEN ###
```

### RawData

The `appConfigRawData.js` file manages the RawData you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigRawData)
```shell
### TO BE WRITTEN ###
```

------

## Datavisualisation configuration files

### Map

The `appConfigMap.js` file manages the `Map` components you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigMap)
```shell
### TO BE WRITTEN ###
```

### Charts

The `appConfigCharts.js` file manages the `ApexChart` components you will display in your ODAMAP instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigCharts)
```shell
### TO BE WRITTEN ###
```

### Numbers

The `appConfigNumbers.js` file manages the `Number` components you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigNumbers)
```shell
### TO BE WRITTEN ###
```

### Texts

The `appConfigTexts.js` file manages the `Text` components you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigTexts)
```shell
### TO BE WRITTEN ###
```

### Tables

The `appConfigTables.js` file manages the `Table` components you will display in your instance.
More about how to use this configuration file [following this link]({{site.baseurl}}/configfiles/appConfigTables)
```shell
### TO BE WRITTEN ###
```


------------

<br>
<br>
