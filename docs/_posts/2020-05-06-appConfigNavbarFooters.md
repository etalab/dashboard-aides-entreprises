---
title : CONFIGURATION FILE - NAVBAR FOOTER
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
  - navbar
  - footer
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

This `.js` file can be changed in development mode, but it will usually be transformed into a `.json` file. The later will be stored in `frontend/static/configs/`.

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
