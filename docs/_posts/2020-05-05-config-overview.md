---
title : CONFIGURATION OVERVIEW
classes: wide
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


-----
## Modules

### Frontend modules overview

ODAMAP relies heavily on the [Nuxt framework](https://nuxtjs.org/), and uses various standard components you could find in any nuxt project : 

- `middlewares` : loaded before mounting pages ;
- `store` : vuex standard module stores ; 
- `components` : standard vue.js components.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-architecture-02-en.png" alt="" %}

### Frontend components basic setup

From the client point of view the page loaded in the browser will be constituted by a serie of `components`, themselves mounted given :

- the configuration files [relative to the UX-UI and routes]({{site.baseurl}}/configuration/config-configs/#uiux) ;
- the configuration files [for each component]({{site.baseurl}}/configuration/config-configs/#datavisualisation-configuration-files) (chart, map, number, etc...) ; 
- the data [loaded and stored in the vuex store]({{site.baseurl}}/configuration/config-configs/#data-configuration-files).

The CSS/vue framework globally used iin ODAMAP is [Vuetify](vuetifyjs.com/).

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-overview-01.png" alt="" %}


--------

## Configure your ODAMAP instance

### What you have to know

Your ODAMAP instance is fully configurable. So you can change either the texts, the translation, the data you want to display, the routes you want for your website, etc...

To configure your instance you need to differenciate the following folders in the repository. Each of them has a different purpose.

As a developper you'll mainly have to use and modify :

- the `/frontend/.env` file - [more here][env_file]
- the `/frontend/configs/dev` folder - [more here][config_folder]
- the `/frontend/static/` folder - [more here][static_folder]

### ODAMAP folders structure

```shell
frontend
│   README.md
│   VERSIONS.md
│   .env
│   .envExample
│   nuxt.config.js
│   nuxt_loadConfigs_fromJS.js
│
└─── ... <nuxt and vue folders>
│
└─── configs
│   │
│   └─── dev
│   │   │ ... <config files development / JS files>
│   │
│   └─── examples
│   │   │ ... <config files development / JS files>
│   │
│   └─── vectorStyles
│       │ ... <vector styles files development / JS files>
│
└─── locales
│       │ ... <translation files>
│
└─── static
    │
    └─── configs
    │   │ ... <config files production / JSON files>
    │
    └─── datasets
        │
        └─── geodata
        │   │ ... <your geojson data>
        │
        └─── prod
            │ ... <your data as JSON>

```

### The URL parameters

- To know more about the URL parameters [click here][url_params]


### The config files

- To know more about the `/frontend/.env` file [click here][env_file]
- To know more about the `/frontend/configs` files [click here][config_folder]
- To know more about the `/frontend/static` files [click here][static_folder]
- To know more about the `/frontend/locales` files [click here][locales]

[url_params]: {{site.baseurl}}/configuration/config-url-params
[env_file]: {{site.baseurl}}/configuration/config-envfile
[config_folder]: {{site.baseurl}}/configuration/config-configs
[static_folder]: {{site.baseurl}}/configuration/config-static
[locales]: {{site.baseurl}}/configuration/config-locales

<!--
-----

- site.baseurl : {{site.baseurl}}/configuration/config-envfile
- absolute_url : {{ "/configuration/config-envfile" | absolute_url }}
- relative_url : {{ "/configuration/config-envfile" | relative_url }} 
-->

------------

<br>
<br>
