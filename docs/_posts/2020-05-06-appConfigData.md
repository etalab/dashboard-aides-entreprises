---
title : CONFIGURATION FILE - DATASETS
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - data
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
        └─── appConfigData.js

```

## The DATA configuration file

The `appConfigData.js` file manages the data you will display in your instance.

### Global parameters

- `help` : help string for developpers ;
- `dataSource` : for API references to load data sources **- in development** ; 
- `filters` : **list** **- in development**; 
- `defaultDataSetup` : data sources loaded for every route / described inn the next part ;
- `routesData` : / described inn the next part ;


### the `defaultDataSetup` or `routesData` structure :

The following json describes how a particular route indicating it needs to load the dataset with the `national-aides-raw` id  will be loaded and stored in vuex.

```json
{
"routesData" : {
  "help": 'data sources not loaded at init but depending on routes',
  "initData": {
    "help": '',
    "store": [
      {
        "id": 'national-aides-raw',
        "dataset": 'fds',
        "help": 'serie chiffres aides à la maille nationale',
        "from": 'static',
        "url": `${DATASETS_REPO_BASE}/aides/aides-maille-national-minify.json`,
        "backupUrl": `${DATASETS_FOLDER}/prod/aides/aides-maille-national.json`,
        "displayed": true,
        "copyTo": [
          {
            "fieldToCopy": undefined,
            "from": { objectRef: 0 },
            "help": 'copy to another dataset (id) in displayedData | initData',
            "toSpecialStore": 'focusObject',
            "format": undefined
          },
          {
            "fieldToCopy": 'montant',
            "from": { objectRef: 0 },
            "help": 'copy to another dataset (id) in displayedData | initData',
            "toSpecialStore": 'montant',
            "format": [
              {
                "utilsFnName": 'toMillionsOrElse',
                "params": { divider: 1000000, fixed: 2 }
              }
            ]
          }
        ]
      },
    ]
  }
}
```
