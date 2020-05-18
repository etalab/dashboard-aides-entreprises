---
layout : single 
title : DEPLOYMENT CONFIGURATIONS
categories:
  - guide
tags:
  - documentation
  - configuration
  - schema
  - principles
  - installation
  - deployment
toc: true
toc_label: " contents"
toc_sticky: true

legends:
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-legends.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-legends.jpg
    alt: "full details"
    title: "legends"

paas:
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-D.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-D.jpg
    alt: "full details"
    title: "zoom on paas client - option D"
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-A-B.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-D.jpg
    alt: "full details"
    title: "paas client - options A and B"
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-C-D.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-D.jpg
    alt: "full details"
    title: "paas client - options D and D"

sovereign:
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-A-B-Bbis.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-A-B-Bbis.jpg
    alt: "full details"
    title: "sovereign client - options A, B and Bbis"
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-C-D.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-C-D.jpg
    alt: "full details"
    title: "sovereign client - options C and D"
  - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-C.jpg
    image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-C.jpg
    alt: "full details"
    title: "zoom on sovereign client - option C"

# alloptions:
#   - url: /documentation/configurations/APIVIZ-CONFIGURATIONS-export.jpeg
#     image_path: /documentation/configurations/APIVIZ-CONFIGURATIONS-export.jpeg
#     alt: "full details"
#     title: "main data flows"
---


---------
## Deployment on Netlify

### section `Build & deploy ` : 

#### `Continuous Deployment / Build settings`

  ```bash
  Repository : github.com/etalab/dashboard-aides-entreprises
  Build command : npm run build
  Publish directory : dist
  ```

#### `Continuous Deployment / Deply contexts`

  ```bash
  Production branch : master
  ```

#### `Environment / Environment variables `

  ```bash
  ### copy your variables from your .env file
  ```

---------

<br>
<br>
