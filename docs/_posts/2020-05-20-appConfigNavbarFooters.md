---
title : CONFIGURATION - NAVBAR FOOTER
classes: wide
categories:
  - configfiles
tags:
  - tutorial
  - configuration
  - global
  - UX
  - UI
  - navbar
  - footer
  - schema
  - buttons
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
        └─── appConfigNavbarFooters.js

```

## The NAVBAR FOOTER configuration file

The `appConfigNavbarFooters.js` file manages the footer navbar you will display in your instance.

{% include figure image_path="/static/schemas/DASHBOARD_WIREFRAME-navbarfooter-01.png" alt="" %}

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`.

This navbar only appears on mobile sizes (specified in UI-UX config file). You can configure the actions for each buttons. It could be really usefull to toggle the visibility of some identified divs, so it could have a more fluid UX on mobiles.

### Global parameters

```json
{
  "help" : help string for developpers,
  "settingsIds" : [
    ### **list** of <navbar footer settings>

    {
      "id": "navbar-footer-01",
      "help": "",
      "activated": true,
      "title": {
        "fr": ""
      },
      "titleI18n": "navbars.footer.title",
      "navbarFooterClass": "",
      "height": 70,
      "grow": true,
      "shift": true,
      "defaultBtnNav": "map",
      "redirectAtBreakShow": {
        "path": "/map",
        "btnNav": "map"
      },
      "redirectAtBreakNoShow": {
        "path": "/",
        "btnNav": "home"
      },
      "buttons": [
        # **list** of buttons of your navbar

        # example of a button
        {
          "title": {
            "fr": "accueil"
          },
          "value": "home",
          "showTitle": true,
          "icon": "fas fa-th",
          "action": "toggleDivs",
          "divsToToggle": [

            # list the div you want to toggle 
            # for a specific route id
            {
              "routeId": "fds",
              "toggle": "on",
              "toggleVisibility": [
                "isVisibleMobile"
              ],
              "divIds": [
                "text-fds-title",
                "text-fds-infos"
              ]
            },
            {
              "routeId": "fds",
              "toggle": "off",
              "toggleVisibility": [
                "isVisibleMobile"
              ],
              "divIds": [
                "apexchart-fds",
                "apexchart-fds-categ-jur-pie",
                "apexchart-fds-effectifs",
                "map-france-aides-metro"
              ]
            },
          ],
          "offset": 10
        },

      ]
    }

  ]
}

```
