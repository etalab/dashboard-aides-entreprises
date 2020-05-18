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


------------

<br>
<br>
