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

### Frontend overview
{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-architecture-01.png" alt="" %}

--------

## Configure your ODAMAP instance

------

### Data & configuration files

Your ODAMAP instance is fully configurable. So you can change either the texts, the translation, the data you want to display, the routes you want for your website, etc...

To configure your instance you need to differenciate the following folders in the repository. Each of them has a different purpose.

As a developper you'll mainly have to use and modify :

- `/frontend/configs/dev`
- `/frontend/static/`


```
frontend
│   README.md
│   VERSIONS.md
│   .env
│   .envExample
│
└─── ... <nuxt and vue folders>
│
└─── configs
│   │
│   └─── dev
│   │   │ ... <config files in development / JS files>
│   │
│   └─── examples
│   │   │ ... <config files in development / JS files>
│   │
│   └─── vectorStyles
│       │ ... <vector styles files for development / JS files>
│
└─── locales
│       │ ... <translation files>
│
└─── static
    │
    └─── configs
    │   │ ... <config files for production / JSON files>
    │
    └─── datasets
        │
        └─── geodata
        │   │ ... <your geojson data>
        │
        └─── prod
            │ ... <your data as JSON>
```

-----

### The config files








------------

<br>
<br>
