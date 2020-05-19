---
title : CONFIGURATION FILE - ROUTES
classes: wide
categories:
  - configfiles
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - global
  - UX
  - routes
toc: false
toc_label: " contents"
toc_sticky: true
---

--------

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
        └─── appConfigRoutes.js

```

## The ROUTES configuration file

The `appConfigRoutes.js` file manages the routes you will display in your instance.

Every route is described in an object ODAMAP will analyze later in its middlewares and components. If you want to have a look on how those settings are processed in middlewares check the `frontend/middleware` folder, particularly `getRouteConfig.js` and `getRouteData.js` middlewares.

The most important part of a route is described under the `pageRows` field. This field is [more precisely described below here]({{site.baseurl}}/configfiles/appConfigRoutes/#the-pagerows-field).

### Routes objects

- `routes` : **list** of the routes your ODAMAP instance could serve. Every route is described in an object as follows :
  - `id`: route **unique** id;
  - `name`: name you want to give to this route (appears in the browser's tab);
  - `help`: help string for developpers ;
  - `title`: the title you'll give to this route (depends on the locale);
  - `titleI18n`: if you want to use your locales i18n files to give a title to this route (depends on the locale) ;
  - `urls`: **list** of urls this route is assoxiated with. You can use the same route settings for several urls, for instance you can display the same settings for the `/` and `/home` urls ;
  - `sourcesIds`: **list** the data source ids associated with this route. More on this topic ;
  - `rawHtml`: load external html **- in development** ;
  - `navbarFooter`: settings of the footer you want to display in mobile mode. Refers to an `id` of a navbar footer. More on that topic [here]({{site.baseurl}}/configfiles/appConfigNavbarFooter) ;
    - `activated` : activate footer or not ;
    - `settings` : contains among other things the `id` of the navbar footer you need ;
  - `pageRows`: the main part of a **list** of the rows and columns, the components you will use in the page... See below for a more complete descriptioin;
  - `setUpRouteViews`: ;
    - `urlArgs` : **list** paramters arguments the route can check in the client's url ;
    - `functions` : **list** of functions to run before mounting the route;


### The `pageRows` field

Let's imagine we want to display the following page as in this schema :  

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-routes-01.png" alt="" %}

This schema corresponds to the following `pageRows` settings in a route object :

```json
{
  "pageRows": [
    {
      "id": 'row1',
      "rowNumber": 1,
      "activated": true,
      "help": '',
      "columns": [
        {
          "id": 'col1',
          "colName": 'Numbers and tables',
          "activated": true,
          "colClass": 'col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4',
          "hasScrollbar": true,
          "smallScreenVerticalOrder": undefined,
          "colRows": [
            {
              "component": 'text',
              "activated": true,
              "smallScreenVerticalOrder": 1,
              "justify": 'center',
              "align": 'center',
              "settings": {
                "id": 'text-fds-title',
                "containerClass": 'pt-2 pb-0',
                "mobileIsVisibleDefault": true,
                "desktopIsVisibleDefault": true
              }
            },
            {
              "component": 'numbers',
              "activated": true,
              "smallScreenVerticalOrder": 3,
              "justify": 'center',
              "align": 'center',
              "settings": {
                "id": 'numbers-01',
                "containerClass": 'py-0',
                "mobileIsVisibleDefault": true,
                "desktopIsVisibleDefault": true
              }
            },
            {
              "component": 'globalButtons',
              "activated": true,
              "smallScreenVerticalOrder": 1,
              "justify": 'center',
              "align": 'center',
              "settings": {
                "id": 'global-button-fds',
                "containerClass": 'py-0 my-0',
                "mobileIsVisibleDefault": true,
                "desktopIsVisibleDefault": true
              }
            },
            {
              "component": 'apexchart',
              "activated": true,
              "smallScreenVerticalOrder": 4,
              "justify": 'center',
              "align": 'center',
              "settings": {
                "id": 'apexchart-fds',
                "containerClass": 'mt-4 pt-3 pb-0',
                "mobileIsVisibleDefault": false,
                "desktopIsVisibleDefault": true
              }
            },
            {
              "component": 'text',
              "activated": true,
              "smallScreenVerticalOrder": 1,
              "justify": 'center',
              "align": 'center',
              "settings": {
                "id": 'text-fds-infos',
                "containerClass": 'pb-0',
                "mobileIsVisibleDefault": false,
                "desktopIsVisibleDefault": true
              }
            }
          ]
        },
      ]
    }
  ]
}
```
