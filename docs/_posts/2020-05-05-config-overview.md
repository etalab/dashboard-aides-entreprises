---
title : CONFIGURATION OVERVIEW
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

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-architecture-01.png" alt="" %}

--------

## Configure your ODAMAP instance

### What you have to know

Your ODAMAP instance is fully configurable. So you can change either the texts, the translation, the data you want to display, the routes you want for your website, etc...

To configure your instance you need to differenciate the following folders in the repository. Each of them has a different purpose.

As a developper you'll mainly have to use and modify :

- `/frontend/.env` file
- `/frontend/configs/dev` folder
- `/frontend/static/` folder

### ODAMAP folders structure

```shell
frontend
│   README.md
│   VERSIONS.md
│   .env
│   .envExample
│   nuxt.config.js
│   nuxt_loadConfigs_fromJSjs
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

- To know more about the URL parameters you can use [click here](/configuration/config-url-params)


### The config files

- To know more about the `/frontend/.env` file [click here](/configuration/config-envfile)
- To know more about the `/frontend/configs` files [click here](/configuration/config-configs)
- To know more about the `/frontend/static` files [click here](/configuration/config-static)
- To know more about the `/frontend/locales` files [click here](/configuration/config-locales)


------------

<br>
<br>
