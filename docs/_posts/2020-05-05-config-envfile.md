---
title : CONFIGURE YOUR ENVIRONMENT VARIIABLES
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

## Configure your ODAMAP instance's environment variables
 

### What you have to know

The `.env` file manages the first level of customization. It allows you to override some parameters, set the running mode of your app, set some default colors, set the languages you want, etc...


### The ODAMAP `.env` file location

```
frontend
│   README.md
│   .env
│   .envExample
│   nuxt.config.js

```

---------

## The `.env` file's structure


### Global variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### GLOBAL ENV VARS
### - - - - - - - - - - - - - - - - - - - - - ###
# NUXT_ENV_RUN_MODE : dev | preprod | prod
NUXT_ENV_RUN_MODE=dev
NUXT_ENV_HOST=localhost
NUXT_ENV_PORT_DEV=8000
NUXT_ENV_APP_TITLE=Aides aux entreprises
```

### Overrides variables

```env
### OVERRIDES
NUXT_ENV_APP_IFRAME_OVERRIDE=no
NUXT_ENV_APP_ROUTESTABS_OVERRIDE=no
NUXT_ENV_APP_NOMAPSCROLL_OVERRIDE=no
```

### Locales variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### LOCALES / i18n
### - - - - - - - - - - - - - - - - - - - - - ###
NUXT_ENV_LANG_DEFAULT_LOCALE=fr
NUXT_ENV_LANG_DEFAULT_LOCALES=fr:Français:fr-FR.js
```

### Metrics variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### MATOMO STATS
### - - - - - - - - - - - - - - - - - - - - - ###
NUXT_ENV_MATOMO_HOST=https://stats.data.gouv.fr
NUXT_ENV_MATOMO_SITE_ID=126
```

### Datasets variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### CONFIGS FROM ...
### - - - - - - - - - - - - - - - - - - - - - ###
# NUXT_ENV_CONFIG_FROM : local_js_files (default | undefined) | local_json_files | distant_json_files (distant)
NUXT_ENV_CONFIG_FROM=local_js_files
NUXT_ENV_CONFIG_TO_JSON_FOLDER=aides-entreprises

### ONLY FOR DISTANT FILES
NUXT_ENV_configs_URLBASE=https://raw.githubusercontent.com/co-demos/ODAMPA-configs/master/AIDES-ENTREPRISES/configs/json/
NUXT_ENV_configAppUIUX=configAppUIUX.json
NUXT_ENV_configAppRoutes=configAppRoutes.json
NUXT_ENV_configAppData=configAppData.json
NUXT_ENV_configAppMap=configAppMap.json
NUXT_ENV_configAppCharts=configAppCharts.json
NUXT_ENV_configAppNumbers=configAppNumbers.json
NUXT_ENV_configAppTexts=configAppTexts.json
NUXT_ENV_configAppTables=configAppTables.json
NUXT_ENV_configAppRawData=configAppRawData.json
NUXT_ENV_configAppNavbarFooters=configAppNavbarFooters.json
NUXT_ENV_configAppGlobalButtons=configAppGlobalButtons.json
```

### Routes variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### GENERATE ROUTES
### - - - - - - - - - - - - - - - - - - - - - ###
NUXT_ENV_GENERATE_ROUTES=/fds,/pge,/reports
```

### Colors variables

```env
### - - - - - - - - - - - - - - - - - - - - - ###
### COLORS
### - - - - - - - - - - - - - - - - - - - - - ###
NUXT_ENV_LOADING_COLOR=#d1335b
NUXT_ENV_LOADING_HEIGHT=5

NUXT_ENV_THEME_IS_DARK=false

NUXT_ENV_THEME_LIGHT_primary=#000091
NUXT_ENV_THEME_LIGHT_accent=#572a99
NUXT_ENV_THEME_LIGHT_secondary=#b1133b
NUXT_ENV_THEME_LIGHT_info=#53657D
NUXT_ENV_THEME_LIGHT_warning=#ff9947
NUXT_ENV_THEME_LIGHT_error=#D1335B
NUXT_ENV_THEME_LIGHT_success=#03BD5B

NUXT_ENV_THEME_DARK_primary=#000091
NUXT_ENV_THEME_DARK_accent=#572a99
NUXT_ENV_THEME_DARK_secondary=#b1133b
NUXT_ENV_THEME_DARK_info=#53657D
NUXT_ENV_THEME_DARK_warning=#ff9947
NUXT_ENV_THEME_DARK_error=#D1335B
NUXT_ENV_THEME_DARK_success=#03BD5B
```

------------

<br>
<br>
