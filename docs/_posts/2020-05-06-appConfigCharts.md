---
title : CONFIGURATION - CHARTS
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - dataviz
  - charts
toc: false
toc_label: " contents"
toc_sticky: true
---

--------

## Config files

[Back to config files list]({{site.baseurl}}/configuration/config-configs)

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
        └─── appConfigCharts.js

```

## The CHARTS configuration file

The `appConfigCharts.js` file manages the charts you will display in your instance.

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`

The ODAMAP's Map component heavily relies on [Apecharts API](https://apexcharts.com/docs/) and uses the [vue-apexcharts wrapper](https://apexcharts.com/docs/vue-charts/) for Vue.js. Please read their documentation.

### Global parameters

- `parameter` : explanation

### Example :

```shell
### TO BE WRITTEN ###
```
