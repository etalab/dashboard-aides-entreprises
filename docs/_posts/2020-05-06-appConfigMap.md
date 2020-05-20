---
title : CONFIGURATION FILE - MAPS
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - dataviz
  - map
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
        └─── appConfigMap.js

```

## The MAPS configuration file

The `appConfigMap.js` file manages the maps you will display in your instance.

This file contains the settings for the Map component. 

The most important parts of a map setting are the following : 

 - the `sources` field. This field is [more precisely described below here]({{site.baseurl}}/configfiles/appConfigMap/#the-sources-field).
 - the `maps` field. This field is [more precisely described below here]({{site.baseurl}}/configfiles/appConfigMap/#the-maps-field).
 - the `layers` field. This field is [more precisely described below here]({{site.baseurl}}/configfiles/appConfigMap/#the-layers-field).


### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : **list** of <map settings>,
}
```

### Structure of a <map settings> :

Every map is described with a common structure.

```json
{
  "id" : '',
  "isActivated" : '',
  "titleI18n" : '',
  "map_options" : '',
  "sizes" : sizes ,
  "sources" : [ 
    list of sources... see paragraph below
  ],
  "maps" : [ 
    list of layers groups and clic events... see paragraph below
  ]',
  "layers" : [ 
    list of layers... see paragraph below
  ],
  "maps_visibility" : 
  {
    "title" :  ,
    "is_activated" : ,
    "is_drawer_open" : ,
    "map_switches" : ,
  },
}
```

### The `sources` field

```json
{

}

```

### The `maps` field

```json
{

}

```

### The `layers` field

```json
{

}

```

