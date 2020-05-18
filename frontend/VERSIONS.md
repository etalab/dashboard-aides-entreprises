### ODAMAP VERSIONS LOG


-----------------

#### Developers / roadmap

Check our [project page on Github][kanban] to have a glimpse of our roadmap. 

You can also check the [wireframe document online][wireframe_slides] or the [wireframe document as pdf][wireframe_pdf] we are working on to have a more graphical approach on our roadmap. 

[kanban]: https://github.com/etalab/dashboard-aides-entreprises/projects/2 
[wireframe_slides]: https://docs.google.com/presentation/d/1j_0xaJzPIjmuDSQG-nNYzADad4pFaf8E3VBkggFu1FY/edit?usp=sharing
[wireframe_pdf]: ../screenshots/DASHBOARD_WIREFRAME_v.1.0-2.0.pdf

-----------------
date : 18/05/2020

- v.2.1.0 : adding docs

-----------------
date : 14/05/2020

- v.2.0.8 : no map scroll parameter in .env and/or url

-----------------
date : 13/05/2020

- v.2.0.7 : fix bug of color and zoom when switching datasets with url params

-----------------
date : 12/05/2020

- v.2.0.6 : store setup + zoom from url params
- v.2.0.5 : url parameters for store preload
- v.2.0.4 : custom color and behaviour for nuxt loading bar

-----------------
date : 11/05/2020

- v.2.0.3 : fix max-height main window
- v.2.0.2 : no tabs override from url param or env var
- v.2.0.1 : pie chart & multiple charts

-----------------
date : 07/05/2020

- v.2.0.0 : routes/tabs for several datasets

-----------------
date : 05-06/05/2020

- v.1.14.1 : optimizing build => 
  - geojson 1000m instead of 100m
  - fonts from CDN instead of build
  - analyzer in nuxt script : `nuxt run analyze`
  - big linting with standardJS 
  - fetch minified data instead of pretty jsons

-----------------
date : 04/05/2020

- v.1.13.1 : fix bug coherent colors when rebuilding apexChart

-----------------
date : 28/04/2020

- v.1.13 : iframing override from from [`.env` file](.envExample)


-----------------
date : 27/04/2020

- v.1.12 : iframing parameter in url to hide navbar
- v.1.11 : Matomo parameters injection from [`.env` file](.envExample)

-----------------
date : 26/04/2020

- v.1.10 : 
  - ability to load config files from distant files
  - can write config js files to json files in statics

-----------------
date : 23/04/2020

- v.1 : first version (almost stable)
