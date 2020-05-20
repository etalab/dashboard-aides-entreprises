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
  "settingsIds" : [
    ### **list** of <map settings>

    ### Example of a map settings
    {
      "id" : '',
      "isActivated" : '',
      "titleI18n" : '',
      "map_options" : '',
      "sizes" : sizes ,
      "sources" : [
        # **list** of sources... 
        # see -sources- paragraph below
      ],
      "maps" : [
        # **list** of layers groups and clic events... 
        # see -maps- paragraph below
      ]',
      "layers" : [
        # **list** of layers... 
        # see -layers- paragraph below
      ],
      "maps_visibility" : {
        "title" :  ,
        "is_activated" : ,
        "is_drawer_open" : ,
        "map_switches" : ,
      },
      "copySettingsFrom" : [
        # **list** of fields to copy from other map settings
        {
          "copyFromId" : 'map-france-report-metro',
          "fieldsToCopy" : [
            # **list** of keys to copy
          ]
        }
      ]
    }
    ### end of the example

  ]
}

```

### The `sources` field

In this section your map component will know which dataset it will need to load. 

The component can load external sources (like a distant geojson file or a geojson file in the static folder), OR can load data from the vuex store and transform it to geodata (like changing a list of rows in a csv to a marker on the map).

```json
{
  "sources" : [

    ### example of a geojson source
    {
      "id": 'regions',
      "help": 'geojson des contours des régions',
      "from": 'url',
      "url": '/datasets/geodata/regions-1000m.geojson', // local file in `/static` folder
      "type": 'geojson',
      "generateId": true,
      "licence": 'open licence',
      "loadInStore": true,
      "popupSettings": true
    },

    ### example of a dataset source loaded from store 
    ### and then transformed into geojson
    {
      "id": 'regions-aides',
      "help": 'montants des aides au niveau regional - as geojson from raw',
      "from": 'store',
      "fromId": 'regions-aides-raw',
      "type": 'geojson',
      "generateId": true,
      "needTransform": true,
      "transformTo": {
        "srcKey": 'reg',
        "geoCanvasId": 'centers',
        "canvasKey": {
          "keyIsFieldName": true,
          "field": undefined,
          "canvasKeyPrefix": 'REG-',
          "canvasKeySuffix": ''
        },
        "properties": aidesProperties,
        "geometry": {
          "type": 'Point'
        }
      },
      "licence": ''
    }

  ]

}

```

### The `maps` field

```json
{
  "maps" : [
    {

    }
  ]
}

```

### The `layers` field

```json
{
  "layers" : [
    {

    }
  ]
}

```

