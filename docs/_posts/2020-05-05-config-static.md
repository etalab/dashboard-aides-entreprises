---
title : MANAGE THE DATASETS YOU WANT TO DISPLAY 
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

## Configure your ODAMAP datasets
 
### What you have to know

Your ODAMAP instance is fully configurable. So you can change either the texts, the translation, the data you want to display, the routes you want for your website, etc...


### ODAMAP `frontend/static` folder's structure

```shell
frontend
│   README.md
│   .env
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

<br>

The files contained in `frontend/static` are integrated to the build when you run `npm run dev` or `npm run build`. They are served by your ODAMAP / SPA app.

Those files could be used as a primary source of data, or a backup source of data. More on that topic [here]({{site.baseurl}}/configfiles/appConfigData)

Those static files have different purposes : 

- `frontend/static/configs` : contains the static configuration files, _aka_ the translation to JSON of the config files. More info on that topic [here]({{site.baseurl}}/configuration/config-configs) ; 
- `frontend/static/datasets` : contains the static datasets.
  - `/geeodata` : geoJSON files for you map components. More on that topic [here]({{site.baseurl}}/configfiles/appConfigMap) ;
  - `/prod` : any other static dataset file you want to use for your instance.

------------

<br>
<br>
