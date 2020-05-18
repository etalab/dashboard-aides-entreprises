---
title : CONFIGURE YOUR ENVIRONMENT VARIABLES
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

Those variables are loaded indirectly in `nuxt.config.js`, via the `nuxt_loadConfigs_fromJS.js` file, and then pass through several processes : 

- they have an influence on how configs JSON files are produced. More on that topic [here](/configuration/config-configs) ;
- they are stored in `process.env.CONFIG_APP`, to be usable in the vuex store later on ;


### The ODAMAP `.env`-related  files locations

```shell
frontend
│   README.md
│   .env
│   .envExample
│   nuxt.config.js
│   nuxt_loadConfigs_fromJSjs

```

---------

## The `.env` file's structure

---
### Global variables

To choose the running mode, the port, the host... 

```bash
NUXT_ENV_RUN_MODE=dev
NUXT_ENV_HOST=localhost
NUXT_ENV_PORT_DEV=8000
NUXT_ENV_APP_TITLE=Aides aux entreprises
```

The `NUXT_ENV_RUN_MODE` can have the following values :

- `dev`
- `preprod`
- `prod`

---
### Overrides variables

Overrides the following url's parameters : `iframe`, `noroutetabs`, `nomapscroll`

See more on that topic [here](/configuration/config-url-params)

```bash
NUXT_ENV_APP_IFRAME_OVERRIDE=no
NUXT_ENV_APP_ROUTESTABS_OVERRIDE=no
NUXT_ENV_APP_NOMAPSCROLL_OVERRIDE=no
```

---
### Locales variables

Set the languages your app will use and specify the JSON translation files you'll need to load.

See more on that topic [here](/configuration/config-locales)

```bash
NUXT_ENV_LANG_DEFAULT_LOCALE=fr
NUXT_ENV_LANG_DEFAULT_LOCALES=fr:Français:fr-FR.js
```

---
### Metrics variables

For now it only uses Matomo framework for metrics.

Check [Matomo documentation](https://matomo.org/) for more infos.

```bash
NUXT_ENV_MATOMO_HOST=<YOUR MATOMO METRICS SERVER/DOMAIN/URL>
NUXT_ENV_MATOMO_SITE_ID=<YOUR ID NUMBER>
```

---
### Datasets variables / data files

This part sets up where your config files are loaded from if you want them to be loaded remotely.

More on that topic [here](/configuration/config-configs)

```bash
NUXT_ENV_CONFIG_FROM=local_js_files
NUXT_ENV_CONFIG_TO_JSON_FOLDER=aides-entreprises
```

The `NUXT_ENV_CONFIG_FROM` variable can have one of the following values :

- `local_js_files`
- `local_json_files`
- `distant_json_files`

Then map the config files : 

```bash
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

---
### Routes variables

This part details which routes you want to build at `npm run build` level, for instance for a deployment as SPA in Netlify. This part allows you to avoid any 404 error when deployed as SPA + build.

```bash
NUXT_ENV_GENERATE_ROUTES=/fds,/pge,/reports
```

---
### Colors variables

Those variables will override default Vuetify themes colors. Check [Vuetify documentation](https://vuetifyjs.com/en/customization/theme/) for more infos...

```bash
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
